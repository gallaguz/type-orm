import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

export default abstract class Model extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'uuid' })
	uuid: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@BeforeInsert()
	createUUid() {
		this.uuid = uuid();
	}

	// Hide id in response
	toJSON() {
		return { ...this, id: undefined };
	}

	constructor(model?: Partial<any>) {
		super();
		Object.assign(this, model);
	}
}
