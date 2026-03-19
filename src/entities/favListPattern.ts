import {
    Entity, PrimaryColumn, Column,
    BeforeInsert,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { User } from "./entities/User.js"

@Entity()
export class FavListPattern {
  @PrimaryColumn()
  favListPatternId: string;

  @BeforeInsert()
  generateId(): void {
    this.favListPatternId = uuidv7();
  }

  @Column()
  patternId: string;

  @ManyToOne(() => User, (user) => users.favListPattern)
  user: Relation<User>;
}