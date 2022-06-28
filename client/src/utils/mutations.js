import { gql } from '@apollo/client';

export const LOGIN_USER = gql `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql `
  mutation addUser($username: String!, $email: String!, $password: String) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PROJECT = gql `
  mutation addProject($projectText: String!) {
    addProject(projectText: $projectText) {
      _id
      projectText
      createdAt
      username
      commentCount
      comments {
        _id
      }
    }
  }
`;

export const ADD_SAVED_PROJECT = gql `
  mutation addSavedProject($id: ID!) {
    addSavedProject(projectId: $id) {
        _id
        projectText
        createdAt
        username
        commentCount
        comments {
            _id
            username
        }
    }
  }
`;

export const ADD_COMMENT = gql `
  mutation addComment($projectId: ID!, $reactionBody: String!) {
    addComment(projectId: $projectId, reactionBody: $reactionBody) {
      _id
      commentCount
      comments {
        _id
        reactionBody
        createdAt
        username
      }
    }
  }
`;