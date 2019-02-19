const express = require('express');
const bodyParser = require("body-parser");
const passport = require('passport');
const cors = require('cors');

const app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml'); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

require('./auth/auth');
const routes = require('./routes/routes');
const secureRoutes = require('./routes/secure-routes');

app.use('/', routes);
app.use('/user', passport.authenticate('jwt', { session : false }), secureRoutes );

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error : err });
});

const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));