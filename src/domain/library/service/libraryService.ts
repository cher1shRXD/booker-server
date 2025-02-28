import {libraryRepository} from "../repository/libraryRepository.js";
import {userRepository} from "../../user/repository/userRepository.js";
import {CustomException} from "../../../global/error/exceptions.js";
import {LibraryResponse, libraryResponse} from "../dto/response/libraryResponse.js";
import {LibraryEntity} from "../entity/libraryEntity.js";

export class LibraryService {
  private readonly libraryRepository;
  private readonly userRepository;
  
  constructor() {
    this.libraryRepository = libraryRepository;
    this.userRepository = userRepository;
  }
  
  public getMyLibrary = async (username: string) => {
    try{
      const user = await this.userRepository.findOneBy({ username });
      if (!user) {
        throw CustomException.notFound();
      }
      
      const result: LibraryResponse[] = [];
      user.library?.forEach((library: LibraryEntity) => result.push(libraryResponse(library)));
      
      return result;
    }catch(error) {
      throw error;
    }
  }
}