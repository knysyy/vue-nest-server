import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Response as Res } from "express";

export interface Response<T> {
  code: number;
  status: string;
  data: { data: T } | string | null;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const http = context.switchToHttp();
    const request = http.getResponse<Res>();
    const code = request.statusCode;
    const status = request.statusMessage || "success";
    return next.handle().pipe(
      map(data => {
        return {
          code,
          status,
          data,
        };
      }),
    );
  }
}
