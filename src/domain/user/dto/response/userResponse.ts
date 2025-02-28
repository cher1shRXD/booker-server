import {UserEntity} from "../../entity/userEntity.js";

export interface UserResponse {
  id: number;
  username: string;
  credit: number;
}

export const userResponse = (user: UserEntity): UserResponse => {
  return {
    id: user.id!,
    username: user.username!,
    credit: user.credit!,
  }
}