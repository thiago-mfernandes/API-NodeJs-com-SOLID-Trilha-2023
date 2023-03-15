import { Decimal } from "@prisma/client/runtime/library";
import { afterEach, beforeEach, describe, expect, it, vi } from  "vitest";
import { CheckInUseCase } from "./check-in-use-case";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check In Use Case", () => {

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    // em um segundo momento, a aplicacao precisou de gymsRepository, entao preciso criar tbm uma academia

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Javascript Gym',
      description: '',
      latitude: -27.2092052,
      longitude: -49.6401091,
      phone: ''
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers
  })

  it("should be able to check in", async () => {
    
    //passo uma data falsa
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });  

  it("should not be able to check in twice in the same day", async () => {
    // garante ao teste que os checkins estao sendo criados nesta data
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    await expect(() => sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);

    
  }); 

  it("should not be able to check in twice but in the different days", async () => {
    // garante ao teste que os checkins estao sendo criados nesta data
    //ano-mes(index)-dia-hora-minuto-segundo
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

     const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
     })

    expect(checkIn.id).toEqual(expect.any(String));
  }); 

  it("should not be able to check in on distant gym", async () => {

    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Javascript Gym',
      description: '',
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
      phone: ''
    })
    
    //passo uma data falsa
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    
    await expect(() => 
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
    })).rejects.toBeInstanceOf(MaxDistanceError)
  });
})