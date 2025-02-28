import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class LibraryEntity {
  @PrimaryGeneratedColumn()
  id?: number;
}