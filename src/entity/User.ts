import { Entity, Column, OneToMany } from 'typeorm';
import Post from './Post';
import Model from './Model';
import { IsEmail, IsEnum, Length } from 'class-validator';

@Entity('users')
export default class User extends Model {
	@Column()
	@Length(1, 255)
	name: string;

	@Column()
	@Length(1, 255)
	@IsEmail()
	email: string;

	@Column({
		type: 'enum',
		enum: ['user', 'admin', 'superadmin'],
		default: 'user',
	})
	@IsEnum(['user', 'admin', 'superadmin', undefined])
	role: string;

	@OneToMany(() => Post, (post) => post.user)
	posts: Post[];
}
