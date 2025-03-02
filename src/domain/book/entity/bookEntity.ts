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
  
  @Column({ type: "int" })
  @ManyToOne(() => UserEntity, (user) => user.book)
  author?: UserEntity;
  
  @Column({ type: "varchar" })
  cover?: string = "";
  
  @Column({ type: "int" })
  @OneToMany(() => PageEntity, (page) => page.book, { cascade: true })
  pages?: PageEntity[];
  
  @Column({ type: "int" })
  @OneToMany(() => LibraryEntity, (library) => library.book)
  library?: LibraryEntity[];
  
  @Column({ type: "int" })
  buyCount?: number = 0;
  
  @Column({ type: "int" })
  readCount?: number = 0;
  
  @Column({ type: "varchar" })
  releasedAt?: string = new Date().toISOString();
}