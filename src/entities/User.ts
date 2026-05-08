import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { Pattern } from './Patterns.js';
import { Video } from './Videos.js';

@Entity()
export class User {
  @PrimaryColumn()
  userId: string;

  @BeforeInsert()
  generatedId(): void {
    this.userId = uuidv7();
  }

  @Column()
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @CreateDateColumn()
  joinDate: Date;

  @OneToMany(() => Video, (video) => video.createdBy)
  videos: Video[];
  @OneToMany(() => Pattern, (pattern) => pattern.createdBy)
  patterns: Pattern[];

  @Column('text', { array: true, default: [] })
  favoriteVideoIds: string[];
  @Column('text', { array: true, default: [] })
  favoritePatternIds: string[];
}
