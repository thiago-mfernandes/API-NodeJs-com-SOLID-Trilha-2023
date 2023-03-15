import { beforeEach, describe, expect, it } from  "vitest";
import { CreateGymUseCase } from "./create-gym-use-case";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Register Use Case", () => {

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  })

  it("should be able to create a gym", async () => {
    
    const { gym } = await sut.execute({
      title: 'Javascript Gym',
      latitude: -27.2092052,
      longitude: -49.6401091,
      description: null,
      phone: null,
    });

    expect(gym.id).toEqual(expect.any(String));

  });
})