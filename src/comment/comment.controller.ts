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
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Public } from 'src/auth/decorators/isPublic.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserPayload } from 'src/auth/types/UserPayload';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body(ValidationPipe) commentData: CreateCommentDto, @CurrentUser() currentUser: UserPayload) {
    if (commentData.userId !== currentUser.sub) {
      throw new UnauthorizedException('Só é possível criar comentários para si mesmo')
    }
    return await this.commentService.create(commentData);
  }

  @Public()
  @Get()
  async findAll() {
    return await this.commentService.findAll();
  }

  @Public()
  @Get(':id')
  async findComment(@Param('id', ParseIntPipe) id: number) {
    const comment = await this.commentService.findComment(id);
    if (!comment) {
      throw new NotFoundException('Comentário não encontrado');
    }
    return comment;
  }

  @Delete(':id')
  async deleteComment(@Param('id', ParseIntPipe) id: number, @CurrentUser() currentUser: UserPayload) {
    const comment = await this.commentService.findComment(id);
    if (comment.userId !== currentUser.sub) {
      throw new UnauthorizedException('Só é possível deletar suas próprias avaliações')
    }
    return await this.commentService.deleteComment(id);
  }

  @Patch(':id')
  async updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) data: UpdateCommentDto,
    @CurrentUser() currentUser: UserPayload
  ) {
    const comment = await this.commentService.findComment(id);
    if (comment.userId !== currentUser.sub) {
      throw new UnauthorizedException('Só é possível editar suas próprias avaliações')
    }
    return await this.commentService.updateComment(id, data);
  }
}
