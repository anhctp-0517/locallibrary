import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class BookInstance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imprint: string;

  @Column()
  status: string;

  @Column({ type: "date", nullable: true })
  dueBack: Date;

  @ManyToOne(() => Book, (book) => book.bookInstances, { nullable: false })
  @JoinColumn({ name: "book_id" })
  book: Book;

  constructor(bookInstance?: Partial<BookInstance>) {
    if (bookInstance) {
      this.imprint = bookInstance.imprint!;
      this.status = bookInstance.status!;
      this.dueBack = bookInstance.dueBack!;
      this.book = bookInstance.book!;
    }
  }
}
