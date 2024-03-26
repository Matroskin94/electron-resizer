import { Box, Button, TextField, Typography } from '@mui/material';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import PhotoSizeSelectLargeIcon from '@mui/icons-material/PhotoSizeSelectLarge';
import { ResizeButton } from './components';
import { alertError, alertSuccess } from 'utils/ui';
import { ACCEPTED_FILE_TYPES, DEFAULT_FILE } from './constants';
import { FILE_TYPES } from 'constants/files';
import { ellipsisText } from 'utils/helpers';
import { IPC_EVENTS } from 'constants/ipcEvents';
import { useLatestState } from 'utils/hooks';

export const Resizer: FC = () => {
  const [fileImage, setFileImage, getFileImageState] =
    useLatestState(DEFAULT_FILE);

  const handleFileChange = (file: File) => {
    if (!ACCEPTED_FILE_TYPES.includes(file.type as FILE_TYPES)) {
      alertError('Please select an image');

      return;
    }

    const image = new Image();
    image.src = URL.createObjectURL(file);
    console.log('image', image);
    console.log('path', file.path);
    image.onload = () => {
      setFileImage({
        isLoaded: true,
        name: file.name,
        width: +image.width,
        height: +image.height,
        imageDirectory: window.api.app.modules.path.dirname(file.path),
        imagePath: file.path,
      });
    };
  };

  const handleDimensionChange =
    (axis: 'height' | 'width') => (event: ChangeEvent<HTMLInputElement>) => {
      console.log('value', event.target.value);
      setFileImage((prevFileState) => ({
        ...prevFileState,
        [axis]: +event.target.value,
      }));
    };

  const handleResizeClick = () => {
    if (!fileImage.height || !fileImage.width) {
      alertError('Please set correct dimensions');
    }

    window.api.app.ipcRenderer.send(IPC_EVENTS.IMAGE_RESIZE, {
      imageDirectory: fileImage.imageDirectory,
      imagePath: fileImage.imagePath,
      fileName: fileImage.name,
      width: fileImage.width,
      height: fileImage.height,
    });
  };

  useEffect(() => {
    window.api.app.ipcRenderer.on(IPC_EVENTS.IMAGE_DONE, async () => {
      const fileImageState = await getFileImageState();

      alertSuccess(
        `Image resized to ${fileImageState.width} x ${fileImageState.height}`
      );
    });
  }, []);

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h5" mb={2}>
        Image resizer
      </Typography>
      <Box mb={4}>
        <ResizeButton onFileChange={handleFileChange} />
      </Box>

      {fileImage.isLoaded ? (
        <Box
          width="300px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box mb={1} width="100%">
            <TextField
              value={fileImage.width}
              onChange={handleDimensionChange('width')}
              fullWidth
              label="Width"
              variant="outlined"
            />
          </Box>
          <Box mb={2} width="100%">
            <TextField
              value={fileImage.height}
              onChange={handleDimensionChange('height')}
              fullWidth
              label="Height"
              variant="outlined"
            />
          </Box>
          <Box display="flex" width="150px" mb={2}>
            <Button
              onClick={handleResizeClick}
              fullWidth
              variant="contained"
              endIcon={<PhotoSizeSelectLargeIcon />}
            >
              Resize
            </Button>
          </Box>
          <Box mb={1}>
            <Typography>
              <Typography component="span" fontWeight="bold">
                File:
              </Typography>{' '}
              {ellipsisText(fileImage.name, 15, '.')}
            </Typography>
          </Box>
          <Box>
            <Typography>
              <Typography component="span" fontWeight="bold">
                Output:
              </Typography>
              {fileImage.imageDirectory}
            </Typography>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};
