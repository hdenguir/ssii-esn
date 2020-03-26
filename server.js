const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const routesUsers = require('./routes/api/users');
const routesAuth = require('./routes/api/auth');
const routesProfile = require('./routes/api/profile');
const routesPosts = require('./routes/api/posts');

const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json({ extended: false }));

//app.get("/", (req, res) => res.send("API Runnning"));

// Define Routes
app.use('/api/users', routesUsers);
app.use('/api/auth', routesAuth);
app.use('/api/profile', routesProfile);
app.use('/api/posts', routesPosts);
// app.use('/', (req, res) => {
//   res.status(200).json({ msg: 'API Runnning : Please use /api/*' });
// });

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
