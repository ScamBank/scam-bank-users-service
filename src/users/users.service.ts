import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

interface UniqueFieldCheck {
  field: string;
  value: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  private async checkUniqueFields(dto: CreateUserDto) {
    const uniqueFieldsQueries: Promise<UniqueFieldCheck | null>[] = [];

    if (dto.email) {
      uniqueFieldsQueries.push(
        this.usersRepository
          .findOne({ where: { email: dto.email } })
          .then((user) => user && { field: 'email', value: dto.email }),
      );
    }

    uniqueFieldsQueries.push(
      this.usersRepository
        .findOne({ where: { phoneNumber: dto.phoneNumber } })
        .then(
          (user) => user && { field: 'phoneNumber', value: dto.phoneNumber },
        ),
    );

    uniqueFieldsQueries.push(
      this.usersRepository
        .findOne({ where: { snils: dto.snils } })
        .then((user) => user && { field: 'snils', value: dto.snils }),
    );

    uniqueFieldsQueries.push(
      this.usersRepository
        .findOne({ where: { passport: dto.passport } })
        .then((user) => user && { field: 'passport', value: dto.passport }),
    );

    const results = await Promise.all(uniqueFieldsQueries);
    const duplicates = results.filter((result): result is UniqueFieldCheck =>
      Boolean(result),
    );

    if (duplicates.length > 0) {
      const duplicateFields = duplicates
        .map((d) => `${d.field} (${d.value})`)
        .join(', ');
      throw new ConflictException(
        `Пользователь с такими данными уже существует: ${duplicateFields}`,
      );
    }
  }

  async getUsers() {
    return this.usersRepository.find();
  }

  async createUser(createUserDto: CreateUserDto) {
    // Проверяем уникальность полей перед созданием
    await this.checkUniqueFields(createUserDto);

    // Создаем нового пользователя
    const user = this.usersRepository.create(createUserDto);
    user.createdAt = new Date();
    user.updatedAt = new Date();
    return this.usersRepository.save(user);
  }
}
