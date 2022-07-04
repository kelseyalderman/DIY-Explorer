import React from "react";
import { Link } from "react-router-dom";

const ProjectList = ({ projects, title }) => {
  if (!projects.length) {
    return <h3>No Projects Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {projects &&
        projects.map((project) => (
          <div key={project._id} className="card mb-3">
            <p className="card-header">
              {project.projectTitle} on {project.createdAt} by{" "}
              <Link
                to={`/profile/${project.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {project.username}
              </Link>
            </p>
            <div className="card-body">
              <Link to={`/project/${project._id}`}>
                <p>{project.projectText}</p>
                <p className="mb-0">
                  Comments: {project.commentCount} || Click to{" "}
                  {project.commentCount ? "see" : "start"} the discussion!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProjectList;
