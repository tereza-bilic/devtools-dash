import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AuthGuard } from "src/components/AuthGuard";
import { CompletedLevelResponse } from "src/types/openapi";
import { axiosClient } from "src/util/axiosClient";

import styles from "./CompletedLevel.module.css";
import Button from "src/components/form/button/Button";
import StarIcon from "src/components/StarIcon";

const CompletedLevel = () => {
  const [searchParams] = useSearchParams();
  const [completedLevel, setCompletedLevel] = useState<CompletedLevelResponse | null>(null);

  const timeDelta = completedLevel
    ? (new Date(completedLevel.finished_at).getTime() - new Date(completedLevel.started_at).getTime()) / 1000
    : 0;

  const transitionToNextLevel = () => {
      //todo
  }

  useEffect(() => {
    if (searchParams.has("completed_id")) {
      const completed_id = Number(searchParams.get("completed_id")) || -1;
      axiosClient.completed_api_level_session_completed__completed_id__get({completed_id}).then((res) => {
        setCompletedLevel(res.data);
      });
    }
  }, [searchParams]);
    return (
      <AuthGuard>
          <div className={styles.container}>
            <div className= {styles.starContainer}>
              <StarIcon width='200px' height='200px'/>
            </div>
              <h1>Completed!</h1>
              <div className={styles.divider}></div>
              {completedLevel ? (
                  <div className={styles.stats}>
                      <div>
                        <span className={styles.stat}>LEVEL: </span>
                        {completedLevel.level_key}
                      </div>
                      <div>
                        <span className={styles.stat}>TIME: </span>
                        {timeDelta} seconds
                      </div>
                  </div>
              ) : (
                  <div>Loading...</div>
              )}

              <div className={styles.buttonContainer}>
                  <Link to="/">
                      <Button type="button">Menu</Button>
                  </Link>

                  <Button type="button" color="orange" onClick={transitionToNextLevel}>
                      Next Level
                  </Button>
              </div>
          </div>
        </AuthGuard>
    );
}

export default CompletedLevel;
