import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
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

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_SAVED_PROJECT = gql`
  mutation addSavedProject($id: ID!) {
    addSavedProject(savedProjectId: $id) {
      _id
      username
      projectTitle
      projectText
      createdAt
      commentCount
      comments {
        _id
        username
      }
    }
  }
`;

export const REMOVE_SAVED_PROJECT = gql`
  mutation removeSavedProject($id: ID!) {
    removeSavedProject(savedProjectId: $id) {
      _id
      username
      projectTitle
      projectText
      createdAt
      commentCount
      comments {
        _id
        username
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($projectTitle: String!, $projectText: String!) {
    addProject(projectTitle: $projectTitle, projectText: $projectText) {
      _id
      projectTitle
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

export const ADD_COMMENT = gql`
  mutation addComment($projectId: ID!, $commentBody: String!) {
    addComment(projectId: $projectId, commentBody: $commentBody) {
      _id
      commentCount
      comments {
        _id
        commentBody
        createdAt
        username
      }
    }
  }
`;
