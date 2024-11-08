
// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');

// Create the Electron window
function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadURL('http://localhost:3000/#/setup'); // Load Setup Wizard on startup
}

// Start backend server
function startBackend() {
  console.log('Starting backend server...');
  exec('node backend/index.js', (err, stdout, stderr) => {
    if (err) {
      console.error('Error starting backend:', err);
      return;
    }
    console.log(stdout);
  });
}

// Start IPFS daemon
function startIPFS() {
  console.log('Starting IPFS daemon...');
  exec('ipfs daemon', (err, stdout, stderr) => {
    if (err) {
      console.error('Error starting IPFS:', err);
      return;
    }
    console.log(stdout);
  });
}

// Electron app lifecycle events
app.whenReady().then(() => {
  startIPFS(); // Initialize IPFS
  startBackend(); // Launch backend server
  createWindow(); // Launch Setup Wizard
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
