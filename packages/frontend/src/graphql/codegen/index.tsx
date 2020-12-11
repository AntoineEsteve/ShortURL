import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  getShortUrl?: Maybe<ShortUrl>;
  listShortUrls: Array<ShortUrl>;
};


export type QueryGetShortUrlArgs = {
  id: Scalars['Int'];
};


export type QueryListShortUrlsArgs = {
  onlyUser: Scalars['Boolean'];
};

export type ShortUrl = {
  __typename?: 'ShortUrl';
  id: Scalars['Int'];
  url: Scalars['String'];
  userid?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createShortUrl: ShortUrl;
  deleteShortUrl: Scalars['Boolean'];
  anonymousSignIn: AnonymousSignInResponse;
};


export type MutationCreateShortUrlArgs = {
  url: Scalars['String'];
};


export type MutationDeleteShortUrlArgs = {
  id: Scalars['Int'];
};

export type AnonymousSignInResponse = {
  __typename?: 'AnonymousSignInResponse';
  userid: Scalars['Int'];
  token: Scalars['String'];
};

export type AnonymousSignInMutationVariables = Exact<{ [key: string]: never; }>;


export type AnonymousSignInMutation = (
  { __typename?: 'Mutation' }
  & { anonymousSignIn: (
    { __typename?: 'AnonymousSignInResponse' }
    & Pick<AnonymousSignInResponse, 'userid' | 'token'>
  ) }
);

export type CreateShortUrlMutationVariables = Exact<{
  url: Scalars['String'];
}>;


export type CreateShortUrlMutation = (
  { __typename?: 'Mutation' }
  & { createShortUrl: (
    { __typename?: 'ShortUrl' }
    & Pick<ShortUrl, 'id' | 'url' | 'userid'>
  ) }
);

export type DeleteShortUrlMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteShortUrlMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteShortUrl'>
);

export type ListShortUrlsQueryVariables = Exact<{
  onlyUser: Scalars['Boolean'];
}>;


export type ListShortUrlsQuery = (
  { __typename?: 'Query' }
  & { listShortUrls: Array<(
    { __typename?: 'ShortUrl' }
    & Pick<ShortUrl, 'id' | 'url' | 'userid'>
  )> }
);


export const AnonymousSignInDocument = gql`
    mutation AnonymousSignIn {
  anonymousSignIn {
    userid
    token
  }
}
    `;
export type AnonymousSignInMutationFn = Apollo.MutationFunction<AnonymousSignInMutation, AnonymousSignInMutationVariables>;

/**
 * __useAnonymousSignInMutation__
 *
 * To run a mutation, you first call `useAnonymousSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAnonymousSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [anonymousSignInMutation, { data, loading, error }] = useAnonymousSignInMutation({
 *   variables: {
 *   },
 * });
 */
export function useAnonymousSignInMutation(baseOptions?: Apollo.MutationHookOptions<AnonymousSignInMutation, AnonymousSignInMutationVariables>) {
        return Apollo.useMutation<AnonymousSignInMutation, AnonymousSignInMutationVariables>(AnonymousSignInDocument, baseOptions);
      }
export type AnonymousSignInMutationHookResult = ReturnType<typeof useAnonymousSignInMutation>;
export type AnonymousSignInMutationResult = Apollo.MutationResult<AnonymousSignInMutation>;
export type AnonymousSignInMutationOptions = Apollo.BaseMutationOptions<AnonymousSignInMutation, AnonymousSignInMutationVariables>;
export const CreateShortUrlDocument = gql`
    mutation CreateShortUrl($url: String!) {
  createShortUrl(url: $url) {
    id
    url
    userid
  }
}
    `;
export type CreateShortUrlMutationFn = Apollo.MutationFunction<CreateShortUrlMutation, CreateShortUrlMutationVariables>;

/**
 * __useCreateShortUrlMutation__
 *
 * To run a mutation, you first call `useCreateShortUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShortUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShortUrlMutation, { data, loading, error }] = useCreateShortUrlMutation({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useCreateShortUrlMutation(baseOptions?: Apollo.MutationHookOptions<CreateShortUrlMutation, CreateShortUrlMutationVariables>) {
        return Apollo.useMutation<CreateShortUrlMutation, CreateShortUrlMutationVariables>(CreateShortUrlDocument, baseOptions);
      }
export type CreateShortUrlMutationHookResult = ReturnType<typeof useCreateShortUrlMutation>;
export type CreateShortUrlMutationResult = Apollo.MutationResult<CreateShortUrlMutation>;
export type CreateShortUrlMutationOptions = Apollo.BaseMutationOptions<CreateShortUrlMutation, CreateShortUrlMutationVariables>;
export const DeleteShortUrlDocument = gql`
    mutation DeleteShortUrl($id: Int!) {
  deleteShortUrl(id: $id)
}
    `;
export type DeleteShortUrlMutationFn = Apollo.MutationFunction<DeleteShortUrlMutation, DeleteShortUrlMutationVariables>;

/**
 * __useDeleteShortUrlMutation__
 *
 * To run a mutation, you first call `useDeleteShortUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteShortUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteShortUrlMutation, { data, loading, error }] = useDeleteShortUrlMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteShortUrlMutation(baseOptions?: Apollo.MutationHookOptions<DeleteShortUrlMutation, DeleteShortUrlMutationVariables>) {
        return Apollo.useMutation<DeleteShortUrlMutation, DeleteShortUrlMutationVariables>(DeleteShortUrlDocument, baseOptions);
      }
export type DeleteShortUrlMutationHookResult = ReturnType<typeof useDeleteShortUrlMutation>;
export type DeleteShortUrlMutationResult = Apollo.MutationResult<DeleteShortUrlMutation>;
export type DeleteShortUrlMutationOptions = Apollo.BaseMutationOptions<DeleteShortUrlMutation, DeleteShortUrlMutationVariables>;
export const ListShortUrlsDocument = gql`
    query ListShortUrls($onlyUser: Boolean!) {
  listShortUrls(onlyUser: $onlyUser) {
    id
    url
    userid
  }
}
    `;

/**
 * __useListShortUrlsQuery__
 *
 * To run a query within a React component, call `useListShortUrlsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListShortUrlsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListShortUrlsQuery({
 *   variables: {
 *      onlyUser: // value for 'onlyUser'
 *   },
 * });
 */
export function useListShortUrlsQuery(baseOptions: Apollo.QueryHookOptions<ListShortUrlsQuery, ListShortUrlsQueryVariables>) {
        return Apollo.useQuery<ListShortUrlsQuery, ListShortUrlsQueryVariables>(ListShortUrlsDocument, baseOptions);
      }
export function useListShortUrlsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListShortUrlsQuery, ListShortUrlsQueryVariables>) {
          return Apollo.useLazyQuery<ListShortUrlsQuery, ListShortUrlsQueryVariables>(ListShortUrlsDocument, baseOptions);
        }
export type ListShortUrlsQueryHookResult = ReturnType<typeof useListShortUrlsQuery>;
export type ListShortUrlsLazyQueryHookResult = ReturnType<typeof useListShortUrlsLazyQuery>;
export type ListShortUrlsQueryResult = Apollo.QueryResult<ListShortUrlsQuery, ListShortUrlsQueryVariables>;