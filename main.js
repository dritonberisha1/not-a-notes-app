const { app, BrowserWindow } = require('electron')
const UserDataRepository = require('./electron/app/repositories/user-data-repository');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

const userDataRepository = new UserDataRepository({
  // We'll call our data file 'user-preferences'
  configName: 'user-preferences',
  defaults: {
    // 800x600 is the default size of our window
    windowBounds: { width: 800, height: 600 }
  }
});

function createWindow() {

  let { width, height } = userDataRepository.get('windowBounds');
  // Create the browser window.
  win = new BrowserWindow({
    width,
    height,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.on('resize', () => {
    // The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
    // the height, width, and x and y coordinates.
    let { width, height } = win.getBounds();
    // Now that we have them, save them using the `set` method.
    userDataRepository.set('windowBounds', { width, height });
  });

  // and load the index.html of the app.
  win.loadFile('./electron/index.html');

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})