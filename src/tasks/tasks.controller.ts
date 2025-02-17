import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { CreateTaskDto } from 'src/dto/create-task.dto';
import type { UpdateTaskDto } from 'src/dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  @Inject(TasksService)
  private readonly taskService!: TasksService;

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.taskService.findOne(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  @Post()
  async create(@Body() body: CreateTaskDto) {
    try {
      return await this.taskService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Task already exists');
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const task = await this.taskService.delete(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    const task = await this.taskService.update(id, body);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }
}
