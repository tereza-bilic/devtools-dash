import styles from './Categories.module.css';
import { useNavigate } from 'react-router-dom';
import { capitalize } from 'src/utils/string-functions';
import { AuthGuard } from '../AuthGuard';
import { CategoryResponse } from 'src/types/openapi';
import ProgressBar from 'src/components/progressBar/ProgressBar';
import Elements from 'src/components/icons/Elements';
import Console from 'src/components/icons/Console';
import React, { useEffect, useState } from 'react';
import Network from 'src/components/icons/Network';
import Button from '../form/button/Button';
import { axiosClient } from 'src/util/axiosClient';

const categoryIconMap: Record<string, () => JSX.Element> = {
  'Elements': Elements,
  'Console': Console,
  'Network': Network,
  'Sources': () => <div>Sources</div>,
};

const Categories = () => {
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

  const progress = (category: CategoryResponse) => {
    return (category.completed_count / category.total_count) * 100;
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

  return (
    <AuthGuard>
      <div className={styles.container}>
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
