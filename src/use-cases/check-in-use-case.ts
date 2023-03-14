import { CheckInsRepository } from "@/repositories/prisma/check-ins-repository-interface";
import { GymsRepositoryInterface } from "@/repositories/prisma/gyms-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { CheckIn } from "@prisma/client";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CheckinUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckinUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepositoryInterface,
  ) {}

  async execute({ 
    gymId, 
    userId,
    userLatitude,
    userLongitude 
  }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {

    const gym = await this.gymsRepository.findById(gymId);

    if(!gym) {
      throw new ResourceNotFoundError();      
    }

    // calculate dustance between user and gym
    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1; 

    if( distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError();
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if(checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError();
      
    }
    
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}