import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../../user/entity/userEntity.js";
import {BookEntity} from "../../book/entity/bookEntity.js";

@Entity()
export class LibraryEntity {
  @PrimaryGeneratedColumn()
  id?: number;
  
  @Column({ type: 'int' })
  @ManyToOne(() => BookEntity, (book) => book.library, { onDelete: "CASCADE" })
  book?: BookEntity;
  
  @Column({ type: 'int' })
  @ManyToOne(() => UserEntity, (user) => user.library, { onDelete: "CASCADE" })
  user?: UserEntity;
  
  @Column({ type: 'varchar' })
  createdAt?: string = new Date().toISOString();
  
  @Column({ type: 'int' })
  bookmark?: number = 0;
  
  @Column({ type: "varchar" })
  status?: "NOT_READ" | "READING" | "READ" = "NOT_READ";
}