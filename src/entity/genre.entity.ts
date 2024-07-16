import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  constructor(genre: Partial<Genre>) {
    if (genre) {
      this.name = genre.name!;
    }
  }
}
