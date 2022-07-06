import React from "react";
import { Link } from "react-router-dom";

const UserProjectList = ({ projects, title }) => {
  if (!projects.length) {
    return <h3>No Projects Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {projects &&
        projects.map((project) => (
          <div key={project._id} className="card mb-3">
            <Link to={`/project/${project._id}`}>
              <div className="card-header">
                <h2 style={{ fontWeight: 700 }} className="text-dark">
                  {project.projectTitle}
                </h2>{" "}
                Created on {project.createdAt}
              </div>
              <div className="card-body">
                <p>{project.projectText}</p>
                <p className="bg-secondary text-dark mb-0 p-2 display-inline-block">
                  Comments: {project.commentCount} || Click to{" "}
                  {project.commentCount ? "see" : "start"} the discussion!
                </p>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default UserProjectList;
