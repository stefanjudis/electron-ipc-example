var app           = require( 'app' );  // Module to control application life.
var BrowserWindow = require( 'browser-window' );  // Module to create native browser window.
var ipc           = require( 'ipc' );

// Report crashes to our server.
require( 'crash-reporter' ).start();

var mainWindow = null;

// Quit when all windows are closed.
app.on( 'window-all-closed', function() {
  if ( process.platform != 'darwin' ) {
    app.quit();
  }
} );

app.on( 'ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow( { width : 800, height : 600 } );

  mainWindow.loadUrl( 'file://' + __dirname + '/index.html' );

  mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on( 'closed', function() {
    mainWindow = null;
  } );

  ipc.on( 'meetup', function( event, arg ) {
    console.log( 'received async msg' );

    event.sender.send( 'meetup-reply', 'Got async msg!' );
  } );
} );
