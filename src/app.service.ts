import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  public isValidUuid(id: string): boolean {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  }
}
