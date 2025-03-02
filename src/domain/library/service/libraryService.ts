import {userRepository} from "../../user/repository/userRepository.js";
import {CustomException} from "../../../global/error/exceptions.js";
import {LibraryResponse, libraryResponse} from "../dto/response/libraryResponse.js";

export class LibraryService {
  private readonly userRepository;
  
  constructor() {
    this.userRepository = userRepository;
  }
  
  public getMyLibrary = async (username: string) => {
    try{
      const user = await this.userRepository.findOneBy({ username });
      if (!user) {
        throw CustomException.notFound();
      }
      
      const result: LibraryResponse[] = [];
      user.library?.map((library) => result.push(libraryResponse(library)));
      
      return result;
    }catch(error) {
      throw error;
    }
  }
}