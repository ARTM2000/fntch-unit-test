import { MockType } from '@app/common/test-utils/types';
import { UserService } from '@app/user/user.service';
import { Test } from '@nestjs/testing';
import { PostController } from '../post.controller';
import { PostService } from '../post.service';
import { NotificationService } from '@app/notification/notification.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { repositoryMockFactory } from '@app/common/test-utils/functions';
import { Repository } from 'typeorm';

describe('Post Service', () => {
  let postService: PostService;
  /**
   * Notice: `MockType` create types for user service with optional
   * methods as jest function
   */
  let userService_mock: MockType<UserService>;
  /**
   * Notice: `MockType` create types for user service with optional
   * methods as jest function
   */
  let notificationService_mock: MockType<NotificationService>;
  /**
   * Notice: `MockType` create types for post repository with optional
   * methods as jest function
   */
  let postRepository_mock: MockType<Repository<Post>>;

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
    postRepository_mock = repositoryMockFactory<Post>();

    const postModule = await Test.createTestingModule({
      imports: [],
      providers: [
        PostService,
        {
          // <EXTERNAL MODULE DEPENDENCY> mocked!
          provide: UserService,
          useValue: userService_mock,
        },
        {
          // <EXTERNAL MODULE DEPENDENCY> mocked!
          provide: NotificationService,
          useValue: notificationService_mock,
        },
        {
          provide: getRepositoryToken(Post),
          useValue: postRepository_mock,
        },
      ],
      controllers: [PostController],
    }).compile();

    postService = postModule.get<PostService>(PostService);
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
   * TEST `getSinglePost`
   */
  describe('getSinglePost', () => {
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
   * TEST `deletePost`
   */
  describe('deletePost', () => {
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
