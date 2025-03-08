import { IsDateString, IsEmail, Matches, Length } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  @Length(1, 50)
  firstName: string;

  @Column({ length: 50, nullable: true })
  @Length(1, 50)
  middleName: string;

  @Column({ length: 50 })
  @Length(1, 50)
  lastName: string;

  @Index('idx_user_email', { unique: true, where: 'email IS NOT NULL' })
  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsEmail()
  email?: string;

  @Index('idx_user_phone')
  @Column({ unique: true })
  phoneNumber: string;

  @Column({ type: 'date' })
  @IsDateString()
  birthDate: Date;

  @Index('idx_user_snils')
  @Column({ unique: true })
  snils: string;

  @Index('idx_user_passport')
  @Column({ unique: true })
  @Matches(/^\d{4} \d{6}$/)
  passport: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;
}
