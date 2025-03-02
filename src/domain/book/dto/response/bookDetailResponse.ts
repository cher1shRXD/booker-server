import {userResponse, UserResponse} from "../../../user/dto/response/userResponse.js";
import {BookEntity} from "../../entity/bookEntity.js";

export interface BookDetailResponse {
  id: number;
  title: string;
  author: UserResponse;
  cover: string;
  releasedAt: string;
  readCount: number;
  buyCount: number;
}

export const bookDetailResponse = (book: BookEntity): BookDetailResponse => {
  return {
    id: book.id!,
    title: book.title!,
    author: userResponse(book.author!),
    cover: book.cover!,
    releasedAt: book.releasedAt!,
    readCount: book.readCount!,
    buyCount: book.buyCount!,
  }
}