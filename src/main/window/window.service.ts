import { BrowserWindow, Menu, shell } from 'electron'
import icon from '../../../resources/icon.png?asset'

import { join } from 'path'
import { menu } from '../menu/app_menu.service'
import { is } from '@electron-toolkit/utils'

export default class WindowManager {
  createWindow(): void {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 1084,
      height: 640,
      minWidth: 1084,
      minHeight: 640,
      show: false,
      // autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })
    Menu.setApplicationMenu(menu)

    mainWindow.on('ready-to-show', () => {
      mainWindow.show()
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
  }
}
