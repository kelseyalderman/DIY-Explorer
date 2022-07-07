import { gql } from "@apollo/client";

export const QUERY_PROJECTS = gql`
  query projects($username: String) {
    projects(username: $username) {
      _id
      projectTitle
      projectText
      createdAt
      username
      commentCount
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;

export const QUERY_PROJECT = gql`
  query project($id: ID!) {
    project(_id: $id) {
      _id
      projectTitle
      projectText
      createdAt
      username
      commentCount
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      savedProjects {
        _id
        projectTitle
        projectText
        createdAt
        username
      }
      projects {
        _id
        projectTitle
        projectText
        createdAt
        commentCount
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      projects {
        _id
        projectTitle
        projectText
        createdAt
        commentCount
        comments {
          _id
          createdAt
          commentBody
          username
        }
      }
      savedProjects {
        _id
        projectTitle
        projectText
        createdAt
        username
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      savedProjects {
        _id
        projectTitle
        projectText
        createdAt
        username
      }
    }
  }
`;
