import io from 'socket.io-client'

const server = 'https://cloud.farmaconnect.es'

const extraHeaders = {
  type: 'etouch'
}

const query = {
  name: 'eTouch',
  resolution: '1920x1080',
  mac: 'prim.task'
}

const setting = {
  forceNew: false,
  transportOptions: { polling: { extraHeaders } },
  query
}

export const socket = io(server, setting)
