import { BrowserWindow } from 'electron';
import path from 'node:path';

export class MainWindow {
  private windowInstance: BrowserWindow | null;
  private isDev: boolean;
  constructor() {
    this.windowInstance = null;
    this.isDev = process.env.NODE_ENV !== 'production';
  }

  public initMainWindow() {
    this.windowInstance = new BrowserWindow({
      width: 500,
      height: this.isDev ? 1200 : 600,
      icon: `${__dirname}/assets/icons/Icon_256x256.png`,
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js'),
      },
    });

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      this.windowInstance.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
      this.windowInstance.loadFile(
        path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
      );
    }

    // Open the DevTools.
    if (this.isDev) {
      this.windowInstance.webContents.openDevTools();
    }

    this.windowInstance.on('close', () => (this.windowInstance = null));
  }

  public getWindowInstance() {
    if (!this.windowInstance) {
      throw new Error('Browser window not initiated');
    }

    return this.windowInstance;
  }

  public destroyInstance() {
    this.windowInstance = null;
  }
}

export const mainWindowInstance = new MainWindow();
