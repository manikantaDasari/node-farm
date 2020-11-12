const fs = require('fs');
const http = require('http');
const URL = require('url');
const replaceTemplate = require('./modules/replaceTemp');

////////////////////////
// Read Files

const tempOverView = fs.readFileSync(
  `${__dirname}/templates/temp-overview.html`,
  'utf-8'
);

const tempProduct = fs.readFileSync(
  `${__dirname}/templates/temp-product.html`,
  'utf-8'
);

const tempCard = fs.readFileSync(
  `${__dirname}/templates/temp-card.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

////////////////////////
// SERVER
const server = http.createServer((req, res) => {
  const { query, pathname } = URL.parse(req.url, true);

  if (pathname === '/' || pathname === '/homepage') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const cardHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join();

    const homePage = tempOverView.replace(/{%CARDS%}/g, cardHtml);
    res.end(homePage);
  }

  if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }

  if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);
  }

  res.end('Page Not Found');
});

server.listen(8000, '127.0.0.1', () => {
  console.log("I'm lisiting ....");
});
