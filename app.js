
const http = require('http');

const server = http.createServer((req, res)=>{
    console.log(req.url, req.method, req.headers)
})


server.listen(3000, 'localhost', ()=>{
    console.log('listening from i love you 3000')
})