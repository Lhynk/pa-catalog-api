import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import morgan from 'morgan';

import { ENV } from './env';
import { RouterConfig } from './routes/config';

const app: Express = express();
const port: string | number = ENV.PORT;

const allowedOrigins: Array<string> = ENV.APP_URI.split(',').map((url: string) => `${url}`);
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

// Middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(cors(options));

RouterConfig.setupRouters(app);

if (process.env.NODE_ENV !== 'production') {
  console.log('Allowed origin:', allowedOrigins);
}

app.listen(port, () => console.log(`PuntoAlto Catalog API is running on port ${port}`));
