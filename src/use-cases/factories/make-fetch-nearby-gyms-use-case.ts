import { PrismaGymsRepository } from "@/repositories/prisma/primsa-gyms-repository";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms-use-case";

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsUseCase(gymsRepository);

  return useCase;
}