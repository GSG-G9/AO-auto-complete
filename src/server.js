const http = require('http');

const server = http.createServer();


const host = process.env.HOST || 'localhost' ;
const port = process.env.PORT || 3000 ;
server.listen(port, () => {
    console.log(`Server is running on: http//${host}:${port}`);
});