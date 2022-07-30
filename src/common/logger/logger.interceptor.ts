import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { coloredStatusCode } from '../utils/logger-colors.util';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	constructor(private readonly logger: LoggerService) {}
	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		const response = context.switchToHttp().getResponse() as Response;
		const statusCode = coloredStatusCode(response.statusCode);

		return next
			.handle()
			.pipe(
				tap((data?: unknown) =>
					this.logger.response(`${statusCode} ${response.req.url} ${data ? JSON.stringify(data).length : '-'}`),
				),
			);
	}
}
