import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NaukService } from './nauk.service';
import { CreateNaukDto } from './dto/create-nauk.dto';
import { UpdateNaukDto } from './dto/update-nauk.dto';
import {

	UsePipes,
	ValidationPipe,
	UseGuards,
	Req,
	Query,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthorGuard } from 'src/guard/author.gurad';
@Controller('nauk')
export class NaukController {
  constructor(private readonly naukService: NaukService) {}

  @Post()
	@UsePipes(new ValidationPipe())
	@UseGuards(JwtAuthGuard)
	create(@Body() createNaukDto: CreateNaukDto, @Req() req) {
		return this.naukService.create(
			createNaukDto,
			+req.user.id,
		)
	}

	@Get(':type/find')
	@UseGuards(JwtAuthGuard)
	findAllByType(@Req() req, @Param('type') type: string) {
		return this.naukService.findAllByType(+req.user.id, type)
	}

	@Get('pagination')
	@UseGuards(JwtAuthGuard)
	findAllWithPagination(
		@Req() req,
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 3,
	) {
		return this.naukService.findAllWithPagination(
			+req.user.id,
			+page,
			+limit,
		)
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	findAll(@Req() req) {
		return this.naukService.findAll(+req.user.id)
	}

	// url/transactions/transaction/1
	// url/categories/category/1
	@Get(':type/:id')
	@UseGuards(JwtAuthGuard, AuthorGuard)
	findOne(@Param('id') id: string) {
		return this.naukService.findOne(+id)
	}

	@Patch(':type/:id')
	@UseGuards(JwtAuthGuard, AuthorGuard)
	update(
		@Param('id') id: string,
		@Body() updateNaukDto: UpdateNaukDto,
	) {
		return this.naukService.update(+id, updateNaukDto)
	}

	@Delete(':type/:id')
	@UseGuards(JwtAuthGuard, AuthorGuard)
	remove(@Param('id') id: string) {
		return this.naukService.remove(+id)
	}
}
