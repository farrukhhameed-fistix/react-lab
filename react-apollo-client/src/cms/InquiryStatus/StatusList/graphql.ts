import gql from 'graphql-tag';

export const GET_ALL_STATUSES = gql`
  {
    allStatuses{
        id
        title
        description
        color
        orderIndex
      }
  }
`;