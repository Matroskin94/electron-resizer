import { FILE_TYPES } from 'constants/files';
import { IUploadedFile } from './types';

export const ACCEPTED_FILE_TYPES = [
  FILE_TYPES.JPEG,
  FILE_TYPES.JPG,
  FILE_TYPES.PNG,
];

export const DEFAULT_FILE: IUploadedFile = {
  isLoaded: false,
  width: 0,
  height: 0,
  name: '',
  imageDirectory: '',
  imagePath: ''
}