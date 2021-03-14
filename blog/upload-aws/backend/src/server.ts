import 'dotenv/config';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import './config/database';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));

app.use(routes);

app.listen(3333);


