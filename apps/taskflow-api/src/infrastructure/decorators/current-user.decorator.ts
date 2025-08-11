import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/application/use-cases/user/auth/login.use-case';

export const CurrentUser = createParamDecorator(
    (data: keyof JwtPayload | undefined, ctx: ExecutionContext): JwtPayload | string => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        return data ? user?.[data] : user;
    },
);
