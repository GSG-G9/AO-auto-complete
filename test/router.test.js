const {router} = require('../src/router');
const supertest = require('supertest');

const endpoints = [
    {url: ['/', '/main'], statuscode: 200, header: {"content-Type" : /html/}},
    {url: ['/invalid'], statuscode: 404, header:{ "content-Type" : /html/}},
    {url:['/getList'], statuscode: 200, header: { "content-Type": /json/}},
    {url: ['/getResult'], statuscode: 200, header: {"content-Type": /json/}},
    {url: ['/js/main.js', '/css/style.css', 'js/functions.js'], statuscode: 200} 
];
test('teting the main "/" router', (done) => {
   supertest(router)
    .get('/')
    .expect(200)
    .expect("Content-Type", /html/)
    .end((err, res) => {
        if(err) return done(err);
        done();
    });
});
test('teting the main "/main" router', (done) => {
    supertest(router)
     .get('/main')
     .expect(200)
     .expect("Content-Type", /html/)
     .end((err, res) => {
         if(err) return done(err);
         done();
     });
 });

 test('testing invalid endpoints', (done) => {
     supertest(router)
        .get('/hellooo')
        .expect(404)
        .expect("Content-Type" , /html/)
        .end((err, res) => {
            if(err) return err;
            done();
        });
 });

 test('testing get result endpoint', (done) => {
    supertest(router)
       .post('/getList')
       .expect(200)
       .expect("Content-Type" , /html/)
    //    .set()
       .end((err, res) => {
           if(err) return err;
           done();
       });
});


test('testing final search result endpoint', (done) => {
    supertest(router)
       .post('/getResult')
       .expect(200)
       .expect("Content-Type" , /html/)
    //    .set()
       .end((err, res) => {
           if(err) return err;
           done();
       });
});


test('testing css ', (done) => {
    supertest(router)
       .get('/css/style')
       .expect(200)
       .expect("Content-Type" , /css/)
       .end((err, res) => {
           if(err) return err;
           done();
       });
});


test('testing functions ', (done) => {
    supertest(router)
       .get('/js/functions')
       .expect(200)
       .expect("Content-Type" , /javascript/)
       .end((err, res) => {
           if(err) return err;
           done();
       });
});
