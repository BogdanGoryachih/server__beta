import {
	BadRequestException,
	CanActivate,
	ExecutionContext,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { CategoryService } from 'src/category/category.service'
import { NaukService } from 'src/nauk/nauk.service'
import { TransactionService } from 'src/transaction/transaction.service'

@Injectable()
export class AuthorGuard implements CanActivate {
	constructor(
		private readonly transactionService: TransactionService,
		private readonly categoryService: CategoryService,
		private readonly naukService: NaukService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const { id, type } = request.params

		let entity

		switch (type) {
			case 'transaction':
				entity = await this.transactionService.findOne(id)
				break
			case 'category':
				entity = await this.categoryService.findOne(id)
				break
			case 'nauk':
				entity = await this.naukService.findOne(id)
				break
			default:
				throw new NotFoundException('Something went wrong...')
		}

		const user = request.user

		if (entity && user && entity.user.id === user.id) {
			return true
		}

		throw new BadRequestException('Something went wrong...')
	}
}
