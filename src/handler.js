var handlers = module.exports = {};

const path = require('path');
const fs = require('fs');

//GET: main rout '/, /main' handler
handlers.mainHandler = (req,res)=>{
  if(req.method == "GET" ){
    fs.readFile(path.join(__dirname,'..', 'public/index.html'), 'utf8', (err,file) =>{
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        return res.end('Server ERROR');
      }  
      res.writeHead(200, {'Content-Type' : 'text/html'});
      res.end(file)
    });
  }else{
    _forbidden(req,res)
  }
}

//GET: all public files handler
handlers.publicHandler = (req,res)=>{
  if(req.method == "GET" ){
    const url = req.url;
    const ext =path.extname(url)

    const extensions ={
      '.css':'text/css',
      '.js':'text/javascript',
      '.ico':'image/vnd.microsoft.icon',
      '.png':'image/png',
      '.jpeg':'image/jpeg',
      '.jpg':'image/jpeg',
    }

    fs.readFile(path.join(__dirname,'..', 'public', url), 'utf8', (err,file) =>{
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        return res.end('Server ERROR');
      }
      res.writeHead(200, {'Content-Type': extensions[ext] })
      res.end(file)
    });
  }else{
    _forbidden(req,res)
  }
}

// POST: getList rout '/getList' handler
handlers.getListHandler = (req,res) => {
  if(req.method == "POST" ){
    let allData = '';
    // collect all data shanks
    req.on('data', (chunkData) =>{
      allData += chunkData;
    });
    // when the data get is done
    req.on('end', () => {
      const convertedData =JSON.parse(allData);
      // console.log({convertedData});
      fs.readFile(path.join(__dirname,'data.json'), 'utf8', (err,file) =>{
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/plain'});
          return res.end('Server ERROR');
        }  
        res.writeHead(200,{'Content-Type': 'application/json'})

        const inputVal = convertedData.inputVal.trim()
        const dataArray = _filterInputResult (inputVal, JSON.parse(file))
        res.end(JSON.stringify(dataArray.slice(0,7)))
      })
    }) 
  }else{
    _forbidden(req,res)
  }
}

handlers.getResultHandler =(req, res)=>{
  if(req.method == "POST"){
    let allData =""
    // collect all data shanks
    req.on('data', (chunkData) =>{
      allData += chunkData;
    });
    // when the data get is done
    req.on('end', () => {
      const convertedData =JSON.parse(allData);
      console.log(convertedData);
      const inputVal = convertedData.inputVal.trim()
      // console.log(inputVal);
      res.writeHead(200,{'Content-Type': 'application/json'})
      res.end(JSON.stringify({Result:`The word is ${inputVal}`}))
    })
  }
}

handlers.notFound = (req,res) => {
    res.writeHead(404,{'Content-Type': 'text/html'});
    res.end("<a href='/'>home</a><h1>404 Page Not Found</h1>");
}

const _forbidden = (req,res) =>{
  res.writeHead(403,{'Content-Type': 'application/json'});
  res.end(JSON.stringify({Error_Message:"forbidden"}));
}

const _filterInputResult = (inputVal, dataArray)=>{ 
  if(!inputVal) return []
  return dataArray.filter((item)=>item.toLowerCase().includes(inputVal.toLowerCase()))
}

// module.exports = {
//     mainHandler,
//     publicHandler,
//     getListHandler
// } 
