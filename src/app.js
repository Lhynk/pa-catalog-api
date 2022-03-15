const express = require('express');
const cors = require('cors');
const { PORT, APP_URI } = require('./config/env')
const logger = require('./utils/logger')
const routers = require('./routes/routes');
const cookieParser = require('cookie-parser')
const app = express();

const allowedOrigins = APP_URI.split(',').map(u => `${u}`)
const options = (cors.CorsOptions = {
  origin: allowedOrigins,
});
console.log(allowedOrigins);

app.use(express.json());
app.use(cors(options));
app.use(cookieParser())

app.listen(PORT, () => {
  logger.info(`PuntoAlto Catalog API is running at http://localhost:${PORT}`)
  routers(app)
})

module.exports = app;
