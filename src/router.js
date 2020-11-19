const path = require('path');
const handlers = require('./handler')


const routes = {
  '/'   : handlers.mainHandler,
  '/main'   : handlers.mainHandler,
  '/getList': handlers.getListHandler,
  // '/getResult': handlers.mainHandler,
  '404' : handlers.notFound,
}

// router function
const router = (req, res) => {
 
  const url = req.url;
  const ext = path.extname(url); 

  if(ext) routes[url] = handlers.publicHandler 

  if (routes[url]) {
    routes[url](req, res);
  } else {
    routes[404](req, res);
  }	

};

module.exports = { 
    router
};