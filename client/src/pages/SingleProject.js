import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PROJECT } from "../utils/queries";
import { ADD_SAVED_PROJECT } from "../utils/mutations";
import CommentList from "../components/CommentList";
import Auth from "../utils/auth";
import CommentForm from "../components/CommentForm";

const SingleProject = (props) => {
  const { id: projectId } = useParams();

  const [addSavedProject] = useMutation(ADD_SAVED_PROJECT);

  const { loading, data } = useQuery(QUERY_PROJECT, {
    variables: { id: projectId },
  });

  const project = data?.project || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleClick = async () => {
    try {
      await addSavedProject({
        variables: { id: project._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {Auth.loggedIn() && projectId && (
        <button className="btn ml-auto" onClick={handleClick}>
          Save Project
        </button>
      )}
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {project.projectTitle}
          </span>{" "}
          created on {project.createdAt} by{" "}
          <Link
            to={`/profile/${project.username}`}
            style={{ fontWeight: 700 }}
            className="text-light"
          >
            {project.username}
          </Link>
        </p>
        <div className="card-body">
          <p>{project.projectText}</p>
        </div>
      </div>

      {project.commentCount > 0 && <CommentList comments={project.comments} />}

      {Auth.loggedIn() && <CommentForm projectId={project._id} />}
    </div>
  );
};

export default SingleProject;
