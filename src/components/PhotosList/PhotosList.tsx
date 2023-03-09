import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Avatar, Pagination, Table, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Photo, PhotosPage } from '../../interfaces/photos';
import { getPhotosPage } from '../../apis/getPhotos';
import PhotoDetail from '../PhotoDetail/PhotoDetail';
import './PhotosList.css';

const { Search } = Input;
const pageSize = 4;

const PhotosList = () => {
  const initiated = useRef<boolean>(false);
  const [data, setData] = useState<PhotosPage>();
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(1);
  const [searchString, setSearchString] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState<string>();

  const columns: ColumnsType<Photo> = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (_, record) => (
          <span
            role="button"
            tabIndex={-1}
            onKeyUp={({ key }) => {
              if (key === 'Enter') {
                setPhotoUrl(`${record.url}`);
              }
            }}
            onClick={() => setPhotoUrl(`${record.url}`)}
          >
            {record.id}
          </span>
        ),
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Thumbnail',
        dataIndex: 'thumbnailUrl',
        key: 'thumbnailUrl',
        render: (_, record) => (
          <Avatar
            src={`${record.thumbnailUrl}`}
            shape="square"
            onClick={() => setPhotoUrl(`${record.url}`)}
            data-testid={`thumbnail-${record.id}`}
          />
        ),
      },
    ],
    []
  );

  const search = useCallback(async (pSearchString: string, pPageNo: number) => {
    setLoading(true);
    setData(await getPhotosPage(pSearchString, pPageNo, pageSize));
    setPageNo(pPageNo);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!initiated.current) {
      search(searchString, pageNo);
      initiated.current = true;
    }
  }, [search, searchString, pageNo]);

  return (
    <div className="Photolist" data-testid="photo-list-page">
      <Search
        placeholder="Search keywords on title"
        enterButton="Search"
        size="large"
        onSearch={() => {
          search(searchString, 1);
        }}
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        disabled={loading}
        className="Searchbar"
      />
      <Table
        columns={columns}
        dataSource={data?.data}
        pagination={false}
        rowKey="id"
        className="Table"
      />
      <Pagination
        current={pageNo}
        onChange={(pPageNo: number) => {
          search(searchString, pPageNo);
        }}
        pageSize={pageSize}
        total={(data?.links?.last.page || 1) * pageSize}
        showSizeChanger={false}
        disabled={loading}
        className="Pagination"
      />
      <PhotoDetail url={photoUrl} closeModal={() => setPhotoUrl(undefined)} />
    </div>
  );
};

export default PhotosList;
