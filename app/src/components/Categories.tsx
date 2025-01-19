import styles from './Categories.module.css';
import { useNavigate } from 'react-router-dom';
import { categories, Category } from 'src/consts/categories';
import { capitalize } from 'src/utils/string-functions';
import { AuthGuard } from './AuthGuard';

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: Category) => {
    navigate(`/categories/${category}`);
  };


  return (
    <AuthGuard>
      <div className={styles.container}>
        <h2 className={styles.header}>Categories</h2>
        <ul className={styles.list}>
          {categories.map((category, index) => (
            <li
              key={index}
              className={styles.listItem}
              onClick={() => handleCategoryClick(category as Category)}
            >
              {capitalize(category)}
            </li>
          ))}
        </ul>
      </div>
    </AuthGuard>
  );
};

export default Categories;
