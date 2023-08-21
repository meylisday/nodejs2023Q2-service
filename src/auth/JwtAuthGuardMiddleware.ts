import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuardMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
