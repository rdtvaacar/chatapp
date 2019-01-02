const WebSocket = require('uws')
const ws = new WebSocket('ws://localhost:3000');

ws.on('open', () => {
    console.log('Bağlantı başarılı')
    ws.send('Bağlandık')

    // serverdan gelen mesajları dinler
    ws.on('message', (message) => {
        console.log('Server çağrınıza cavap verdi: ', message)
    })
})