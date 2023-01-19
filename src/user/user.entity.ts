import { Post } from 'src/post/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ nullable: false })
  public email: string;

  @Column({ nullable: false })
  public username: string;

  @Column({ nullable: false })
  @Exclude({ toPlainOnly: true })
  public hash_password: string;

  @OneToMany(() => Post, (post) => post.user)
  public posts: Post[];
}
