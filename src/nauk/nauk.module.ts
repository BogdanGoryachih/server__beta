import { Module } from '@nestjs/common';
import { NaukService } from './nauk.service';
import { NaukController } from './nauk.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Transaction } from '../transaction/entities/transaction.entity'; // Замените на правильный путь
import { CategoryService } from 'src/category/category.service';
import { Nauk } from './entities/nauk.entity';
import { TransactionService } from 'src/transaction/transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Nauk, Category, Transaction])],
  controllers: [NaukController],
  providers: [NaukService, CategoryService,TransactionService]
})
export class NaukModule {}
