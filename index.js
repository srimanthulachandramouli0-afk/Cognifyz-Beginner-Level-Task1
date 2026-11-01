const express = require('express');
const ejs = require('ejs');
const app = express();

// Step 3 kosam - form data read cheyadaniki
app.use(express.urlencoded({ extended: true }));
let userData = null;

// Step 1 & 4 kosam - HTML + EJS template
const formPage = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cognifyz Level 1 Task 1</title>
<style>
body{font-family:Arial;background:#f8c6c8;display:flex;justify-content:center;padding:20px}
.box{background:white;padding:20px;border-radius:12px;width:100%;max-width:380px;box-shadow:0 4px 10px rgba(0,0,0,0.1)}
input,button{width:100%;padding:12px;margin-top:10px;border-radius:8px;border:1px solid #ccc;box-sizing:border-box}
button{background:black;color:white;font-weight:bold}
.result{background:#eaffea;padding:10px;border-radius:8px;margin-top:15px}
</style>
</head>
<body>
<div class="box">
<h2>Task 1: HTML + Server</h2>
<form action="/submit" method="POST">
<input type="text" name="name" placeholder="Enter Name" required>
<input type="email" name="email" placeholder="Enter Email" required>
<button type="submit">Submit</button>
</form>
<% if (userData) { %>
<div class="result">
<h3>Server Rendered (EJS):</h3>
<p><b>Name:</b> <%= userData.name %></p>
<p><b>Email:</b> <%= userData.email %></p>
<p><b>Time:</b> <%= userData.time %></p>
</div>
<% } %>
</div>
</body>
</html>
`;

app.get('/', (req, res) => {
  res.send(ejs.render(formPage, { userData }));
});

app.post('/submit', (req, res) => {
  userData = {
    name: req.body.name,
    email: req.body.email,
    time: new Date().toLocaleString()
  };
  console.log(userData);
  res.redirect('/');
});

app.listen(3000, () => console.log('Server running on port 3000'));