import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/users.dto';
import { User, UserDocument } from 'src/models/users.models';
import { UserDetails } from './user.details';
import * as bcrypt from 'bcrypt';
import { GetCurrentUserById } from 'src/utils/get-user-by-id.decorator';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}
  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      age: user.age,
      country: user.country,
    };
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.UserModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.UserModel.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async create(
    fullName: string,
    email: string,
    age: string,
    country: string,
    hashedPassword: string,
  ): Promise<UserDocument> {
    const newUser = new this.UserModel({
      fullName,
      email,
      age,
      country,
      password: hashedPassword,
    });
    return newUser.save();
  }

  GetAll() {
    return this.UserModel.find().select('-password');
  }
  GetCurrent(@GetCurrentUserById() user: any) {
    return this.UserModel.findById({ _id: user?.id }).select('-password');
  }
  GetOne(id: string) {
    return this.UserModel.findById({ _id: id }).select('-password');
  }
  Delete(id: string) {
    return this.UserModel.remove({ _id: id });
  }
  async Update(id: string, body: UserDto): Promise<any> {
    const hashPassword = await bcrypt.hash(body.password, 12);
    const updateProfile = {
      fullName: body.fullName,
      email: body.email,
      country: body.country,
      age: body.age,
      password: hashPassword,
    };

    return await this.UserModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateProfile },
      { new: true },
    );
  }
  Search(key: string) {
    const keyword = key
      ? {
          $or: [
            { fullName: { $regex: key, $options: 'i' } },
            { email: { $regex: key, $options: 'i' } },
          ],
        }
      : {};
    return this.UserModel.find(keyword);
  }

  Faker() {
    for (let index = 0; index < 30; index++) {
      const fakeUser = {
        fullName: faker.name.fullName(),
        email: faker.internet.email(),
        age: 30,
        country: faker.address.city(),
      };
      this.UserModel.create(fakeUser);
    }
    return 'success';
  }
}
