import { Request } from 'express';
import { Users } from '@app/user/user.entity';

export type GlobalResponse<T> = {
  message?: string;
  data?: T;
};

export type AuthorizedRequest = { user: Users } & Request;
