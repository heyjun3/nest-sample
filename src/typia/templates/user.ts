import typia from 'typia';

export interface IUser {
  id: string;
  name: string;
}

export const checkUsers = typia.createAssert<IUser[]>();
export const checkUser = typia.createAssert<IUser>();
