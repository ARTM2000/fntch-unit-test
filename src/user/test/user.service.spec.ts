import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '@app/common/test-utils/functions';
import { MockType } from '@app/common/test-utils/types';
import { NotificationModule } from '@app/notification/notification.module';
import { NotificationService } from '@app/notification/notification.service';
import { Repository } from 'typeorm';
import { Users } from '../user.entity';
import { UserService } from '../user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { UserController } from '../user.controller';

describe('User Service', () => {
  let userService: UserService;
  /**
   * Notice: `MockType` create types for user service with optional
   * methods as jest function
   */
  let userService_mock: MockType<UserService>;
  /**
   * Notice: `MockType` create types for notification service with optional
   * methods as jest function
   */
  let notificationService_mock: MockType<NotificationService>;
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
     * Notice: It's a best practice to only define required methods to
     * increase code quality.
     *
     * This variable should redefine in every test to prevent side-effects.
     */
    notificationService_mock = {};
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
          // <REPOSITORY> mocked!
          provide: getRepositoryToken(Users),
          useValue: userRepository_mock,
        },
        {
          // <EXTERNAL MODULES> mocked!
          provide: NotificationService,
          useValue: notificationService_mock,
        },
        {
          // <EXTERNAL MODULE DEPENDENCY> mocked!
          provide: ConfigService,
          useValue: configService_mock,
        },
      ],
    //   not required
    //   controllers: [UserController],
    }).compile();

    userService = userModule.get<UserService>(UserService);
  });

  /**
   * <Test Suite>
   * TEST `createUser`
   */
  describe('createUser', () => {
    /**
     * 1. Define test case
     * 2. Try to write test for all possible scenarios
     * 3. Take care of best practices
     */
    it('<SCENARIO>', async () => { /* test case here */ });
  });

  /**
   * <Test Suite>
   * TEST `findUserWithEmail`
   */
  describe('findUserWithEmail', () => {
    /**
     * 1. Define test case
     * 2. Try to write test for all possible scenarios
     * 3. Take care of best practices
     */
    it('<SCENARIO>', async () => { /* test case here */ });
  });

  /**
   * <Test Suite>
   * TEST `verifyUser`
   */
  describe('verifyUser', () => {
    /**
     * 1. Define test case
     * 2. Try to write test for all possible scenarios
     * 3. Take care of best practices
     */
    it('<SCENARIO>', async () => { /* test case here */ });
  });

  /**
   * <Test Suite>
   * TEST `dangerouslyCreateUserCredential`
   */
  describe('dangerouslyCreateUserCredential', () => {
    /**
     * 1. Define test case
     * 2. Try to write test for all possible scenarios
     * 3. Take care of best practices
     */
    it('<SCENARIO>', async () => { /* test case here */ });
  });

  /**
   * <Test Suite>
   * TEST `dangerouslyVerifyCredential`
   */
  describe('dangerouslyVerifyCredential', () => {
    /**
     * 1. Define test case
     * 2. Try to write test for all possible scenarios
     * 3. Take care of best practices
     */
    it('<SCENARIO>', async () => { /* test case here */ });
  });
});
