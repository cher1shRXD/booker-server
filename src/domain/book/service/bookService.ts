import {bookRepository} from "../repository/bookRepository.js";
import {pageRepository} from "../repository/pageRepository.js";
import {libraryRepository} from "../../library/repository/libraryRepository.js";
import {CustomException} from "../../../global/error/exceptions.js";
import {bookResponse} from "../dto/response/bookResponse.js";
import {bookDetailResponse} from "../dto/response/bookDetailResponse.js";

export class BookService {
  private readonly bookRepostiory;
  private readonly pageRepository;
  private readonly libraryRepository;
  
  constructor() {
    this.bookRepostiory = bookRepository;
    this.pageRepository = pageRepository;
    this.libraryRepository = libraryRepository;
  }
  
  public getBestSellers = async (username: string) => {
    try{
      const books = await this.bookRepostiory.find();
      books.sort((a, b) => b.buyCount! - a.buyCount!);
      
      return await Promise.all(
        books.map(async (book) => {
          const isOwner = await this.libraryRepository.existsBy({
            user: {username},
            book: {id: book.id}
          });
          return bookResponse(book, isOwner);
        })
      );
    }catch(error) {
      throw error;
    }
  }
  
  public getRanking = async (username: string) => {
    try{
      const books = await this.bookRepostiory.find();
      books.sort((a, b) => b.readCount! - a.readCount!);
      
      return await Promise.all(
        books.map(async (book) => {
          const isOwner = await this.libraryRepository.existsBy({
            user: {username},
            book: {id: book.id}
          });
          return bookResponse(book, isOwner);
        })
      );
    }catch(error) {
      throw error;
    }
  }
  
  public getBookDetail = async (bookId: number) => {
    try{
      const book = await this.bookRepostiory.findOneBy({ id: bookId });
  
      if(!book) {
        throw CustomException.notFound();
      }
      
      return bookDetailResponse(book);
    }catch(error) {
      throw error;
    }
  }
}