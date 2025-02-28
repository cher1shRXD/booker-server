import {BookEntity} from "../../../book/entity/bookEntity.js";
import {LibraryEntity} from "../../entity/libraryEntity.js";

export interface LibraryResponse {
  id: number;
  book: BookEntity,
  createdAt: string;
  bookmark: number;
  status: "NOT_READ" | "READING" | "READ"
}

export const libraryResponse = (library: LibraryEntity): LibraryResponse => {
  return {
    id: library.id!,
    book: library.book!,
    createdAt: library.createdAt!,
    bookmark: library.bookmark!,
    status: library.status!
  }
}