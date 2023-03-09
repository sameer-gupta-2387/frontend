import React, { FC } from 'react';
import { Modal, Image } from 'antd';
import './PhotoDetail.css';

type PhotoDetailProps = {
  url?: string;
  closeModal: () => void;
};

const PhotoDetail: FC<PhotoDetailProps> = ({ url, closeModal }) => (
  <Modal
    open={!!url}
    title="Photo Preview"
    onCancel={closeModal}
    footer={null}
    data-testid="photo-detail-page"
    className="Photo-modal"
  >
    <Image src={`${url}`} className="Photo-modal-image" />
  </Modal>
);
export default PhotoDetail;
