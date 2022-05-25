import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import morgan from 'morgan';

import ENV from './env';
import setupRouters from './routes/routes.config';

const app: Express = express();
const port: string | number = ENV.PORT;

const allowedOrigins: string[] = ENV.APP_URI.split(',').map((url: string) => `${url}`);
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

// Middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(cors(options));

setupRouters(app);

if (process.env.NODE_ENV !== 'production') {
  console.log('Allowed origin:', allowedOrigins);
}

app.listen(port, () => console.log(`PuntoAltos Catalog API is running on port ${port}`));
