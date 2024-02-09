import FTP from 'ftp'
import * as dotenv from 'dotenv'
import { processXmlBuffer } from './processXmlBuffer'
import { socket } from './socket'

const client = new FTP()
dotenv.config()

client.on('ready', () => {
  console.log('Client FTP ready')

  const bufferChunks: Buffer[] = []

  client.get('inventario_productos.xml', (err, stream) => {
    if (err != null) {
      console.error('Error downloading file:', err)
      client.end()
      return
    }

    stream.on('data', (chunk) => {
      if (chunk instanceof Buffer) {
        bufferChunks.push(chunk)
      }
    })

    stream.on('end', () => {
      const xmlBuffer = Buffer.concat(bufferChunks)
      console.log('File download complete')

      processXmlBuffer(xmlBuffer)

      client.end()
    })

    stream.on('error', (err) => {
      console.error('Error downloading file:', err)
      client.end()
    })
  })
})

client.connect({
  host: process.env.Env_host,
  port: parseInt(process.env.Env_port ?? '0', 10),
  user: process.env.Env_user,
  password: process.env.Env_password
})

socket.on('connect', () => {
  console.log('Socket IO Connnected')
})

socket.on('disconnect', () => {
  console.log('Socket IO Disconnnected')
})

socket.on('setPrimProducts', ({ data }) => {
  const catalogues = {
    id: 'PRIM_ORTOPEDIA',
    ref: 'PRIM_ORTOPEDIA',
    description: 'Ortopedia Prim',
    name: 'Ortopedia Prim',
    date: new Date().getTime(),
    articles: []
  }
  console.log('setPrimProducts', data, catalogues)
})

socket.on('getPrimProducts', ({ mac }) => {
  console.log('getPrimProducts', mac)
  socket.emit('setPrimProducts', { data: 'patata.dos', mac })
})
