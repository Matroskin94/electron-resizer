import os from 'node:os';
import path from 'node:path';
import Toastify from 'toastify-js';
import { ipcRenderer, IpcRendererEvent } from 'electron';

export const app = {
  Toastify: {
    showToast: (options: Toastify.Options) => Toastify(options).showToast(),
  },
  // os
  modules: {
    os: {
      homedir: () => os.homedir(),
    },
    path: {
      dirname: (filePath: string) => path.dirname(filePath),
    },
  },
  ipcRenderer: {
    send: (channel: string, ...args: any[]) =>
      ipcRenderer.send(channel, ...args),
    on: (
      channel: string,
      listener: (event: IpcRendererEvent, ...args: any[]) => void
    ) => ipcRenderer.on(channel, (event, ...args) => listener(event, ...args)),
  },
};
