import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LibraryEntity} from "../../library/entity/libraryEntity.js";
import {UserEntity} from "../../user/entity/userEntity.js";
import {PageEntity} from "./pageEntity.js";

@Entity()
export class BookEntity {
  @PrimaryGeneratedColumn()
  id?: number;
  
  @Column({ type: "varchar" })
  title?: string = "";
  
  @ManyToOne(() => UserEntity, (user) => user.book)
  author?: UserEntity;
  
  @Column({ type: "varchar" })
  cover?: string = "";
  
  @OneToMany(() => PageEntity, (page) => page.book, { cascade: true })
  pages?: PageEntity[];
  
  @OneToMany(() => LibraryEntity, (library) => library.book)
  library?: LibraryEntity[];
}