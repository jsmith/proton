'use strict'

import { app, BrowserWindow, Menu, shell, dialog } from 'electron'
import { DEVELOPMENT } from '../_'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== DEVELOPMENT) {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === DEVELOPMENT ? `http://localhost:9080` : `file://${__dirname}/index.html`

const createWindow = () => {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  setMainMenu()
}

const setMainMenu = () => {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click () {
            console.log('Saving')
          }
        },
        {
          label: 'Add Folder to Project',
          click () {
            console.log('Adding project!')
            const folder = dialog.showOpenDialog({properties: ['openDirectory']}) // We only ever get one folder
            mainWindow.webContents.send('folder', folder)
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {role: 'delete'},
        {role: 'selectall'}
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click () { shell.openExternal('https://github.com/jsmith/proton') }
        }
      ]
    }
  ]
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

require('electron-context-menu')({
  labels: {
    cut: 'Configured Cut',
    copy: 'Configured Copy',
    paste: 'Configured Paste',
    save: 'Configured Save Image',
    copyLink: 'Configured Copy Link',
    copyImageAddress: 'Configured Copy Image Address',
    inspect: 'Configured Inspect'
  }
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
