import { inject, injectable } from 'inversify';
import { TYPES } from '@constants/types';
import { IRentEstimationRepository } from '@domain/rentEstimation/IRentEstimationRepository';
import { RentEstimation } from '@domain/rentEstimation/RentEstimation';
import { PropertyDetails } from '@domain/rentEstimation/PropertyDetails';
import { IExternalEstimationService } from '@domain/rentEstimation/IExternalEstimationService';
import { ApplicationError } from '@core/ApplicationError';

@injectable()
export class RentEstimationApplicationService {
  constructor(
    @inject(TYPES.RentEstimationRepository) private readonly rentEstimationRepository: IRentEstimationRepository,
    @inject(TYPES.RentRangeService) private readonly rrService: IExternalEstimationService,
  ) {}

  async createRentEstimation(dto: any) {
    const { propertyInfo } = dto;
    const propertyDetails = PropertyDetails.create(propertyInfo);
    const rentEstimation = RentEstimation.create({ propertyDetails });
    await this.rentEstimationRepository.save(rentEstimation);
  }

  async submitRentEstimation(dto: any) {
    const rentEstimation = await this.rentEstimationRepository.findOneById(dto.id);

    if (!rentEstimation || !rentEstimation.propertyDetails)
      throw new ApplicationError('404', 404, 'Invalid request');

    // Payment logic here???

    const { reportLink } = await this.rrService.get(rentEstimation.propertyDetails);

    rentEstimation.setReportUrl(reportLink);

    await this.rentEstimationRepository.save(rentEstimation);
  }
}