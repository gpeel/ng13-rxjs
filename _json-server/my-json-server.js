const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./_json-server/db.json', null);
const middlewares = jsonServer.defaults(null);

server.use(middlewares);

// server.get('/orderStatuses', (req, res, next) => {
//     setTimeout(() => {
//         next();
//     }, 1500);
// });

server.get('/orderStatuses', (req, res, next) => {
    // console.log('req', req.params);
    // foro http://localhost:3300/orderStatuses?filter=rr
    // console.log('req.query:', req.query);
    // you get req.query: { filter: 'rr' }
    const filter = req.query.filter;


    // node_modules/@types/express-serve-static-core/index.d.ts <= Request interface

    setTimeout(() => {

        var oldSend = res.send;

        // res.send = function (data) {
        //     // arguments[0] (or `data`) contains the response body
        //     // console.log('DATA', data);
        //     // console.log('PROTO', Array.prototype);
        //     // console.log('PROTO', [].__proto__);
        //     // arguments[0] = "modified : " + arguments[0];
        //     // [].prototype.splice.apply(data, 0, 1);
        //     // const dd = JSON.parse(data);
        //     // const dd = JSON.stringify(data);
        //     // console.log(dd);
        //     oldSend.apply(res, data);
        // };

        res.send = function (data) {
            // arguments[0] (or `data`) contains the response body
            const dd = JSON.parse(data);
            // const dd = JSON.stringify(data);
            console.log('dd', dd);
            dd.splice(0, 1);
            console.log('dd', dd);
            // console.log('splice', Array.prototype.splice);
            arguments[0] = JSON.stringify(dd);
            // data = JSON.stringify(dd);
            oldSend.apply(res, arguments);
        };
        next();
        // console.log('RESPONSE', res.json());
        console.log('RESPONSE locals', res.locals);
        // console.log('RESPONSE body', res.body);
        console.log('RESPONSE send', res.send);
        // console.log('RESPONSE data', res.data);
        // console.log('RESPONSE locals.data', res.locals.data);
    }, 1500);
});

server.get('*', (req, res, next) => {
    setTimeout(() => {
        next();
    }, 500);
});


server.use(router);
const port = process.env.PORT || 3300;
server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});
