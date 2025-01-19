import styles from './Categories.module.css';
import { useNavigate } from 'react-router-dom';
import { categories } from 'src/consts/categories';
import { capitalize } from 'src/utils/string-functions';
import { AuthGuard } from './AuthGuard';
import { CategoryEnum } from 'src/types/openapi';

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: CategoryEnum) => {
    navigate(`/categories/${category}`);
  };


  return (
    <AuthGuard>
      <div className={styles.container}>
        <h2 className={styles.header}>Categories</h2>
        <ul className={styles.list}>
          {categories.map((category) => (
            <li
              key={category}
              className={styles.listItem}
              onClick={() => handleCategoryClick(category)}
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
