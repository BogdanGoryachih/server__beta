import { Module } from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { TransactionController } from './transaction.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Transaction } from './entities/transaction.entity'
import { Category } from 'src/category/entities/category.entity'
import { CategoryService } from 'src/category/category.service'
import { Nauk } from 'src/nauk/entities/nauk.entity'
import { NaukService } from 'src/nauk/nauk.service'

@Module({
	imports: [TypeOrmModule.forFeature([Transaction, Category,Nauk])],
	controllers: [TransactionController],
	providers: [TransactionService, CategoryService, NaukService],
})
export class TransactionModule {}
