// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge } = require('electron');
import { app } from './api';

export const API = {
  app,
};

contextBridge.exposeInMainWorld('api', API);
