import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import {version} from '../package.json'
import WebSocketServer, {Server} from 'uws'

const PORT = 3000;
const app = express();
app.server = http.createServer(app);


app.use(morgan('dev'));


app.use(cors({
    exposedHeaders: "*"
}));

app.use(bodyParser.json({
    limit: '50mb'
}));


app.wss = new Server({
    server: app.server
})
let clients = []
app.wss.on('connection', (connection) => {
    const userId = clients.length + 1
    connection.userId = userId
    const newClient = {
        ws: connection,
        userId: userId
    }
    console.log('Yeni client bağlandı userId:', userId)
    connection.on('close', () => {
        console.log('Bağlantı kesildi userId:', userId)
        clients = clients.filter((client) => client.userId !== userId)
    })
    clients.push(newClient)

})
app.get('/api/version', (req, res) => {
    res.json({
        version: version
    })
});
setInterval(() => {
    // 3 saniye sonra tekrarlar
    console.log(`Şuanda ${clients.length} kadar insan bağlandı`);
    clients.forEach((client) => {
        console.log('Bağlı kullanıcı : ', client.userId)
        const msg = `Hey ID: ${client.userId} serverden bir mesajın var`
        client.ws.send(msg)
    })
}, 3000)

app.server.listen(process.env.PORT || PORT, () => {
    console.log(`App is running on port ${app.server.address().port}`);
});
app.get('/api/connection/all', (req, res, next) => {
    return res.json({
        people: clients
    })
})

export default app;
