import 'reflect-metadata';
import {createConnection} from 'typeorm';
import express, {Request, Response} from 'express';


import {User} from './entity/User';


const app = express();
app.use(express.json());

// CREATE
app.post('/users', async (req: Request, res: Response) => {
  const {name, email, role} = req.body;
});

// READ

// Update

// Delete

// Find

createConnection().then(async () => {
  app.listen(5000, () => {
    console.log('server start at http://localhost:5000');
  });
}).catch((error) => console.log(error));
