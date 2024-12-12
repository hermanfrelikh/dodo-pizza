import Sort, { list } from "../components/Sort";
import Categories from "../components/Categories";
import Item from "../components/Item/Item";
import ItemSkeleton from "../components/Item/ItemSkeleton";
import { SearchContext } from "../App";
import { useEffect, useState, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Pagination/Pagination";
import { setCategoryId, setFilters } from "../redux/slices/filterSlice";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const onChangeCategoryId = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const categoryId = params.categoryId;
      const sort = list.find((obj) => obj.sortProperty === params.sortType);

      dispatch(
        setFilters({
          sort,
          categoryId,
        })
      );
      isSearch.current = true;
    }
  }, []);

  const fetchPizzas = () => {
    setIsLoading(true);
    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : ``;

    axios
      .get(
        `https://6733b90da042ab85d117cfc8.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search} `
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current === true) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
        currentPage,
        searchValue,
      });
      if (sortType === "rating" && categoryId === 0) {
        navigation("/");
      }
      else{
        navigation(`?${queryString}`);
      }
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  const itemsRender = Array.isArray(items)
    ? items.map((item) => <Item {...item} key={item.id} />)
    : null;

  const skeletonsRender = [...new Array(15)].map((_, index) => (
    <ItemSkeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategoryId={onChangeCategoryId}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletonsRender : itemsRender}
      </div>
      <Pagination setCurrentPage={setCurrentPage} />
    </div>
  );
}
