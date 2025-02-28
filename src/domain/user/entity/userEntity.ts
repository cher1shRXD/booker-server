import "reflect-metadata";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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
  
  @Column({ type: 'int', nullable: false })
  library?: number;
}