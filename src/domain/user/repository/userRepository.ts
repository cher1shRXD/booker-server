import {BookerDataSource} from "../../../global/database/dataSource.js";
import {UserEntity} from "../entity/userEntity.js";

export const userRepository = BookerDataSource.getRepository(UserEntity)