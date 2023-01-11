const http = require('http');

const server = http.createServer((req, res) => {
  const { url } = req;
  res.setHeader('Content-type', 'text/html');
  if (url === '/') {
    res.write('<head><title>Home</title></head>');
    res.write(`
      <body>
        <a href="/">Home</a>
        <a href="/users">Users</a>
        <a href="/create-user">Create user</a>
        <h1>This is the Homepage</h1>
      </body>
    `);
    return res.end();
  }

  if (url === '/users') {
    res.write(`
      <body>
        <a href="/">Home</a>
        <a href="/users">Users</a>
        <a href="/create-user">Create user</a>
        <ul>
          <li>User 1</li>
        </ul>
      </body>
    `);
    return res.end();
  }

  if (url === '/create-user' && req.method.toLocaleLowerCase() === 'post') {
    const data = [];
    req.on('data', chunk => data.push(chunk));
    return req.on('end', () => {
      const user = Buffer.concat(data).toString().split('=')[1];
      res.statusCode = 302
      res.setHeader('Location', '/users');
      res.end();
      console.log(user);
    });
  }

  if (url === '/create-user') {
    res.write(`
      <body>
        <a href="/">Home</a>
        <a href="/users">Users</a>
        <a href="/create-user">Create user</a>
        <form action="/create-user" method="post">
          <input type="text" name="name" placeholder="Name" />
          <button type="submit">Send</button>
        </form>
      </body>
    `);
    return res.end();
  }
});

server.listen(3000);
