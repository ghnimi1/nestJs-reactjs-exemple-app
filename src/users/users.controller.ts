import {
  Controller,
  Post,
  Get,
  UseGuards,
  Patch,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserDto } from 'src/dto/users.dto';
import { GetCurrentUserById } from 'src/utils/get-user-by-id.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  GetAll() {
    return this.service.GetAll();
  }
  @UseGuards(JwtGuard)
  @Get('me')
  GetCueent(@GetCurrentUserById() user: any) {
    return this.service.GetCurrent(user);
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  GetOne(@Param('id') id: string) {
    return this.service.GetOne(id);
  }
  @UseGuards(JwtGuard)
  @Patch('/:id')
  Update(@Param('id') id: string, @Body() body: UserDto) {
    return this.service.Update(id, body);
  }
  @UseGuards(JwtGuard)
  @Delete('/:id')
  Delete(@Param('id') id: string) {
    return this.service.Delete(id);
  }

  @Post('/search')
  Search(@Query('key') key: string) {
    return this.service.Search(key);
  }

  @Post('/faker')
  Faker() {
    return this.service.Faker();
  }
}
