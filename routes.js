const fs = require('fs');

function routes(req, res) {
  const { url } = req;

  if (url === '/test') {
    res.setHeader('Content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="name" /><input type="text" name="age" /><button type="submit">submit</button></form></body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/message') {
    const body = [];

    req.on('data', (chunk) => body.push(chunk));
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      fs.writeFileSync('message.txt', parsedBody);
    });

    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }

  res.write('<html>');
  res.write('<head><title>My first page</title></head>');
  res.write('<body><h1>My first app</h1></body>');
  res.write('</html>');
  res.end();
};

module.exports = routes;
