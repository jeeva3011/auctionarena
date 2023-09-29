import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { userData, userInput } from './test/utils';
import * as bcrypt from 'bcrypt';
describe('UserService', () => {
  let service: UserService;
  let repository: any;
  const mockUserRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    softDelete: jest.fn(),
  };
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,
        {
          provide:getRepositoryToken(User),
          useValue:mockUserRepository
        }],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create sucessfully',async () => {
     mockUserRepository.save.mockReturnValueOnce(userData);
     await service.create(userInput);
  })
  it('should handle catch in create',async () => {
    mockUserRepository.save.mockRejectedValue(new Error('Invalid'));
    await service.create(userInput);
  })

  it('should login sucessfully',async () => {
    const data=
      {
        name: 'John Doe',
        phonenumber: '123-456-7890',
        email: 'john.doe@example.com',
        password: await bcrypt.hash('password123', 10),
        auction: [],
      }
    mockUserRepository.findOne.mockReturnValueOnce(data);
    await service.login({email: userData[0].email, password: 'password123'})
  });
  it('should return a deafult user when login fails',async () => {
    mockUserRepository.findOne.mockResolvedValue(null);

    const loginuser = {
      email: 'nonexistent@example.com',
      password: 'invalidpassword',
    };

    const result = await service.login(loginuser);

    // Check that the result is a default user
    expect(result.name).toBe('-1');
    expect(result.email).toBe('-1');
    expect(result.password).toBe('-1');
    expect(result.userid).toBe(-1);
    expect(result.phonenumber).toBe('-1');
  });
  it('should email verify sucessfully',async () => {
    mockUserRepository.findOne.mockReturnValueOnce(userData);
    await service.emailVerify('gopi@gmail.com')
  })
  it('should findall',async () => {
    mockUserRepository.find.mockReturnValueOnce(userData);
    await service.findAll()
  })
  it('should findOne',async () => {
    mockUserRepository.findOne.mockReturnValueOnce(userData);
    await service.findOne(12);
  })
  it('should update',async () => {
    mockUserRepository.findOne.mockReturnValueOnce(userData);
    mockUserRepository.save.mockReturnValueOnce(userData);
    const {name,phonenumber,...update}= userInput;
    await service.update('gopi@gmail.com',update)
  })
  it('should handle catch in update',async () => {
    mockUserRepository.findOne.mockRejectedValueOnce(new Error('Data not found'));
    const {name,phonenumber,...update}= userInput;
    await service.update('gopi@gmail.com',update)
  })

  it('should remove',async () => {
    mockUserRepository.softDelete.mockResolvedValueOnce({
      raw: {},
      affected: 1, 
      generatedMaps: []
    })
    service.remove(123)
  })
});
