import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body(ValidationPipe) commentData: CreateCommentDto) {
    return await this.commentService.create(commentData);
  }

  @Get()
  async findAll() {
    return await this.commentService.findAll();
  }

  @Get(':id')
  async findComment(@Param('id', ParseIntPipe) id: number) {
    return await this.commentService.findComment(id);
  }

  @Delete(':id')
  async deleteComment(@Param('id', ParseIntPipe) id: number) {
    return await this.commentService.deleteComment(id);
  }

  @Patch(':id')
  async updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) data: UpdateCommentDto,
  ) {
    return await this.commentService.updateComment(id, data);
  }
}
