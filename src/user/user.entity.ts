import { Post } from 'src/post/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public email: string;

  @Column()
  public username: string;

  @Column()
  public hash_password: string;

  @OneToMany(() => Post, (post) => post.user)
  public posts: Post[];
}
