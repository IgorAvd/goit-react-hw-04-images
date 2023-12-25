import React, { useState } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export const ImageGallery = ({ images, loading, onClick, totalHits, page }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModalWithImage = id => {
    const selectedImage = images.find(image => image.id === id);

    if (selectedImage) {
      setSelectedImage(selectedImage);
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const checkPage = page < Math.ceil(totalHits / 12);

  return (
    <div>
      <GalleryList>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            id={image.id}
            tags={image.tags}
            webformatURL={image.webformatURL}
            largeImageURL={image.largeImageURL}
            onClick={openModalWithImage}
          />
        ))}
      </GalleryList>
      {loading && <Loader />}
      {selectedImage && <Modal image={selectedImage} closeModal={closeModal} />}
      {!loading && images.length > 0 && checkPage && (
        <Button onClick={onClick} />
      )}
    </div>
  );
};
