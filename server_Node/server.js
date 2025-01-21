const express = require('express')
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');


const app = express()
const PORT = 3500;

const server = app.listen(PORT,
    () => {
        console.log(`Server running http://${address.address === '::' ? 'localhost' : address.address}:${address.port}`);
    }
);
const address = server.address();

app.use(cors({
    origin: `http://${address.address === '::' ? 'localhost' : address.address}:${address.port}`, // Your React app's URL
    credentials: true
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

app.use(authRoutes);
