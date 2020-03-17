import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ListMetadata = {
   __typename?: 'ListMetadata';
  count?: Maybe<Scalars['Int']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  createStatus?: Maybe<Status>;
  updateStatus?: Maybe<Status>;
  removeStatus?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateStatusArgs = {
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  color: Scalars['String'];
  orderIndex: Scalars['Int'];
  isActive: Scalars['Boolean'];
};


export type MutationUpdateStatusArgs = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  orderIndex?: Maybe<Scalars['Int']>;
  isActive?: Maybe<Scalars['Boolean']>;
};


export type MutationRemoveStatusArgs = {
  id: Scalars['ID'];
};

export type Query = {
   __typename?: 'Query';
  Status?: Maybe<Status>;
  allStatuses?: Maybe<Array<Maybe<Status>>>;
  _allStatusesMeta?: Maybe<ListMetadata>;
};


export type QueryStatusArgs = {
  id: Scalars['ID'];
};


export type QueryAllStatusesArgs = {
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sortField?: Maybe<Scalars['String']>;
  sortOrder?: Maybe<Scalars['String']>;
  filter?: Maybe<StatusFilter>;
};


export type Query_AllStatusesMetaArgs = {
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  filter?: Maybe<StatusFilter>;
};

export type Status = {
   __typename?: 'Status';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  color: Scalars['String'];
  orderIndex: Scalars['Int'];
  isActive: Scalars['Boolean'];
};

export type StatusFilter = {
  q?: Maybe<Scalars['String']>;
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>;
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  orderIndex?: Maybe<Scalars['Int']>;
  isActive?: Maybe<Scalars['Boolean']>;
  orderIndex_lt?: Maybe<Scalars['Int']>;
  orderIndex_lte?: Maybe<Scalars['Int']>;
  orderIndex_gt?: Maybe<Scalars['Int']>;
  orderIndex_gte?: Maybe<Scalars['Int']>;
};

export type AllStatusesQueryVariables = {};


export type AllStatusesQuery = (
  { __typename?: 'Query' }
  & { allStatuses: Maybe<Array<Maybe<(
    { __typename?: 'Status' }
    & Pick<Status, 'id' | 'title' | 'description' | 'color' | 'orderIndex'>
  )>>> }
);


export const AllStatusesDocument = gql`
    query AllStatuses {
  allStatuses {
    id
    title
    description
    color
    orderIndex
  }
}
    `;
export type AllStatusesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AllStatusesQuery, AllStatusesQueryVariables>, 'query'>;

    export const AllStatusesComponent = (props: AllStatusesComponentProps) => (
      <ApolloReactComponents.Query<AllStatusesQuery, AllStatusesQueryVariables> query={AllStatusesDocument} {...props} />
    );
    
export type AllStatusesProps<TChildProps = {}> = ApolloReactHoc.DataProps<AllStatusesQuery, AllStatusesQueryVariables> & TChildProps;
export function withAllStatuses<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AllStatusesQuery,
  AllStatusesQueryVariables,
  AllStatusesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, AllStatusesQuery, AllStatusesQueryVariables, AllStatusesProps<TChildProps>>(AllStatusesDocument, {
      alias: 'allStatuses',
      ...operationOptions
    });
};

/**
 * __useAllStatusesQuery__
 *
 * To run a query within a React component, call `useAllStatusesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllStatusesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllStatusesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllStatusesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AllStatusesQuery, AllStatusesQueryVariables>) {
        return ApolloReactHooks.useQuery<AllStatusesQuery, AllStatusesQueryVariables>(AllStatusesDocument, baseOptions);
      }
export function useAllStatusesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllStatusesQuery, AllStatusesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AllStatusesQuery, AllStatusesQueryVariables>(AllStatusesDocument, baseOptions);
        }
export type AllStatusesQueryHookResult = ReturnType<typeof useAllStatusesQuery>;
export type AllStatusesLazyQueryHookResult = ReturnType<typeof useAllStatusesLazyQuery>;
export type AllStatusesQueryResult = ApolloReactCommon.QueryResult<AllStatusesQuery, AllStatusesQueryVariables>;