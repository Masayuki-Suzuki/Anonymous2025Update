/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query Posts($pagination: PaginationArg) {\n  posts(sort: \"createdAt:desc\", pagination: $pagination) {\n    documentId\n    title\n    slug\n    excerpt\n    thumbnail {\n      url\n      alternativeText\n      width\n      height\n    }\n    tags {\n      name\n      slug\n    }\n    createdAt\n    updatedAt\n  }\n  posts_connection(pagination: $pagination) {\n    pageInfo {\n      total\n      pageCount\n      page\n      pageSize\n    }\n  }\n}": typeof types.PostsDocument,
    "query Tags {\n  tags {\n    documentId\n    slug\n    name\n    posts {\n      documentId\n    }\n  }\n}": typeof types.TagsDocument,
    "query SearchPosts($searchTerm: String!, $pagination: PaginationArg!, $sort: [String]) {\n  posts(\n    filters: {or: [{title: {containsi: $searchTerm}}, {content: {containsi: $searchTerm}}]}\n    pagination: $pagination\n    sort: $sort\n  ) {\n    documentId\n    title\n    tags {\n      name\n      slug\n    }\n    createdAt\n    updatedAt\n    slug\n    excerpt\n  }\n  posts_connection(\n    pagination: $pagination\n    filters: {or: [{title: {containsi: $searchTerm}}, {content: {containsi: $searchTerm}}]}\n  ) {\n    pageInfo {\n      page\n      pageCount\n      pageSize\n      total\n    }\n  }\n}": typeof types.SearchPostsDocument,
    "query GetAboutPage {\n  about {\n    content\n  }\n}": typeof types.GetAboutPageDocument,
    "query About {\n  about {\n    content\n  }\n}": typeof types.AboutDocument,
    "query getAboutWidgetContent {\n  aboutWidget {\n    content\n    profile_image {\n      alternativeText\n      url\n      name\n      width\n      height\n    }\n  }\n}": typeof types.GetAboutWidgetContentDocument,
    "query GetArchiveBySlug($filters: PostFiltersInput, $sort: [String], $pagination: PaginationArg, $status: PublicationStatus) {\n  posts(filters: $filters, sort: $sort, pagination: $pagination, status: $status) {\n    documentId\n    title\n    slug\n    createdAt\n    updatedAt\n    thumbnail {\n      url\n      alternativeText\n      width\n      height\n    }\n    tags {\n      name\n      slug\n    }\n    archive {\n      slug\n      title\n    }\n    excerpt\n  }\n  posts_connection(pagination: $pagination, filters: $filters, status: $status) {\n    pageInfo {\n      page\n      pageSize\n      pageCount\n      total\n    }\n  }\n}": typeof types.GetArchiveBySlugDocument,
    "query Archives {\n  archives {\n    documentId\n    title\n    slug\n    posts(filters: {publishedAt: {ne: null}}) {\n      documentId\n      title\n      slug\n      publishedAt\n    }\n  }\n}": typeof types.ArchivesDocument,
    "query GetOneArticle($slug: String!) {\n  posts(filters: {slug: {eq: $slug}}) {\n    documentId\n    title\n    content\n    createdAt\n    updatedAt\n    thumbnail {\n      url\n      alternativeText\n      width\n      height\n    }\n    tags {\n      name\n      slug\n    }\n  }\n}": typeof types.GetOneArticleDocument,
    "query GetOneTagName($slug: String!) {\n  tags(filters: {slug: {eq: $slug}}) {\n    name\n  }\n}": typeof types.GetOneTagNameDocument,
    "query GetPostByTagSlug($filters: PostFiltersInput, $sort: [String], $pagination: PaginationArg, $status: PublicationStatus) {\n  posts(filters: $filters, sort: $sort, pagination: $pagination, status: $status) {\n    documentId\n    title\n    slug\n    createdAt\n    updatedAt\n    thumbnail {\n      url\n      alternativeText\n      width\n      height\n    }\n    tags {\n      name\n      slug\n    }\n    excerpt\n  }\n  posts_connection(pagination: $pagination, filters: $filters, status: $status) {\n    pageInfo {\n      page\n      pageSize\n      pageCount\n      total\n    }\n  }\n}": typeof types.GetPostByTagSlugDocument,
    "query getPrivacyPolicyContent {\n  privacyPolicy {\n    content\n    createdAt\n    publishedAt\n    updatedAt\n  }\n}": typeof types.GetPrivacyPolicyContentDocument,
    "query getRecentArticles {\n  posts(sort: \"createdAt:desc\", pagination: {limit: 5}) {\n    documentId\n    title\n    slug\n    thumbnail {\n      url\n      alternativeText\n      width\n      height\n    }\n    createdAt\n    updatedAt\n  }\n}": typeof types.GetRecentArticlesDocument,
};
const documents: Documents = {
    "query Posts($pagination: PaginationArg) {\n  posts(sort: \"createdAt:desc\", pagination: $pagination) {\n    documentId\n    title\n    slug\n    excerpt\n    thumbnail {\n      url\n      alternativeText\n      width\n      height\n    }\n    tags {\n      name\n      slug\n    }\n    createdAt\n    updatedAt\n  }\n  posts_connection(pagination: $pagination) {\n    pageInfo {\n      total\n      pageCount\n      page\n      pageSize\n    }\n  }\n}": types.PostsDocument,
    "query Tags {\n  tags {\n    documentId\n    slug\n    name\n    posts {\n      documentId\n    }\n  }\n}": types.TagsDocument,
    "query SearchPosts($searchTerm: String!, $pagination: PaginationArg!, $sort: [String]) {\n  posts(\n    filters: {or: [{title: {containsi: $searchTerm}}, {content: {containsi: $searchTerm}}]}\n    pagination: $pagination\n    sort: $sort\n  ) {\n    documentId\n    title\n    tags {\n      name\n      slug\n    }\n    createdAt\n    updatedAt\n    slug\n    excerpt\n  }\n  posts_connection(\n    pagination: $pagination\n    filters: {or: [{title: {containsi: $searchTerm}}, {content: {containsi: $searchTerm}}]}\n  ) {\n    pageInfo {\n      page\n      pageCount\n      pageSize\n      total\n    }\n  }\n}": types.SearchPostsDocument,
    "query GetAboutPage {\n  about {\n    content\n  }\n}": types.GetAboutPageDocument,
    "query About {\n  about {\n    content\n  }\n}": types.AboutDocument,
    "query getAboutWidgetContent {\n  aboutWidget {\n    content\n    profile_image {\n      alternativeText\n      url\n      name\n      width\n      height\n    }\n  }\n}": types.GetAboutWidgetContentDocument,
    "query GetArchiveBySlug($filters: PostFiltersInput, $sort: [String], $pagination: PaginationArg, $status: PublicationStatus) {\n  posts(filters: $filters, sort: $sort, pagination: $pagination, status: $status) {\n    documentId\n    title\n    slug\n    createdAt\n    updatedAt\n    thumbnail {\n      url\n      alternativeText\n      width\n      height\n    }\n    tags {\n      name\n      slug\n    }\n    archive {\n      slug\n      title\n    }\n    excerpt\n  }\n  posts_connection(pagination: $pagination, filters: $filters, status: $status) {\n    pageInfo {\n      page\n      pageSize\n      pageCount\n      total\n    }\n  }\n}": types.GetArchiveBySlugDocument,
    "query Archives {\n  archives {\n    documentId\n    title\n    slug\n    posts(filters: {publishedAt: {ne: null}}) {\n      documentId\n      title\n      slug\n      publishedAt\n    }\n  }\n}": types.ArchivesDocument,
    "query GetOneArticle($slug: String!) {\n  posts(filters: {slug: {eq: $slug}}) {\n    documentId\n    title\n    content\n    createdAt\n    updatedAt\n    thumbnail {\n      url\n      alternativeText\n      width\n      height\n    }\n    tags {\n      name\n      slug\n    }\n  }\n}": types.GetOneArticleDocument,
    "query GetOneTagName($slug: String!) {\n  tags(filters: {slug: {eq: $slug}}) {\n    name\n  }\n}": types.GetOneTagNameDocument,
    "query GetPostByTagSlug($filters: PostFiltersInput, $sort: [String], $pagination: PaginationArg, $status: PublicationStatus) {\n  posts(filters: $filters, sort: $sort, pagination: $pagination, status: $status) {\n    documentId\n    title\n    slug\n    createdAt\n    updatedAt\n    thumbnail {\n      url\n      alternativeText\n      width\n      height\n    }\n    tags {\n      name\n      slug\n    }\n    excerpt\n  }\n  posts_connection(pagination: $pagination, filters: $filters, status: $status) {\n    pageInfo {\n      page\n      pageSize\n      pageCount\n      total\n    }\n  }\n}": types.GetPostByTagSlugDocument,
    "query getPrivacyPolicyContent {\n  privacyPolicy {\n    content\n    createdAt\n    publishedAt\n    updatedAt\n  }\n}": types.GetPrivacyPolicyContentDocument,
    "query getRecentArticles {\n  posts(sort: \"createdAt:desc\", pagination: {limit: 5}) {\n    documentId\n    title\n    slug\n    thumbnail {\n      url\n      alternativeText\n      width\n      height\n    }\n    createdAt\n    updatedAt\n  }\n}": types.GetRecentArticlesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Posts($pagination: PaginationArg) {\n  posts(sort: \"createdAt:desc\", pagination: $pagination) {\n    documentId\n    title\n    slug\n    excerpt\n    thumbnail {\n      url\n      alternativeText\n      width\n      height\n    }\n    tags {\n      name\n      slug\n    }\n    createdAt\n    updatedAt\n  }\n  posts_connection(pagination: $pagination) {\n    pageInfo {\n      total\n      pageCount\n      page\n      pageSize\n    }\n  }\n}"): (typeof documents)["query Posts($pagination: PaginationArg) {\n  posts(sort: \"createdAt:desc\", pagination: $pagination) {\n    documentId\n    title\n    slug\n    excerpt\n    thumbnail {\n      url\n      alternativeText\n      width\n      height\n    }\n    tags {\n      name\n      slug\n    }\n    createdAt\n    updatedAt\n  }\n  posts_connection(pagination: $pagination) {\n    pageInfo {\n      total\n      pageCount\n      page\n      pageSize\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Tags {\n  tags {\n    documentId\n    slug\n    name\n    posts {\n      documentId\n    }\n  }\n}"): (typeof documents)["query Tags {\n  tags {\n    documentId\n    slug\n    name\n    posts {\n      documentId\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SearchPosts($searchTerm: String!, $pagination: PaginationArg!, $sort: [String]) {\n  posts(\n    filters: {or: [{title: {containsi: $searchTerm}}, {content: {containsi: $searchTerm}}]}\n    pagination: $pagination\n    sort: $sort\n  ) {\n    documentId\n    title\n    tags {\n      name\n      slug\n    }\n    createdAt\n    updatedAt\n    slug\n    excerpt\n  }\n  posts_connection(\n    pagination: $pagination\n    filters: {or: [{title: {containsi: $searchTerm}}, {content: {containsi: $searchTerm}}]}\n  ) {\n    pageInfo {\n      page\n      pageCount\n      pageSize\n      total\n    }\n  }\n}"): (typeof documents)["query SearchPosts($searchTerm: String!, $pagination: PaginationArg!, $sort: [String]) {\n  posts(\n    filters: {or: [{title: {containsi: $searchTerm}}, {content: {containsi: $searchTerm}}]}\n    pagination: $pagination\n    sort: $sort\n  ) {\n    documentId\n    title\n    tags {\n      name\n      slug\n    }\n    createdAt\n    updatedAt\n    slug\n    excerpt\n  }\n  posts_connection(\n    pagination: $pagination\n    filters: {or: [{title: {containsi: $searchTerm}}, {content: {containsi: $searchTerm}}]}\n  ) {\n    pageInfo {\n      page\n      pageCount\n      pageSize\n      total\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAboutPage {\n  about {\n    content\n  }\n}"): (typeof documents)["query GetAboutPage {\n  about {\n    content\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query About {\n  about {\n    content\n  }\n}"): (typeof documents)["query About {\n  about {\n    content\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getAboutWidgetContent {\n  aboutWidget {\n    content\n    profile_image {\n      alternativeText\n      url\n      name\n      width\n      height\n    }\n  }\n}"): (typeof documents)["query getAboutWidgetContent {\n  aboutWidget {\n    content\n    profile_image {\n      alternativeText\n      url\n      name\n      width\n      height\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetArchiveBySlug($filters: PostFiltersInput, $sort: [String], $pagination: PaginationArg, $status: PublicationStatus) {\n  posts(filters: $filters, sort: $sort, pagination: $pagination, status: $status) {\n    documentId\n    title\n    slug\n    createdAt\n    updatedAt\n    thumbnail {\n      url\n      alternativeText\n      width\n      height\n    }\n    tags {\n      name\n      slug\n    }\n    archive {\n      slug\n      title\n    }\n    excerpt\n  }\n  posts_connection(pagination: $pagination, filters: $filters, status: $status) {\n    pageInfo {\n      page\n      pageSize\n      pageCount\n      total\n    }\n  }\n}"): (typeof documents)["query GetArchiveBySlug($filters: PostFiltersInput, $sort: [String], $pagination: PaginationArg, $status: PublicationStatus) {\n  posts(filters: $filters, sort: $sort, pagination: $pagination, status: $status) {\n    documentId\n    title\n    slug\n    createdAt\n    updatedAt\n    thumbnail {\n      url\n      alternativeText\n      width\n      height\n    }\n    tags {\n      name\n      slug\n    }\n    archive {\n      slug\n      title\n    }\n    excerpt\n  }\n  posts_connection(pagination: $pagination, filters: $filters, status: $status) {\n    pageInfo {\n      page\n      pageSize\n      pageCount\n      total\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Archives {\n  archives {\n    documentId\n    title\n    slug\n    posts(filters: {publishedAt: {ne: null}}) {\n      documentId\n      title\n      slug\n      publishedAt\n    }\n  }\n}"): (typeof documents)["query Archives {\n  archives {\n    documentId\n    title\n    slug\n    posts(filters: {publishedAt: {ne: null}}) {\n      documentId\n      title\n      slug\n      publishedAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetOneArticle($slug: String!) {\n  posts(filters: {slug: {eq: $slug}}) {\n    documentId\n    title\n    content\n    createdAt\n    updatedAt\n    thumbnail {\n      url\n      alternativeText\n      width\n      height\n    }\n    tags {\n      name\n      slug\n    }\n  }\n}"): (typeof documents)["query GetOneArticle($slug: String!) {\n  posts(filters: {slug: {eq: $slug}}) {\n    documentId\n    title\n    content\n    createdAt\n    updatedAt\n    thumbnail {\n      url\n      alternativeText\n      width\n      height\n    }\n    tags {\n      name\n      slug\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetOneTagName($slug: String!) {\n  tags(filters: {slug: {eq: $slug}}) {\n    name\n  }\n}"): (typeof documents)["query GetOneTagName($slug: String!) {\n  tags(filters: {slug: {eq: $slug}}) {\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetPostByTagSlug($filters: PostFiltersInput, $sort: [String], $pagination: PaginationArg, $status: PublicationStatus) {\n  posts(filters: $filters, sort: $sort, pagination: $pagination, status: $status) {\n    documentId\n    title\n    slug\n    createdAt\n    updatedAt\n    thumbnail {\n      url\n      alternativeText\n      width\n      height\n    }\n    tags {\n      name\n      slug\n    }\n    excerpt\n  }\n  posts_connection(pagination: $pagination, filters: $filters, status: $status) {\n    pageInfo {\n      page\n      pageSize\n      pageCount\n      total\n    }\n  }\n}"): (typeof documents)["query GetPostByTagSlug($filters: PostFiltersInput, $sort: [String], $pagination: PaginationArg, $status: PublicationStatus) {\n  posts(filters: $filters, sort: $sort, pagination: $pagination, status: $status) {\n    documentId\n    title\n    slug\n    createdAt\n    updatedAt\n    thumbnail {\n      url\n      alternativeText\n      width\n      height\n    }\n    tags {\n      name\n      slug\n    }\n    excerpt\n  }\n  posts_connection(pagination: $pagination, filters: $filters, status: $status) {\n    pageInfo {\n      page\n      pageSize\n      pageCount\n      total\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getPrivacyPolicyContent {\n  privacyPolicy {\n    content\n    createdAt\n    publishedAt\n    updatedAt\n  }\n}"): (typeof documents)["query getPrivacyPolicyContent {\n  privacyPolicy {\n    content\n    createdAt\n    publishedAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getRecentArticles {\n  posts(sort: \"createdAt:desc\", pagination: {limit: 5}) {\n    documentId\n    title\n    slug\n    thumbnail {\n      url\n      alternativeText\n      width\n      height\n    }\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["query getRecentArticles {\n  posts(sort: \"createdAt:desc\", pagination: {limit: 5}) {\n    documentId\n    title\n    slug\n    thumbnail {\n      url\n      alternativeText\n      width\n      height\n    }\n    createdAt\n    updatedAt\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;