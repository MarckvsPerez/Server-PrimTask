import FTP from 'ftp'
import { processXmlBuffer } from './processXmlBuffer'
import { socket } from './socket'

const client = new FTP()

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
  host: 'vc171.entorno.es',
  port: 21,
  user: 'farmaconnect-elsaler-externo',
  password: '9B2fF_ot6sjkmNb0s'
})

socket.on('connect', () => {
  console.log('Socket IO Connnected')
})

socket.on('disconnect', () => {
  console.log('Socket IO Disconnnected')
})

socket.on('setPrimProducts', ({ data }) => {
  console.log('setPrimProducts', data)
})

socket.on('getPrimProducts', ({ mac }) => {
  console.log('getPrimProducts', mac)
  socket.emit('setPrimProducts', { data: 'patata.dos', mac })
})
