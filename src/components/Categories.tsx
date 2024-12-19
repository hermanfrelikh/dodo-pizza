type CategoriesProps = {
  categoryId: number;
  onChangeCategoryId: (i: number) => void;
};

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC<CategoriesProps> = ({
  categoryId,
  onChangeCategoryId,
}) => {
  

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => {
          return (
            <li
              key={index}
              onClick={() => onChangeCategoryId(index)}
              className={categoryId === index ? "active" : ""}
            >
              {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Categories;
