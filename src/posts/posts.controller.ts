import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostQueryDto } from './dto/query.dto';
import { Me } from '../auth/guards/me.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { isEmpty } from '../utils';

@Controller('api/v1/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createPostDto: CreatePostDto, @Me() me) {
    /**
     * creatin posts with userId and without categories
     */
    // return this.postsService.create({ ...createPostDto, userId: me.id });

    /**
     * posts creation with categories and userId
     */

    const categories = createPostDto.categories?.map((category) => ({
      id: category,
    }));

    return this.postsService.create({
      ...createPostDto,
      author: { connect: { id: me.id } },
      categories: { connect: categories },
    });
  }

  /**
   *get all users without params
   * @param none
   * @returns posts
   */

  // @Get()
  // findAll() {
  //   return this.postsService.findAll();
  // }

  /**
   * get all users with params or not
   * @param author | categories  null
   * @returns posts with or without authors
   */
  @Get()
  findAll(@Query() query: { author: boolean; categories: boolean }) {
    console.log(query);
    return this.postsService.findAll(isEmpty(query) ? null : query);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const categories = updatePostDto.categories.map((category) => ({
      id: category,
    }));
    return this.postsService.update(id, {
      ...updatePostDto,
      categories: { set: categories },
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.remove(id);
  }
}
