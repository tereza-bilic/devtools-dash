import styles from './Categories.module.css';
import { useNavigate } from 'react-router-dom';
import { capitalize } from '@devtools-dash/utils/string-functions';
import { AuthGuard } from '../../guards/AuthGuard';
import { CategoryResponse } from '@devtools-dash/types/openapi';
import ProgressBar from '@devtools-dash/components/progressBar/ProgressBar';
import React, { useEffect, useState } from 'react';
import Button from '../form/button/Button';
import { categoryIconMap } from '@devtools-dash/consts/categories';
import { useAxiosClient } from '@devtools-dash/context/AxiosContext';

const Categories = () => {
  const axiosClient = useAxiosClient();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<CategoryResponse[]>([]);

  const fetchCategories = async () => {
    const response = await axiosClient.get_categories_api_level_categories_get();
    setCategories(response.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (category: CategoryResponse) => {
    navigate(`/categories/${category.name}`);
  };

  const categoryClass = (category: CategoryResponse) => {
    if (category.completed_count === 0) return styles.notStarted;

    return category.completed_count === category.total_count ? styles.completed : styles.inProgress
  }

  const buttonLabel = (category: CategoryResponse) => {
    if (category.completed_count === 0) return 'Start';
    if (category.completed_count === category.total_count) return 'Review';
    return 'Continue';
  }

  const buttonColor = (category: CategoryResponse) => {
    if (category.completed_count === 0) return 'blue';
    if (category.completed_count === category.total_count) return 'yellow';
    return 'orange';
  }

  const areAllCategoriesCompleted = Boolean(categories.length) && categories.every(category => category.completed_count === category.total_count);

  return (
    <AuthGuard>
      <div className={styles.container}>
        {areAllCategoriesCompleted && (
          <div className={styles.allCompleted}>
            <h2>Congratulations! You've completed everything</h2>
          </div>
        )}
        <div className={styles.list}>
          {categories.map((category) => (
            <div
              key={category.name}
              className={styles.listItem + " " + categoryClass(category)}

            >
              {categoryIconMap[category.name] && React.createElement(categoryIconMap[category.name])}
              <div className={styles.categoryTitle + " large"}>
                {capitalize(category.name)}
                {category.completed_count > 0  &&
                  <ProgressBar total={category.total_count} completed={category.completed_count} />
                }
              </div>
                <Button type="button" onClick={() => handleCategoryClick(category)} color={buttonColor(category)}>
                  {buttonLabel(category)}
                </Button>
            </div>
          ))}
        </div>
      </div>
    </AuthGuard>
  );
};

export default Categories;
