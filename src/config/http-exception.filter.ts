import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { I18nService } from 'nestjs-i18n';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  async catch(exception: HttpException, _host: ArgumentsHost) {
    const error = await this.i18n.translate(exception.message);
    exception.message = error.message || error;
    exception[`errorCode`] = error?.errorCode;

    if (_host.getType().toString() === 'http') {
      const ctx = _host.switchToHttp();
      const response = ctx.getResponse();
      const status = exception.getStatus();

      response.status(status).json({
        status: exception.getStatus(),
        data: exception.getResponse()['data'],
        errorCode: exception?.getResponse()['errorCode'],
        message: exception.message,
        name: exception.name,
      });
    }

    return exception;
  }
}
