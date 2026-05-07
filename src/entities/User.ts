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
  /*Property 'createdBy' does not exist on type 'CanvasPattern'.ts(2339)
any */
  patterns: Pattern[];

  @Column('text', { array: true, default: [] })
  /*Parsing error: ':' expected.eslint
(property) ColumnCommonOptions.default?: any
Default database value. Note that default value is not supported when column type is 'json' of mysql. */
  favoriteVideoIds: string[];
  @Column('text', { array: true, default: [] })
  favoritePatternIds: string[];
}
