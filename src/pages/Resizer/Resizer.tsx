import { Box, Button, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import PhotoSizeSelectLargeIcon from '@mui/icons-material/PhotoSizeSelectLarge';
import { ResizeButton } from './components';
import { alertError } from 'utils/ui';

export const Resizer: FC = () => {
  const handleFileChange = (file: File) => {
    console.log('Uploading file', file);
  };

  const handleResizeClick = () => {
    alertError('Please select an image');
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h5" mb={2}>
        Image resizer
      </Typography>
      <Box mb={4}>
        <ResizeButton onFileChange={handleFileChange} />
      </Box>

      <Box
        width="300px"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box mb={1} width="100%">
          <TextField fullWidth label="Width" variant="outlined" />
        </Box>
        <Box mb={2} width="100%">
          <TextField fullWidth label="Height" variant="outlined" />
        </Box>
        <Box display="flex" width="150px">
          <Button
            onClick={handleResizeClick}
            fullWidth
            variant="contained"
            endIcon={<PhotoSizeSelectLargeIcon />}
          >
            Resize
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
