import { useState, useEffect } from "react";

const useFetchLessons = () => {
  const [lessonPlans, setLessonPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://lesson-project-19c68-default-rtdb.firebaseio.com/lessonPlans.json"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch lesson data");
        }

        const data = await response.json();
        const lessonsArray = data ? Object.values(data) : [];
        setLessonPlans(lessonsArray);
      } catch (error) {
        console.error("Error fetching lesson:", error);
        setError(error.message);
        setLessonPlans([]);
      }
      setLoading(false);
    };

    fetchLessons();
  }, []);

  return { lessonPlans, loading, error };
};

export default useFetchLessons;
