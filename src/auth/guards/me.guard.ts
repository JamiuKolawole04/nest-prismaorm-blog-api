import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

// @Injectable()
// export class Me implements CanActivate {
//   async canActivate(context: ExecutionContext) {
//     const requset = context.switchToHttp().getRequest();
//     return requset.user;
//   }
// }

export const Me = createParamDecorator(
  async (data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user;
  },
);
