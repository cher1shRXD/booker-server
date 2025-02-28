import {userRepository} from "../repository/userRepository.js";
import {CustomException} from "../../../global/error/exceptions.js";
import {userResponse} from "../dto/response/userResponse.js";

export class UserService {
  private readonly userRepository;
  
  constructor() {
    this.userRepository = userRepository;
  }
  
  public getMe = async (username: string) => {
    try{
      const user =  await this.userRepository.findOneBy({ username });
      
      if (!user) {
        throw CustomException.notFound();
      }
      
      return userResponse(user);
    }catch(error) {
      throw error;
    }
  }
}