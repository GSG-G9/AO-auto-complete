const http = require("http");
const { router } = require("./router");

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

const  app =(req, res)=> {
  router(req, res);
};

http.createServer(app).listen(port, () => {
  console.log(`Server is running on: http://${host}:${port}`);
});
