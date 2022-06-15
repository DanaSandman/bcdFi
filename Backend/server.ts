import  express, { Request, Response, }  from 'express';
const  { transferToken }  = require('./api/token/token.controller')
const cors = require('cors')
const path = require('path');
const app = express()
const http = require('http').createServer(app)

//Express App Config
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    //Route production- public to server
        app.use(express.static('public'))
    } else {
    //Route Development- domain 8080 to server    
        const corsOptions = {
            origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000', 'http://localhost:3030', 'http://localhost:3001'],
            credentials: true
        }
        app.use(cors(corsOptions))
}

app.post('/api/token', transferToken)

//If no routes get the HTML from public
app.get('/**', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 3030;
http.listen(port, () => {
    console.log('Server is running on port: ' + port);
})
console.log(`I am Here! in ${port}`)