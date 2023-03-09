import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-boost';
import { client } from './client';
import { PhotosPage } from '../interfaces/photos';

const PHOTO_FIELDS = `
id
title
thumbnailUrl
url
`;

export const getPhotosPage = (
  searchString: string,
  pageNo: number,
  limit: number
): Promise<PhotosPage | undefined> =>
  client
    .query({
      fetchPolicy: 'no-cache',
      query: gql`
          query ($searchString: String!, $pageNo: Int!, $limit: Int!) {
            photos (options: { search: {q: $searchString }, paginate : { page: $pageNo, limit: $limit }}) {
              data {
                ${PHOTO_FIELDS}
              }
              links {
                last {
                  page
                }
              }
            }
          }
        `,
      variables: { searchString, pageNo, limit },
    })
    .then((res: ApolloQueryResult<{ photos: PhotosPage }>) => res.data.photos)
    .catch(() => undefined);
