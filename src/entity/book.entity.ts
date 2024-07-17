import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from "typeorm";
import { Author } from "./author.entity";
import { Genre } from "./genre.entity";
import { BookInstance } from "./bookinstance.entity";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  summary: string;

  @Column({ nullable: true })
  isbn: string;

  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: "author_id" })
  author: Author;

  @ManyToMany(() => Genre)
  @JoinTable({
    name: "book_genre",
    joinColumn: { name: "book_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "genre_id", referencedColumnName: "id" },
  })
  genres: Genre[];

  @OneToMany(() => BookInstance, (bookInstance) => bookInstance.book)
  bookInstances: BookInstance[];

  constructor(book: Partial<Book>) {
    if (book) {
      this.title = book.title!;
      this.summary = book.summary!;
      this.isbn = book.isbn!;
      this.author = book.author!;
      this.genres = book.genres!;
      this.bookInstances = book.bookInstances!;
    }
  }
}
