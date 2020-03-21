import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
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

export type CreateStatusMutationVariables = {
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  color: Scalars['String'];
  orderIndex: Scalars['Int'];
  isActive: Scalars['Boolean'];
};


export type CreateStatusMutation = (
  { __typename?: 'Mutation' }
  & { createStatus: Maybe<(
    { __typename?: 'Status' }
    & Pick<Status, 'id' | 'title' | 'description' | 'color' | 'orderIndex'>
  )> }
);

export type FilterStatusesQueryVariables = {
  filter?: Maybe<StatusFilter>;
};


export type FilterStatusesQuery = (
  { __typename?: 'Query' }
  & { allStatuses: Maybe<Array<Maybe<(
    { __typename?: 'Status' }
    & Pick<Status, 'id' | 'title' | 'description' | 'color' | 'orderIndex'>
  )>>> }
);

export type GetStatusQueryVariables = {
  id: Scalars['ID'];
};


export type GetStatusQuery = (
  { __typename?: 'Query' }
  & { Status: Maybe<(
    { __typename?: 'Status' }
    & Pick<Status, 'id' | 'title' | 'description' | 'color' | 'orderIndex' | 'isActive'>
  )> }
);

export type UpdateStatusMutationVariables = {
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  color: Scalars['String'];
  orderIndex: Scalars['Int'];
  isActive: Scalars['Boolean'];
};


export type UpdateStatusMutation = (
  { __typename?: 'Mutation' }
  & { updateStatus: Maybe<(
    { __typename?: 'Status' }
    & Pick<Status, 'id' | 'title' | 'description' | 'color' | 'orderIndex'>
  )> }
);

export type AllStatusesQueryVariables = {};


export type AllStatusesQuery = (
  { __typename?: 'Query' }
  & { allStatuses: Maybe<Array<Maybe<(
    { __typename?: 'Status' }
    & Pick<Status, 'id' | 'title' | 'description' | 'color' | 'orderIndex'>
  )>>> }
);


export const CreateStatusDocument = gql`
    mutation CreateStatus($id: ID!, $title: String!, $description: String!, $color: String!, $orderIndex: Int!, $isActive: Boolean!) {
  createStatus(id: $id, title: $title, description: $description, color: $color, orderIndex: $orderIndex, isActive: $isActive) {
    id
    title
    description
    color
    orderIndex
  }
}
    `;
export type CreateStatusMutationFn = ApolloReactCommon.MutationFunction<CreateStatusMutation, CreateStatusMutationVariables>;
export type CreateStatusComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateStatusMutation, CreateStatusMutationVariables>, 'mutation'>;

    export const CreateStatusComponent = (props: CreateStatusComponentProps) => (
      <ApolloReactComponents.Mutation<CreateStatusMutation, CreateStatusMutationVariables> mutation={CreateStatusDocument} {...props} />
    );
    
export type CreateStatusProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateStatusMutation, CreateStatusMutationVariables> & TChildProps;
export function withCreateStatus<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateStatusMutation,
  CreateStatusMutationVariables,
  CreateStatusProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateStatusMutation, CreateStatusMutationVariables, CreateStatusProps<TChildProps>>(CreateStatusDocument, {
      alias: 'createStatus',
      ...operationOptions
    });
};

/**
 * __useCreateStatusMutation__
 *
 * To run a mutation, you first call `useCreateStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStatusMutation, { data, loading, error }] = useCreateStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      color: // value for 'color'
 *      orderIndex: // value for 'orderIndex'
 *      isActive: // value for 'isActive'
 *   },
 * });
 */
export function useCreateStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateStatusMutation, CreateStatusMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateStatusMutation, CreateStatusMutationVariables>(CreateStatusDocument, baseOptions);
      }
export type CreateStatusMutationHookResult = ReturnType<typeof useCreateStatusMutation>;
export type CreateStatusMutationResult = ApolloReactCommon.MutationResult<CreateStatusMutation>;
export type CreateStatusMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateStatusMutation, CreateStatusMutationVariables>;
export const FilterStatusesDocument = gql`
    query FilterStatuses($filter: StatusFilter) {
  allStatuses(filter: $filter) {
    id
    title
    description
    color
    orderIndex
  }
}
    `;
export type FilterStatusesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<FilterStatusesQuery, FilterStatusesQueryVariables>, 'query'>;

    export const FilterStatusesComponent = (props: FilterStatusesComponentProps) => (
      <ApolloReactComponents.Query<FilterStatusesQuery, FilterStatusesQueryVariables> query={FilterStatusesDocument} {...props} />
    );
    
export type FilterStatusesProps<TChildProps = {}> = ApolloReactHoc.DataProps<FilterStatusesQuery, FilterStatusesQueryVariables> & TChildProps;
export function withFilterStatuses<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FilterStatusesQuery,
  FilterStatusesQueryVariables,
  FilterStatusesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, FilterStatusesQuery, FilterStatusesQueryVariables, FilterStatusesProps<TChildProps>>(FilterStatusesDocument, {
      alias: 'filterStatuses',
      ...operationOptions
    });
};

/**
 * __useFilterStatusesQuery__
 *
 * To run a query within a React component, call `useFilterStatusesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilterStatusesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilterStatusesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useFilterStatusesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FilterStatusesQuery, FilterStatusesQueryVariables>) {
        return ApolloReactHooks.useQuery<FilterStatusesQuery, FilterStatusesQueryVariables>(FilterStatusesDocument, baseOptions);
      }
export function useFilterStatusesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FilterStatusesQuery, FilterStatusesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FilterStatusesQuery, FilterStatusesQueryVariables>(FilterStatusesDocument, baseOptions);
        }
export type FilterStatusesQueryHookResult = ReturnType<typeof useFilterStatusesQuery>;
export type FilterStatusesLazyQueryHookResult = ReturnType<typeof useFilterStatusesLazyQuery>;
export type FilterStatusesQueryResult = ApolloReactCommon.QueryResult<FilterStatusesQuery, FilterStatusesQueryVariables>;
export const GetStatusDocument = gql`
    query GetStatus($id: ID!) {
  Status(id: $id) {
    id
    title
    description
    color
    orderIndex
    isActive
  }
}
    `;
export type GetStatusComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetStatusQuery, GetStatusQueryVariables>, 'query'> & ({ variables: GetStatusQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetStatusComponent = (props: GetStatusComponentProps) => (
      <ApolloReactComponents.Query<GetStatusQuery, GetStatusQueryVariables> query={GetStatusDocument} {...props} />
    );
    
export type GetStatusProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetStatusQuery, GetStatusQueryVariables> & TChildProps;
export function withGetStatus<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetStatusQuery,
  GetStatusQueryVariables,
  GetStatusProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetStatusQuery, GetStatusQueryVariables, GetStatusProps<TChildProps>>(GetStatusDocument, {
      alias: 'getStatus',
      ...operationOptions
    });
};

/**
 * __useGetStatusQuery__
 *
 * To run a query within a React component, call `useGetStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatusQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetStatusQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetStatusQuery, GetStatusQueryVariables>) {
        return ApolloReactHooks.useQuery<GetStatusQuery, GetStatusQueryVariables>(GetStatusDocument, baseOptions);
      }
export function useGetStatusLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetStatusQuery, GetStatusQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetStatusQuery, GetStatusQueryVariables>(GetStatusDocument, baseOptions);
        }
export type GetStatusQueryHookResult = ReturnType<typeof useGetStatusQuery>;
export type GetStatusLazyQueryHookResult = ReturnType<typeof useGetStatusLazyQuery>;
export type GetStatusQueryResult = ApolloReactCommon.QueryResult<GetStatusQuery, GetStatusQueryVariables>;
export const UpdateStatusDocument = gql`
    mutation UpdateStatus($id: ID!, $title: String!, $description: String!, $color: String!, $orderIndex: Int!, $isActive: Boolean!) {
  updateStatus(id: $id, title: $title, description: $description, color: $color, orderIndex: $orderIndex, isActive: $isActive) {
    id
    title
    description
    color
    orderIndex
  }
}
    `;
export type UpdateStatusMutationFn = ApolloReactCommon.MutationFunction<UpdateStatusMutation, UpdateStatusMutationVariables>;
export type UpdateStatusComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateStatusMutation, UpdateStatusMutationVariables>, 'mutation'>;

    export const UpdateStatusComponent = (props: UpdateStatusComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateStatusMutation, UpdateStatusMutationVariables> mutation={UpdateStatusDocument} {...props} />
    );
    
export type UpdateStatusProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateStatusMutation, UpdateStatusMutationVariables> & TChildProps;
export function withUpdateStatus<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateStatusMutation,
  UpdateStatusMutationVariables,
  UpdateStatusProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateStatusMutation, UpdateStatusMutationVariables, UpdateStatusProps<TChildProps>>(UpdateStatusDocument, {
      alias: 'updateStatus',
      ...operationOptions
    });
};

/**
 * __useUpdateStatusMutation__
 *
 * To run a mutation, you first call `useUpdateStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStatusMutation, { data, loading, error }] = useUpdateStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      color: // value for 'color'
 *      orderIndex: // value for 'orderIndex'
 *      isActive: // value for 'isActive'
 *   },
 * });
 */
export function useUpdateStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateStatusMutation, UpdateStatusMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateStatusMutation, UpdateStatusMutationVariables>(UpdateStatusDocument, baseOptions);
      }
export type UpdateStatusMutationHookResult = ReturnType<typeof useUpdateStatusMutation>;
export type UpdateStatusMutationResult = ApolloReactCommon.MutationResult<UpdateStatusMutation>;
export type UpdateStatusMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateStatusMutation, UpdateStatusMutationVariables>;
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