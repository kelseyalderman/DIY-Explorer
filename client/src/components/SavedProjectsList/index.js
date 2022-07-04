import React from "react";
import { Link } from "react-router-dom";

const SavedProjectsList = ({ savedProjects }) => {
  if (!savedProjects || !savedProjects.length) {
    return <p className="bg-dark text-light p-3">No projects save yet!</p>;
  }

  return (
    <div>
      <h5>Saved projects:</h5>
      {savedProjects.map((savedProject) => (
        <Link to={`/project/${savedProject._id}`}>
          <button
            className="btn w-100 display-block mb-2"
            key={savedProject._id}
          >
            {savedProject.projectTitle}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default SavedProjectsList;
