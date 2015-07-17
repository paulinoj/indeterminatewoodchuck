var AppDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';
var SOCKET_LISTENER = 'SOCKET_LISTENER';

var _connections = {
  // should we require socket and icecomm with Browserify?
  socket: io(),
  comm: new Icecomm('ZZ2RA1DsHd9xdCqdoeJ8Wwra5A5fUKipAVrvzX6vOGHlLiAdO', { debug: true })
};

var _room = '';

var startSocketListener = function(){
  _connections.socket.on('staffRoom', function(msg) {
    console.log('Staff connecting to room with name: ', msg);
    _room = msg;
  });
};

var appStore = objectAssign({}, EventEmitter.prototype, {
  getRoom: function() {
    return _room;
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  if (action.actionType === appConstants.START_SOCKET_LISTENER) {
    startSocketListener();
    appStore.emit(SOCKET_LISTENER);
  } else {
    return true;
  }
});

module.exports = appStore;
