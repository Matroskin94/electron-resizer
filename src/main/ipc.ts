import { IPC_EVENTS } from 'constants/ipcEvents';
import { ipcMain, shell } from 'electron';
import { mainWindowInstance } from 'MainWindow';
import fs from 'node:fs';
import path from 'node:path';
import resizeImg from 'resize-img';

const resizeImage = async ({
  width,
  height,
  imagePath,
  imageDirectory,
  fileName,
}: {
  width: number;
  height: number;
  imagePath: string;
  imageDirectory: string;
  fileName: string;
  string: string;
}) => {
  const resizedImagePath = await resizeImg(fs.readFileSync(imagePath), {
    width: width,
    height: height,
  });
  const resizerFolder = `${imageDirectory}/resizer`;

  if (!fs.existsSync(resizerFolder)) {
    fs.mkdirSync(resizerFolder);
  }
  fs.writeFileSync(path.join(resizerFolder, fileName), resizedImagePath);

  shell.openPath(resizerFolder);

  mainWindowInstance
    .getWindowInstance()
    .webContents.send(IPC_EVENTS.IMAGE_DONE);
};

export const initIpc = () => {
  ipcMain.on(IPC_EVENTS.IMAGE_RESIZE, (_event, options) => {
    resizeImage(options);
  });
};
