import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { UserService } from '../../user/user.service';

@Injectable()
export class BasicUserGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            return false;
        }
        const cred = (authHeader as string).replace(/Basic\S+/, '');
        try {
            await this.userService.dangerouslyVerifyCredential(cred);
            return true;
        } catch (err) {
            console.log('Unauthorized', err);
            return false;
        }
    }
}
