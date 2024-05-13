import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { Transaction } from 'src/transaction/entities/transaction.entity'
import { TransactionService } from 'src/transaction/transaction.service'
import { Nauk } from 'src/nauk/entities/nauk.entity'
import { NaukService } from 'src/nauk/nauk.service'

@Module({
	imports: [TypeOrmModule.forFeature([Category, Transaction, Nauk])],
	controllers: [CategoryController],
	providers: [CategoryService, TransactionService , NaukService],
})
export class CategoryModule {}
