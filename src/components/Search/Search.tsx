import { useCallback, useContext, useEffect, useRef, useState } from "react";
import styles from "./Search.module.scss";
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";
import { setCategoryId } from "../../redux/slices/filterSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Search() {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchValue !== "") {
      dispatch(setCategoryId(0));
    }
  }, [searchValue]);

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 500),
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const onClickClear = () => {
    setValue("");
    setSearchValue("");
    inputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title />
        <g data-name="Layer 2" id="Layer_2">
          <path d="M18,10a8,8,0,1,0-3.1,6.31l6.4,6.4,1.41-1.41-6.4-6.4A8,8,0,0,0,18,10Zm-8,6a6,6,0,1,1,6-6A6,6,0,0,1,10,16Z" />
        </g>
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onChangeInput(event)}
        className={styles.input}
        placeholder="Поиск"
      />
      {value !== "" && (
        <svg
          onClick={onClickClear}
          className={styles.iconClear}
          enableBackground="new 0 0 32 32"
          height="32px"
          id="Слой_1"
          version="1.1"
          viewBox="0 0 32 32"
          width="32px"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <path
            d="M17.459,16.014l8.239-8.194c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.391-1.034-0.391-1.428,0  l-8.232,8.187L7.73,6.284c-0.394-0.395-1.034-0.395-1.428,0c-0.394,0.396-0.394,1.037,0,1.432l8.302,8.303l-8.332,8.286  c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.428,0l8.325-8.279l8.275,8.276c0.394,0.395,1.034,0.395,1.428,0  c0.394-0.396,0.394-1.037,0-1.432L17.459,16.014z"
            fill="#121313"
            id="Close"
          />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
        </svg>
      )}
    </div>
  );
}
