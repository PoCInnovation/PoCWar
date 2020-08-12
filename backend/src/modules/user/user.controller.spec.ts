import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let user: TestingModule;

  beforeAll(async () => {
    user = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const userController = user.get<UserController>(UserController);
      expect(userController.getUserById(1)).toBe(null);
    });
  });
});
