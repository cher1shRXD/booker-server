import bcrypt from 'bcryptjs';

export const hashData = async (data: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(data, saltRounds);
}

export const verifyHash = async (original: string, hashed: string) => {
  return await bcrypt.compare(original, hashed);
}