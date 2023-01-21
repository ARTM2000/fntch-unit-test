import { MockType } from '@app/common/test-utils/types';
import { UserService } from '@app/user/user.service';
import { Test } from '@nestjs/testing';
import { BasicUserGuard } from '@app/common/guard/basic.guard';
import { PostController } from '../post.controller';
import { PostService } from '../post.service';

describe('Post Controller', () => {
  let postController: PostController;
  /**
   * Notice: `MockType` create types for post service with optional
   * methods as jest function
   */
  let postService_mock: MockType<PostService>;
  /**
   * Notice: `MockType` create types for user service with optional
   * methods as jest function
   */
  let userService_mock: MockType<UserService>;
  /**
   * Notice: `MockType` create types for basic user guard with optional
   * methods as jest function
   */
  let basicUserGuard_mock: MockType<BasicUserGuard>;

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
    postService_mock = {};
    /**
     * Notice: It's a best practice to only define required methods to
     * increase code quality.
     *
     * This variable should redefine in every test to prevent side-effects.
     */
    basicUserGuard_mock = {
      canActivate: jest.fn(() => true),
    };

    const postModule = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          // <MODULE ITSELF> mocked!
          provide: PostService,
          useValue: postService_mock,
        },
        {
          // <DECORATOR CLASS> mocked!
          provide: BasicUserGuard,
          useValue: basicUserGuard_mock,
        },
        {
          // <EXTERNAL MODULE DEPENDENCY> mocked!
          provide: UserService,
          useValue: userService_mock,
        },
      ],
      controllers: [PostController],
    }).compile();

    postController = postModule.get<PostController>(PostController);
  });

  /**
   * <Test Suite>
   * TEST `createPost`
   */
  describe('createPost', () => {
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
   * TEST `getUserPosts`
   */
  describe('getUserPosts', () => {
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
   * TEST `updateSinglePost`
   */
  describe('updateSinglePost', () => {
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
   * TEST `deleteSinglePost`
   */
  describe('deleteSinglePost', () => {
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
