const { reset } = require("nodemon");
const path = require('path');
const fs = require('fs');

const router = (req, res) => {
    const url = req.url;
    const ext = path.extname(url);
    const extentions ={
        '.css' :'text/css',
        '.js' : 'text/javascript'
    };
    if(url === '/' || url === '/main'){
        res.writeHead(200, {"Content-Type" : 'text/html'});
        res.end();
    } else if(ext){
        fs.readFile(path.join(__dirname,'..', 'public', url), 'utf8', (err,file) =>{
            if (err) {
                res.writeHead(500, {"Content-Type": 'text/plain'});
                return res.end('Server ERROR');
            }
            res.writeHead(200, {"Content-Type": extentions[ext] })
            res.end(file)
        });

    }
    else{
        res.writeHead(404,"Page Not Found" ,{"Content-Type": 'text/html'});
        res.end();
    }
};


module.exports = { 
    router
};