import { CreateNaukDto } from './dto/create-nauk.dto';
import { UpdateNaukDto } from './dto/update-nauk.dto';
import { Nauk } from './entities/nauk.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { Repository } from 'typeorm'
@Injectable()
export class NaukService {
  constructor(
		@InjectRepository(Nauk)
		private readonly naukRepository: Repository<Nauk>,
	) {}

	async create(createTransactionDto: CreateNaukDto, id: number) {
		const newTransaction = {
			title: createTransactionDto.title,
			amount: createTransactionDto.amount,
			type: createTransactionDto.type,
			category: { id: +createTransactionDto.category },
			user: { id },
		}

		if (!newTransaction)
			throw new BadRequestException('Somethins went wrong...')
		return await this.naukRepository.save(newTransaction)
	}

	async findAll(id: number) {
		const transactions = await this.naukRepository.find({
			where: {
				user: { id },
			},
			relations: {
				category: true,
			},
			order: {
				createdAt: 'DESC',
			},
		})
		return transactions
	}

	async findOne(id: number) {
		const transaction = await this.naukRepository.findOne({
			where: {
				id,
			},
			relations: {
				user: true,
				category: true,
			},
		})
		if (!transaction) throw new NotFoundException('Transaction not found')
		return transaction
	}

	async update(id: number, updateTransactionDto: UpdateNaukDto) {
		const transaction = await this.naukRepository.findOne({
			where: { id },
		})

		if (!transaction) throw new NotFoundException('Transaction not found')

		return await this.naukRepository.update(id, updateTransactionDto)
	}

	async remove(id: number) {
		const transaction = await this.naukRepository.findOne({
			where: { id },
		})

		if (!transaction) throw new NotFoundException('Transaction not found')

		return await this.naukRepository.delete(id)
	}

	async findAllWithPagination(id: number, page: number, limit: number) {
		const transactions = await this.naukRepository.find({
			where: {
				user: { id },
			},
			relations: {
				category: true,
				user: {
					transactions: true,
				},
			},
			order: {
				createdAt: 'DESC',
			},
			take: limit,
			skip: (page - 1) * limit,
		})

		return transactions
	}

	async findAllByType(id: number, type: string) {
		const transactions = await this.naukRepository.find({
			where: {
				user: { id },
				type,
			},
		})

		const total = transactions.reduce((acc, obj) => acc + obj.amount, 0)

		return total
	}
}
