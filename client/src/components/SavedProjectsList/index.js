import React from "react";
import { Link } from "react-router-dom";

const SavedProjectsList = ({ savedProjects }) => {
  if (!savedProjects || !savedProjects.length) {
    return <p className="bg-dark text-light p-3">No projects save yet!</p>;
  }

  return (
    <div>
      {savedProjects.map((savedProject) => (
        <button className="btn w-100 display-block mb-2" key={savedProject._id}>
          <Link to={`/project/${savedProject._id}`}>{savedProject.title}</Link>
        </button>
      ))}
    </div>
  );
};

export default SavedProjectsList;
