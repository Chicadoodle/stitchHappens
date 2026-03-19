import {
    Entity, PrimaryColumn, Column,
    BeforeInsert,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { User } from './entities/User.js';

@Entity()
export class FavListVideo {
  @PrimaryColumn()
  favListVideoId: string;

  @BeforeInsert()
  generateId(): void {
    this.favListVideoId = uuidv7();
  }

  @Column()
  videoId: string;

  @ManyToOne(() => User, (user) => users.favListVideo)
  user: Relation<User>;
}