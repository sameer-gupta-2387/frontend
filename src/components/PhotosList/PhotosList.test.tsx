import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import PhotosList from './PhotosList';
import * as getPhotos from '../../apis/getPhotos';
import { mockPhotosPage } from '../../mocks/PhotosList.mock';

describe('PhotosList', () => {
  test('renders photos list page', () => {
    const { queryByTestId } = render(<PhotosList />);
    expect(queryByTestId('photo-list-page')).not.toBeNull();
  });
  test('operations on the page', async () => {
    jest.spyOn(getPhotos, 'getPhotosPage').mockImplementation(() =>
      Promise.resolve({
        ...mockPhotosPage,
      })
    );
    const { queryByText, getByRole, getByLabelText, getByTestId } = await act(
      async () => render(<PhotosList />)
    );
    expect(getPhotos.getPhotosPage).toHaveBeenCalledTimes(1);

    expect(queryByText('unique-id-1')).not.toBeNull();
    await act(async () => queryByText('unique-id-1')?.click());
    expect(queryByText('Photo Preview')).not.toBeNull();
    await act(async () => getByLabelText('close')?.click());

    expect(getByTestId('thumbnail-unique-id-1')).not.toBeNull();
    await act(async () => getByTestId('thumbnail-unique-id-1')?.click());
    expect(queryByText('Photo Preview')).not.toBeNull();
    await act(async () => getByLabelText('close')?.click());

    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'ad' } });
    expect(queryByText('Search')).not.toBeNull();
    await act(async () => queryByText('Search')?.click());
    expect(getPhotos.getPhotosPage).toHaveBeenCalledTimes(2);

    expect(queryByText('2')).not.toBeNull();
    await act(async () => queryByText('2')?.click());
    expect(getPhotos.getPhotosPage).toHaveBeenCalledTimes(3);
  });
});
