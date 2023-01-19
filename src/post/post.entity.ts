import { Users } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public title: string;

  @Column({ type: 'text' })
  public content: string;

  @ManyToOne(() => Users, (user) => user.posts)
  public user: Users;
}
