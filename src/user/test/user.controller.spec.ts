import { Test } from '@nestjs/testing';
import { repositoryMockFactory } from '@app/common/test-utils/functions';
import { MockType } from '@app/common/test-utils/types';
import { NotificationModule } from '@app/notification/notification.module';
import { Repository } from 'typeorm';
import { UserController } from '../user.controller';
import { Users } from '../user.entity';
import { UserService } from '../user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('User Controller', () => {
  let userController: UserController;
  /**
   * Notice: `MockType` create types for user service with optional
   * methods as jest function
   */
  let userService_mock: MockType<UserService>;
  /**
   * Notice: `MockType` create types for user repository with optional
   * methods as jest function
   */
  let userRepository_mock: MockType<Repository<Users>>;
  /**
   * Notice: `MockType` create types for **ConfigService** with optional
   * methods as jest function
   */
  let configService_mock: MockType<ConfigService>;

  beforeEach(async () => {
    /**
     * Notice: It's a best practice to only define required methods to
     * increase code quality.
     *
     * This variable should redefine in every test to prevent side-effects.
     */
    userService_mock = {};
    /**
     * Notice: `repositoryMockFactory` create a mock repository for
     * typeorm for test purpose.
     *
     * This variable should redefine in every test to prevent side-effects.
     */
    userRepository_mock = repositoryMockFactory<Users>();
    /**
     * Notice: It's a best practice to only define required methods to
     * increase code quality.
     *
     * This variable should redefine in every test to prevent side-effects.
     */
    configService_mock = {
      get: jest.fn((key) => key),
      getOrThrow: jest.fn((key) => key),
    };

    const userModule = await Test.createTestingModule({
      imports: [NotificationModule, ConfigModule],
      providers: [
        {
          // <MODULE ITSELF> mocked!
          provide: UserService,
          useValue: userService_mock,
        },
        {
          // <EXTERNAL MODULE DEPENDENCY> mocked!
          provide: ConfigService,
          useValue: configService_mock,
        },
      ],
      controllers: [UserController],
    }).compile();

    userController = userModule.get<UserController>(UserController);
  });

  /**
   * <Test Suite>
   * TEST `login`
   */
  describe('login', () => {
    /**
     * 1. Define test case
     * 2. Try to write test for all possible scenarios
     * 3. Take care of best practices
     */
    it('<SCENARIO>', async () => {
      /* test case here */
    });
  });

  /**
   * <Test Suite>
   * TEST `register`
   */
  describe('register', () => {
    /**
     * 1. Define test case
     * 2. Try to write test for all possible scenarios
     * 3. Take care of best practices
     */
    it('<SCENARIO>', async () => {
      /* test case here */
    });
  });
});
