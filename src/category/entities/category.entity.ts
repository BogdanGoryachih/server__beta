import { Nauk } from 'src/nauk/entities/nauk.entity'
import { Transaction } from 'src/transaction/entities/transaction.entity'
import { User } from 'src/user/entities/user.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Category {
	@PrimaryGeneratedColumn({ name: 'category_id' })
	id: number

	@Column()
	title: string

	@ManyToOne(() => User, (user) => user.categories)
	@JoinColumn({ name: 'user_id' })
	user: User

	@OneToMany(() => Transaction, (transaction) => transaction.category)
	@JoinColumn({ name: 'transaction_id' })
	transactions: Transaction[]

	@OneToMany(() => Nauk, (nauk) => nauk.category)
	@JoinColumn({ name: 'transaction_id' })
	nauk: Transaction[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
	length: any
}
