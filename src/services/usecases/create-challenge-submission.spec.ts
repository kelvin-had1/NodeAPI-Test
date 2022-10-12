import { InMemoryChallengesRepository } from "../../../tests/repositorioes/in-memory-challenges-repository";
import { InMemoryStudentsRepository } from "../../../tests/repositorioes/in-memory-students-repository";
import { Challenge } from "../../domain/entities/challenge";
import { Student } from "../../domain/entities/students";
import { CreateChallengeSubmission } from "./create-challenge-submission"


describe('Create challenge submission use case', () => {
    it('should be able to create a new chalenge submission', async () =>{

        const studentsRepository = new InMemoryStudentsRepository();
        const challengeRespository = new InMemoryChallengesRepository();

        const student = Student.create({
            name: 'Kelvin Mendes',
            email: 'kelvinmendes900@gmail.com'
        })

        const challenge = Challenge.create({
            title: 'Criar uma API com testes',
            instructionUrl: 'https://google.com'
        })

        studentsRepository.items.push(student);
        challengeRespository.items.push(challenge);


        const sut = new CreateChallengeSubmission(
            studentsRepository,
            challengeRespository,
            );

        const response = await sut.execute({
            studentId: student.id,
            challengeId: challenge.id,
        })
        

        expect(response).toBeTruthy()
    })
})