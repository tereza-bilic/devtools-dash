import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthGuard } from "src/components/AuthGuard";
import { CompletedLevelResponse } from "src/types/openapi";
import { axiosClient } from "src/util/axiosClient";

const CompletedLevel = () => {
  const [searchParams] = useSearchParams();
  const [completedLevel, setCompletedLevel] = useState<CompletedLevelResponse | null>(null);

  const timeDelta = completedLevel
    ? (new Date(completedLevel.finished_at).getTime() - new Date(completedLevel.started_at).getTime()) / 1000
    : 0;

  useEffect(() => {
    console.log(searchParams);
    if (searchParams.has("completed_id")) {
      const completed_id = Number(searchParams.get("completed_id"));
      axiosClient.completed_api_level_session_completed__completed_id__get({completed_id}).then((res) => {
        setCompletedLevel(res.data);
      });
    }
  }, [searchParams]);
    return (
      <AuthGuard>
          <div>
              <h1>Completed Level</h1>
              {completedLevel ? (
                  <div>
                      <div>Level: {completedLevel.level_key}</div>
                      <div>Time: {timeDelta} seconds </div>
                  </div>
              ) : (
                  <div>Loading...</div>
              )}
          </div>
        </AuthGuard>
    );
}

export default CompletedLevel;
