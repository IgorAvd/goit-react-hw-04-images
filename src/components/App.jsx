import React, { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImg } from 'utils/getImages';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (page !== 1 || searchText !== '') {
      setLoading(true);
      fetchImg(page, searchText)
        .then(resp => {
          setImages(prev => [...prev, ...resp.hits]);
          setLoading(false);
          setTotalHits(resp.totalHits);
        })
        .catch(error => {
          console.log('error', error);
          setLoading(false);
        });
    }
  }, [page, searchText]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setLoading(true);
  };

  const onSubmit = newSearchText => {
    if (searchText !== newSearchText) {
      setSearchText(newSearchText);
      setImages([]);
      setPage(1);
    }
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery
        searchText={searchText}
        images={images}
        loading={loading}
        onClick={handleLoadMore}
        totalHits={totalHits}
        page={page}
      />
    </>
  );
};
