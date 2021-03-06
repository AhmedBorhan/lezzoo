const http = require('http');
const express = require('express');
const passport = require('passport');
const cors = require('cors');

// router index
const router = require('./server/routes/router');

const app = express();
const server = http.createServer(app);
// Middlewares
app.use(cors());
app.use(router);
app.use(passport.initialize());
// parse requests of content-type - application/json
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// enable dotnev in order to use the env variables
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

// routes
require('./server/config/passport')(passport);
require('./server/routes/file.routes')(app);
require('./server/routes/admin.routes')(app);
require('./server/routes/store.routes')(app);
require('./server/routes/category.routes')(app);
require('./server/routes/item.routes')(app);

app.use(express.static(('client/build')));

app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});


const serverPort = process.env.PORT || 5003
server.listen(serverPort, () => console.log(`Server has started on port: ${serverPort}`));

// TODO add cache to the queries 
// TODO reduce image sizes on uploading
