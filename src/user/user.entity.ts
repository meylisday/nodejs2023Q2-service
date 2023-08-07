import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ default: 1 })
  version: number;

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updatedAt: number;

  // @BeforeUpdate()
  // public setUpdatedAt() {
  //   this.updatedAt = Math.floor(Date.now() / 1000);
  // }

  // @BeforeInsert()
  // public setCreatedAt() {
  //   this.createdAt = Math.floor(Date.now() / 1000);
  // }
}
