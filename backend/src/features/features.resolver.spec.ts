import { Test, TestingModule } from '@nestjs/testing';
import { FeaturesResolver } from './features.resolver';
import { FeaturesService } from './features.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';
import { createFeature, features } from './test/utils';

describe('FeaturesResolver', () => {
  let resolver: FeaturesResolver;
  const featureServiceMock = {
    create: jest.fn(),
    getAllFeatures: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeaturesResolver,
        { provide: FeaturesService, useValue: featureServiceMock },
        {
          provide: getRepositoryToken(Feature),
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<FeaturesResolver>(FeaturesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create feature', async ()=>{
    featureServiceMock.create.mockReturnValueOnce(features)
    resolver.createFeature(createFeature)
  })

  it('should create feature', async ()=>{
    featureServiceMock.getAllFeatures.mockReturnValueOnce(features)
    resolver.getAllFeatures()
  })


});
