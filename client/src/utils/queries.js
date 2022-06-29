import { gql } from '@apollo/client';

export const QUERY_ME = gql `
  {
    me {
      _id
      username
      email
      projects {
        _id
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
        projectText
        createdAt
        username
      }
    }
  }
`;

export const QUERY_USER = gql `
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      projects {
        _id
        projectText
        createdAt
        commentCount
      }
      savedProjects {
        _id
        projectText
        createdAt
        username
      }
    }
  }
`;

export const QUERY_PROJECTS = gql `
  query projects($username: String) {
    projects(username: $username) {
        _id
        projectText
        createdAt
        username
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

export const QUERY_PROJECT = gql `
  query project($id: ID!) {
    project(_id: $id) {
        _id
        projectText
        createdAt
        username
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
