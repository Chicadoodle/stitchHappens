import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity()
export class Pattern {
  @PrimaryColumn()
  patternId: string;

  @BeforeInsert()
  generateId(): void {
    this.patternId = uuidv7();
  }

  @Column()
  title: string;

  @Column()
  skillLevel: string;

  // these are under the assumption that the
  // uploading for a pdf is generally the same
  // requirements you listed as for the link
  // for the videos links

  @Column()
  originalName: string;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @Column()
  path: string;

  @Column()
  skiensNeeded: number;

  @Column()
  yarnSize: number;

  @Column
  crochetOrKnit: string;

  @Column
  createdAt: Date;
}
