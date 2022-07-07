import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

const CommentForm = ({ projectId }) => {
  const [commentBody, setBody] = useState('');
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleChange = event => {
    if(event.target.value.length >= 1) {
      setBody(event.target.value);
    }
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      await addComment({
        variables: { commentBody, projectId }
      });

      
      setBody('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p className={`m-0 || error ? 'text-error' : ''}`}>
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form className="flex-row justify-center justify-space-between-md align-stretch" onSubmit={handleFormSubmit}>
        <textarea
          placeholder="Leave a comment on this project..."
          value={commentBody}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>

        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>

      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default CommentForm;