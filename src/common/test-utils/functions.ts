import { Repository } from 'typeorm';
import { MockType } from './types';
// import { of } from 'rxjs';
// import { HttpService } from '@nestjs/axios';

export const repositoryMockFactory = <Entity = any>() => {
  const MockRepository: MockType<Repository<Entity>> = {};
  for (const functionName of Object.getOwnPropertyNames(Repository.prototype)) {
    if (['constructor', 'metadata', 'extend'].includes(functionName)) {
      continue;
    }
    MockRepository[functionName] = jest.fn();
  }

  return MockRepository;
};

/**
 * Sample of mocking httpService in nestjs
 */
/** export const httpServiceMockFactory = (): MockType<HttpService> => {
     const MockHttpService: MockType<HttpService> = {};
     const mockMethodList = ['get', 'post', 'put', 'patch', 'delete'];
     for (const method of Object.getOwnPropertyNames(HttpService.prototype)) {
       if (mockMethodList.includes(method)) {
         MockHttpService[method] = jest.fn(() => of({ data: {} }));
       }
     }
     return MockHttpService;
}; */
