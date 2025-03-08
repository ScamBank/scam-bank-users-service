import {
  IsString,
  Matches,
  IsNotEmpty,
  Length,
  IsDateString,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  @IsString()
  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  @Length(2, 50, { message: 'Имя должно быть от 2 до 50 символов' })
  readonly firstName: string;

  @ApiProperty({
    example: 'Иванович',
    description: 'Отчество пользователя',
    required: false,
  })
  @IsString()
  @Length(0, 50, { message: 'Отчество должно быть не более 50 символов' })
  readonly middleName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
  @IsString()
  @IsNotEmpty({ message: 'Фамилия не может быть пустой' })
  @Length(2, 50, { message: 'Фамилия должна быть от 2 до 50 символов' })
  readonly lastName: string;

  @ApiProperty({ example: '+79001234567', description: 'Номер телефона' })
  @Matches(/^\+7-\(\d{3}\)-\d{3}-\d{2}-\d{2}$/, {
    message: 'Неверный формат номера телефона',
  })
  @IsNotEmpty({ message: 'Номер телефона не может быть пустым' })
  readonly phoneNumber: string;

  @ApiProperty({ example: '123-456-789 00', description: 'СНИЛС' })
  @IsString()
  @IsNotEmpty({ message: 'СНИЛС не может быть пустым' })
  @Matches(/^\d{3}-\d{3}-\d{3}\s\d{2}$/, {
    message: 'Неверный формат СНИЛС (должен быть XXX-XXX-XXX XX)',
  })
  snils: string;

  @ApiProperty({ example: '4444 123456', description: 'Паспорт' })
  @IsString()
  @IsNotEmpty({ message: 'Номер паспорта не может быть пустым' })
  @Matches(/^\d{4}\s\d{6}$/, {
    message: 'Неверный формат паспорта (должен быть XXXX XXXXXX)',
  })
  passport: string;

  @ApiProperty({ example: '1990-01-01', description: 'Дата рождения' })
  @IsNotEmpty({ message: 'Дата рождения не может быть пустой' })
  @IsDateString({}, { message: 'Неверный формат даты (YYYY-MM-DD)' })
  birthDate: string;

  @ApiProperty({
    example: 'test@example.com',
    description: 'Email',
    required: false,
  })
  @IsEmail({}, { message: 'Неверный формат email' })
  email: string;
}
