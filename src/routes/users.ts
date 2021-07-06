import express, { Request, Response } from 'express';
import User from '../entity/User';
import { validate } from 'class-validator';

export const usersRoutes = express.Router();

// CREATE
usersRoutes.post('/', async (req: Request, res: Response) => {
	const { name, email, role } = req.body;

	try {
		const user = User.create({ name, email, role });

		const errors = await validate(user);
		if (errors.length > 0) {
			return res.status(500).json(errors);
		} else {
			await user.save();

			return res.status(201).json(user);
		}
	} catch (err) {
		console.log(err);

		return res.status(500).json(err);
	}
});

// READ
usersRoutes.get('/', async (_: Request, res: Response) => {
	try {
		const users = await User.find({ relations: ['posts'] });

		return res.status(200).json(users);
	} catch (e) {
		console.log(e);

		return res.status(500).json({ error: 'Something went wrong' });
	}
});

// UPDATE
usersRoutes.put('/:uuid', async (req: Request, res: Response) => {
	const uuid = req.params.uuid;
	const { name, email, role } = req.body;

	try {
		const user = await User.findOneOrFail({ uuid });

		user.name = name || user.name;
		user.email = email || user.email;
		user.role = role || user.role;

		await user.save();

		return res.status(201).json(user);
	} catch (e) {
		console.log(e);

		return res.status(500).json({ error: 'Something went wrong' });
	}
});

// DELETE
usersRoutes.delete('/:uuid', async (req: Request, res: Response) => {
	const uuid = req.params.uuid;

	try {
		const user = await User.findOneOrFail({ uuid });

		await user.remove();

		return res.status(204).json({ message: 'User deleted successfully' });
	} catch (e) {
		console.log(e);

		return res.status(500).json({ error: 'Something went wrong' });
	}
});

// FIND
usersRoutes.get('/:uuid', async (req: Request, res: Response) => {
	const uuid = req.params.uuid;

	try {
		const user = await User.findOneOrFail({ uuid });

		await user.remove();

		return res.status(200).json(user);
	} catch (e) {
		console.log(e);

		return res.status(404).json({ error: 'Something went wrong' });
	}
});
