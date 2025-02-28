import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BookEntity} from "./bookEntity.js";

@Entity()
export class PageEntity {
  @PrimaryGeneratedColumn()
  id?: number;
  
  @Column({ type: "varchar", nullable: false })
  content?: string;
  
  @Column({ type: 'int' })
  pageNumber?: number;
  
  @ManyToOne(() => BookEntity, (book) => book.pages)
  book?: BookEntity;
}