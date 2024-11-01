import { app, Tray, Menu, nativeImage, shell } from 'electron'
import icon from '../../../resources/icon.png?asset'

export default class TrayService {
  private tray
  constructor() {
    this.tray = new Tray(this.createNativeImage())
    this.createMenu()
  }

  createNativeImage(): Electron.NativeImage {
    const image = nativeImage.createFromPath(icon)
    image.setTemplateImage(true)
    return image
  }

  createMenu(): void {
    const contextMenu: Electron.Menu = Menu.buildFromTemplate([
      {
        label: 'Stop Timer',
        type: 'normal',
        click: (): void => {
          // TODO: Need to update this part
          // stopTracking()
          console.log(`You have clicked Stop Timer`)
        }
      },
      {
        label: 'Open Timez',
        type: 'normal',
        click: (): void => {
          //   mainWindow.restore()
        }
      },
      { type: 'separator' },
      {
        label: 'Recent Projects',
        type: 'normal',
        enabled: false
      },
      { type: 'separator' },
      {
        label: `Signed in as ${'sample_name'}`,
        type: 'normal',
        enabled: false
      },
      {
        label: `${'sample_email'}`,
        type: 'normal',
        enabled: false
      },
      {
        label: 'Sign Out',
        type: 'normal'
        // click: () => mainWindow.webContents.send('auth', { logout: true })
      },
      { type: 'separator' },

      {
        label: 'Open Dashboard',
        type: 'normal',
        click: (): void => {
          shell.openExternal('https://pro.webandcrafts.com/tracker/timesheet/tasks')
        }
      },
      {
        label: 'Quit Timez',
        type: 'normal',
        click: () => app.quit()
      }
    ])

    this.tray.setToolTip('This is my application.')
    this.tray.setContextMenu(contextMenu)
  }
}
