import express from 'express';
import { router } from './routes';
import path from 'path';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(router);

app.listen(3000, () => console.log('Server is running in 3000 port'));
