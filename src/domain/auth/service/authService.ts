import {userRepository} from "../../user/repository/userRepository.js";
import {UserEntity} from "../../user/entity/userEntity.js";
import {LibraryEntity} from "../../library/entity/libraryEntity.js";
import {libraryRepository} from "../../library/repository/libraryRepository.js";
import {CustomException} from "../../../global/error/exceptions.js";
import {generateToken} from "../../../global/utilities/jwt.js";
import {hashData, verifyHash} from "../../../global/utilities/hash.js";
import {redisClient} from "../../../global/database/redis.js";

export class AuthService {
  private readonly userRepository;
  private readonly libraryRepository;
  
  constructor() {
    this.userRepository = userRepository;
    this.libraryRepository = libraryRepository;
  }
  
  public signup = async (username: string, password: string) => {
    try{
      const isExists = await this.userRepository.existsBy({ username});
      if(isExists){
        throw CustomException.conflict();
      }
      
      const library = new LibraryEntity();
      
      await this.libraryRepository.save(library);
      
      const hashedPassword = await hashData(password);
      
      const user = new UserEntity();
      user.username = username;
      user.password = hashedPassword;
      user.credit = 50000;
      user.library = library.id;
      
      await this.userRepository.save(user);
      
      return await generateToken(username);
    }catch(error) {
      console.log(error);
      throw error;
    }
  }
  
  public login = async (username: string, password: string) => {
    try{
      const user = await this.userRepository.findOneBy({username});
      if(!user){
        throw CustomException.notFound();
      }
      
      const isCorrectPassword = await verifyHash(password, user.password!);
      
      if(!password || !isCorrectPassword) {
        throw CustomException.unauthorized();
      }
      
      return await generateToken(username);
    }catch(error) {
      throw error;
    }
  }
  
  public reissue = async (refreshToken: string) => {
    const payload = await  redisClient.get(refreshToken);
    if(!payload){
      throw CustomException.notFound();
    }
    return await generateToken(payload)
  }
}