import React, { useEffect } from 'react';
import { ModalImage, Overlay } from './Modal.styled';

export const Modal = ({ image, closeModal }) => {
  useEffect(() => {
    const handleKeyPress = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [closeModal]);

  const handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={handleCloseModal}>
      <ModalImage>
        <img src={image.largeImageURL} alt={image.tags} />
      </ModalImage>
    </Overlay>
  );
};
