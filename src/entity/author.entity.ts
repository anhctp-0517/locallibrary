import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  family_name: string;

  @Column({ nullable: true })
  date_of_birth: Date;

  @Column({ nullable: true })
  date_of_death: Date;

  @Column({ nullable: true })
  url: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];

  constructor(author?: Partial<Author>) {
    if (author) {
      this.first_name = author.first_name!;
      this.family_name = author.family_name!;
      this.date_of_birth = author.date_of_birth!;
      this.date_of_death = author.date_of_death!;
      this.url = author.url!;
      this.books = author.books!;
    }
  }
}
