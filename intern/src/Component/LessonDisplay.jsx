import React from "react";

const LessonPlanDisplay = ({ lessonPlan }) => {
  if (!lessonPlan) return null;

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800">
        {lessonPlan.title}
      </h3>
      <p className="text-gray-600">{lessonPlan.overview}</p>

      {/* Objectives */}
      <div className="mt-3">
        <h4 className="text-lg font-bold text-blue-600">Objectives:</h4>
        <ul className="list-disc pl-5 text-gray-700">
          {lessonPlan.objectives?.map((obj, index) => (
            <li key={index}>{obj}</li>
          ))}
        </ul>
      </div>

      {/* Materials */}
      <div className="mt-3">
        <h4 className="text-lg font-bold text-blue-600">Materials:</h4>
        <ul className="list-disc pl-5 text-gray-700">
          {lessonPlan.materials?.map((material, index) => (
            <li key={index}>{material}</li>
          ))}
        </ul>
      </div>

      {/* Lesson Outline */}
      <div className="mt-3">
        <h4 className="text-lg font-bold text-blue-600">Lesson Outline:</h4>
        <ul className="list-disc pl-5 text-gray-700">
          {lessonPlan.lesson_outline?.map((step, index) => (
            <li key={index}>
              <strong>{step.step}</strong>: {step.details}
            </li>
          ))}
        </ul>
      </div>

      {/* Assessment */}
      <div className="mt-3">
        <h4 className="text-lg font-bold text-blue-600">Assessment:</h4>
        <p className="text-gray-700">{lessonPlan.assessment}</p>
      </div>

      {/* ✅ JSON Output for Debugging */}
      {/* <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto mt-4">
        {JSON.stringify(lessonPlan, null, 2)}
      </pre> */}
    </div>
  );
};

export default LessonPlanDisplay;
