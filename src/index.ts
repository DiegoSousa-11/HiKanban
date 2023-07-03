import express from 'express';
import { router } from './routes';
import path from 'path';
import { userRoutes } from './routes/user';
import { blockRoutes } from './routes/block';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(router);
app.use('/user', userRoutes);
app.use('/block', blockRoutes);

app.listen(3000, () => console.log('Server is running in 3000 port'));
