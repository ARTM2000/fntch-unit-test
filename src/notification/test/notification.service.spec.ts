import { MockType } from '@app/common/test-utils/types';
import { MailerService } from '@nestjs-modules/mailer';
import { Test } from '@nestjs/testing';
import { NotificationService } from '../notification.service';

describe('Notification Service', () => {
  let notificationService: NotificationService;

  /**
   * Notice: `MockType` create types for mailer service with optional
   * methods as jest function
   */
  let mailerService_mock: MockType<MailerService>;

  beforeEach(async () => {
    /**
     * Notice: It's a best practice to only define required methods to
     * increase code quality.
     *
     * This variable should redefine in every test to prevent side-effects.
     */
    mailerService_mock = {};

    const notificationModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        { provide: MailerService, useValue: mailerService_mock },
      ],
    }).compile();

    notificationService =
      notificationModule.get<NotificationService>(NotificationService);
  });

  /**
   * <Test Suite>
   * TEST `sendEmail` (private method)
   */
  describe('sendEmail', () => {
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
   * TEST `sendEmailForNewLogin`
   */
  describe('sendEmailForNewLogin', () => {
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
   * TEST `sendEmailForNewPost`
   */
  describe('sendEmailForNewPost', () => {
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
   * TEST `sendEmailForDeletePost`
   */
  describe('sendEmailForDeletePost', () => {
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
