import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LibraryEntity} from "../../library/entity/libraryEntity.js";
import {BookEntity} from "../../book/entity/bookEntity.js";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id?: number;
  
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  username?: string;
  
  @Column({ type: 'varchar', length: 255, nullable: false })
  password?: string;
  
  @Column({ type: 'int', nullable: false })
  credit?: number;
  
  @Column({ type: 'int' })
  @OneToMany(() => LibraryEntity, (library) => library.user)
  library?: LibraryEntity[];
  
  @Column({ type: 'int' })
  @OneToMany(() => BookEntity, (book) => book.author)
  book?: BookEntity[];
}