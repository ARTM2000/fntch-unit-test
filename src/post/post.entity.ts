import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from 'src/user/user.entity';
import { Exclude } from 'class-transformer';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ nullable: false })
  public title: string;

  @Column({ type: 'text', nullable: false })
  public content: string;

  @ManyToOne(() => Users, (user) => user.posts)
  @Exclude({ toPlainOnly: true })
  public user: Users;
}
