import express, { Request, Response } from 'express';
import Post from '../entity/Post';
import User from '../entity/User';

export const postsRoutes = express.Router();

// CREATE
postsRoutes.post('/', async (req: Request, res: Response) => {
	const { userUuid, title, body } = req.body;

	try {
		const user = await User.findOneOrFail({ uuid: userUuid });

		const post = new Post({ title, body, user });

		await post.save();

		return res.json(post);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

// READ
postsRoutes.get('/', async (req: Request, res: Response) => {
	try {
		const posts = await Post.find({ relations: ['user'] });

		return res.json(posts);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: 'Something went wrong' });
	}
});

// UPDATE

// DELETE

// FIND
