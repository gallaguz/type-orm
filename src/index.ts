import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { Request, Response } from 'express';

import { User } from './entity/User';

const app = express();
app.use(express.json());

// CREATE
app.post('/users', async (req: Request, res: Response) => {
	const { name, email, role } = req.body;

	try {
		const user = User.create({ name, email, role });

		await user.save();

		return res.status(201).json(user);
	} catch (e) {
		console.log(e);

		return res.status(500).json(e);
	}
});

// READ
app.get('/users', async (_: Request, res: Response) => {
	try {
		const users = await User.find();

		return res.status(200).json(users);
	} catch (e) {
		console.log(e);

		return res.status(500).json(e);
	}
});

// UPDATE

// DELETE

// FIND

createConnection()
	.then(async () => {
		app.listen(5000, () => {
			console.log('server start at http://localhost:5000');
		});
	})
	.catch((error) => console.log(error));
