const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

const UserRoute = require('./src/routes/user-route');

app.get('/', (req, res) => {
  res.send('Welcome to Goodera Hackthon !!!')
})

app.post('/user/create', new UserRoute().createUser);
app.post('/user/verify', new UserRoute().verifyUser);
app.post('/user/login', new UserRoute().loginUser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})