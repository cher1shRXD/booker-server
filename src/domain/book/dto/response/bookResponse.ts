import {userResponse, UserResponse} from "../../../user/dto/response/userResponse.js";
import {BookEntity} from "../../entity/bookEntity.js";

export interface BookResponse {
  id: number;
  title: string;
  author: UserResponse;
  cover: string;
  isOwner: boolean;
}

export const bookResponse = (book: BookEntity, isOwner: boolean): BookResponse => {
  return {
    id: book.id!,
    title: book.title!,
    author: userResponse(book.author!),
    cover: book.cover!,
    isOwner
  }
}