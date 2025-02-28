import {userRepository} from "../../user/repository/userRepository.js";
import {UserEntity} from "../../user/entity/userEntity.js";
import {CustomException} from "../../../global/error/exceptions.js";
import {generateToken} from "../../../global/utilities/jwt.js";
import {hashData, verifyHash} from "../../../global/utilities/hash.js";
import {redisClient} from "../../../global/database/redis.js";

export class AuthService {
  private readonly userRepository;
  
  constructor() {
    this.userRepository = userRepository;
  }
  
  public signup = async (username: string, password: string) => {
    try{
      const isExists = await this.userRepository.existsBy({ username});
      if(isExists){
        throw CustomException.conflict();
      }
      
      const hashedPassword = await hashData(password);
      
      const user = new UserEntity();
      user.username = username;
      user.password = hashedPassword;
      user.credit = 50000;
      
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