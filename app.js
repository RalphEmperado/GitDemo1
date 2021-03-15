const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url);

    res.setHeader('Content-Type', 'text/html');
    let urll = './PA-2/';

    if(req.url == '/'){
        urll += 'index.html';
        res.statusCode == 200;
    }else if(req.url == '/about'){
        urll += 'about.html';
        res.statusCode == 200;
    } else if(req.url == '/contact'){
        urll += 'contact.html';
        res.statusCode == 200;
    } else {
        urll += 'error.html';
        res.statusCode == 404;
    }

    fs.readFile(urll, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.end(data);
        }
    });
});

server.listen(8080, 'localhost', () => {
    console.log('listening');
});