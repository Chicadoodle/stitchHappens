import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { User } from './User.js';
@Entity()
export class Video {
  @PrimaryColumn()
  videoId: string;

  @BeforeInsert()
  generateId(): void {
    this.videoId = uuidv7();
  }

  @Column()
  title: string;

  @Column()
  videoUrl: string;

  @Column()
  skillLevel: string;

  @Column()
  skiensNeeded: number;

  @Column()
  yarnSize: number;

  @Column()
  crochetOrKnit: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.videos)
  createdBy: Relation<User>;
}
