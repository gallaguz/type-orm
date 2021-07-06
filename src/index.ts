import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import { usersRoutes, postsRoutes } from './routes';

const app = express();
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);

createConnection()
	.then(async () => {
		app.listen(5000, () => {
			console.log('server start at http://localhost:5000');
		});
	})
	.catch((error) => console.log(error));
