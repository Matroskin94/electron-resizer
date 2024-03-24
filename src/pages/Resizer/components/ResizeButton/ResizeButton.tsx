import { DragEventHandler, FC, useRef } from 'react';
import { Logo } from '@assets/icons/app/Logo';
import { ButtonContainer } from './ResizeButton.styles';
import { Box, Typography } from '@mui/material';
import { UploadFileInput } from 'components';
import { IMAGE_FORMATS } from './constants';

interface IResizeButtonProps {
  onFileChange: (file: File) => void;
}

export const ResizeButton: FC<IResizeButtonProps> = ({ onFileChange }) => {
  const innerFileInputRef = useRef<HTMLInputElement>(null);
  const fileInputWrapperRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (files: File[]) => {
    if (files.length) {
      onFileChange(files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputWrapperRef.current?.click();
  };

  const handleFileDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const uploadingFiles = Array.from(e.dataTransfer.files);

    onFileChange(uploadingFiles[0]);
  };

  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const acceptFormats = IMAGE_FORMATS.map((format) => `.${format}`).join(', ');

  return (
    <ButtonContainer
      elevation={3}
      onClick={handleUploadClick}
      onDrop={handleFileDrop}
      onDragOver={handleDragOver}
    >
      <Box display="flex" mb={1}>
        <Logo width={32} height={32} />
      </Box>
      <Typography variant="button">Select an image to resize</Typography>
      <UploadFileInput
        name="resize-button"
        onChange={handleFileChange}
        acceptType={acceptFormats}
        ref={innerFileInputRef}
      >
        <div ref={fileInputWrapperRef}></div>
      </UploadFileInput>
    </ButtonContainer>
  );
};
