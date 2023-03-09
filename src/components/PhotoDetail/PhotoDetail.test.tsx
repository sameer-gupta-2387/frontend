import React from 'react';
import { render } from '@testing-library/react';
import PhotoDetail from './PhotoDetail';

describe('PhotoDetail', () => {
  test('renders photo detail page', () => {
    const closeModal = jest.fn();
    const { queryByTestId } = render(
      <PhotoDetail url="http://test-url.com" closeModal={closeModal} />
    );
    expect(queryByTestId('photo-detail-page')).not.toBeNull();
  });

  test('photo detail page is not displayed when url is empty', () => {
    const closeModal = jest.fn();
    const { queryByTestId } = render(
      <PhotoDetail url="" closeModal={closeModal} />
    );
    expect(queryByTestId('photo-detail-page')).toBeNull();
  });

  test('modal is closed on clicking close button', () => {
    const closeModal = jest.fn();
    const { queryByRole } = render(
      <PhotoDetail url="http://test-url.com" closeModal={closeModal} />
    );
    expect(queryByRole('button')).not.toBeNull();
    queryByRole('button')?.click();
    expect(closeModal).toHaveBeenCalled();
  });
});
