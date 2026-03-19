import {
    Entity, PrimaryColumn, Column,
    BeforeInsert,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { FavListPattern } from './favlistPattern';
import { FavListVideo } from './favListVideo';

@Entity()
export class User{
    @PrimaryColumn()
    userId: string;

    @Column()
        userName: string;

    @BeforeInsert()
    generatedId(): void {
        this.userId = uuidv7();
    }

    @Column({ unique: true })
    email: string;

    @Column()
    passwordHash: string;

    @Column({ default: false })
    verifiedEmail: boolean;

    @Column({ default: false })
    verifiedPhoneNum: boolean;

    @Column()
    joinDate: Date;

    @ManytoOne(() => favListPattern, (favListPattern) => favListPattern.user)
    @JoinColumn()
    favListPattern: Relation<FavListPattern>;
    favListPatternId: string;

    @ManytoOne(() => favListVideo, (favListPattern) => favListPattern.user)
    @JoinColumn()
    favListVideo: Relation<FavListPattern>;
    favListVideoId: string;

    }