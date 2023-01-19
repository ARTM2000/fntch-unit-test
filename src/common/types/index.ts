import { Request } from 'express';
import { Users } from 'src/user/user.entity';

export type GlobalResponse<T> = {
  message?: string;
  data?: T;
};

export type AuthorizedRequest = { user: Users } & Request;
