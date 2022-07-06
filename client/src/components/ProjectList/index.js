import React from "react";
import { Link } from "react-router-dom";

const ProjectList = ({ projects, title }) => {
  if (!projects.length) {
    return <h3>No Projects Yet</h3>;
  }

  return (
    <div>
      <h2>{title}</h2>
      {projects &&
        projects.map((project) => (
          <div key={project._id} className="card-home mb-3">
            <div className="card-header-home">
              <Link to={`/project/${project._id}`}>
                <h3 className="text-dark">{project.projectTitle}</h3>
              </Link>
              <div>
                Created by{" "}
                <Link
                  to={`/profile/${project.username}`}
                  style={{ fontWeight: 700 }}
                >
                  {project.username}
                </Link>{" "}
                on {project.createdAt}
              </div>
              <Link to={`/project/${project._id}`}>
                <p className="text-light">Comments: {project.commentCount}</p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProjectList;
