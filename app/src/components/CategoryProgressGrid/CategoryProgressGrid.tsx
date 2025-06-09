import { CategoryEnum, LevelResponse } from "@devtools-dash/types/openapi";
import CircularProgressBar from "../circularProgressBar/CircularProgressBar";
import Skeleton from "../Skeleton/Skeleton";
import styles from "./CategoryProgressGrid.module.css";

interface CategoryProgressGridProps {
  categories: CategoryEnum[];
  levels: LevelResponse[];
  loading: boolean;
}

const CategoryProgressGrid = ({ categories, levels, loading }: CategoryProgressGridProps) => {
  const getProgressPerCategory = (category: string) => {
    const categoryLevels = levels.filter(level => level.category === category);
    const completedLevels = categoryLevels.filter(level => level.completed);
    const totalLevels = categoryLevels.length;

    return {
      completed: completedLevels.length,
      total: totalLevels,
    };
  };

  if (loading) {
    return (
      <div className={styles.categoryProgress}>
        {[...Array(categories.length)].map((_, index) => (
          <div key={index} className={styles.categoryBox}>
            <Skeleton variant="text" width="80px" height="20px" />
            <div className={styles.skeletonCircle}>
              <Skeleton variant="circular" width="80px" height="80px" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.categoryProgress}>
      {categories.map((category) => (
        <div key={category} className={styles.categoryBox}>
          <div className={styles.categoryName}>{category}</div>
          <CircularProgressBar
            completed={getProgressPerCategory(category).completed}
            total={getProgressPerCategory(category).total}
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryProgressGrid;
