import { Test, TestingModule } from '@nestjs/testing';
import { FeaturesService } from './features.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';
import { FeaturesResolver } from './features.resolver';
import { createFeature, features } from './test/utils';// ... (other imports and describe block)

describe('FeaturesService', () => {
  let service: FeaturesService;
  let repository: any;
  const featureServiceRepoMock = {
    save: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeaturesResolver,
        FeaturesService,
        {
          provide: getRepositoryToken(Feature),
          useValue: featureServiceRepoMock,
        },
      ],
    }).compile();

    service = module.get<FeaturesService>(FeaturesService);
    repository = module.get(getRepositoryToken(Feature));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new feature', async () => {
      
      const createFeatureInput = {
        name: createFeature.name,
        description: createFeature.description,
      };
      featureServiceRepoMock.save.mockResolvedValue(createFeature);

      const result = await service.create(createFeatureInput);

      expect(result).toEqual(createFeature); // Ensure the result matches the input
      expect(featureServiceRepoMock.save).toHaveBeenCalledWith(createFeatureInput); // Ensure save method was called with the input
    });
  });
  

  describe('getAllFeatures', () => {
    it('should return all features from the repository', async () => {
      const mockFeatures = [createFeature, createFeature, createFeature];
      featureServiceRepoMock.find = jest.fn().mockResolvedValue(mockFeatures);

      const result = await service.getAllFeatures();

      expect(result).toEqual(mockFeatures);
      expect(featureServiceRepoMock.find).toHaveBeenCalled();
    });
  });
});

