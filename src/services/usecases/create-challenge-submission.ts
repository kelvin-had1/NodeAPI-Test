import { Submission } from "../../domain/entities/submissions";
import { ChallengesRepository } from "../repositories/ChallengeRepository";
import { StudentsRepository } from "../repositories/StudentRepository";

type CreateChallengeSubmissionRequest = {
    studentId: string;
    challengeId: string;

}

export class CreateChallengeSubmission{

    constructor(
        private studentsRepository: StudentsRepository,
        private challengeRepository: ChallengesRepository,
    ){}

    async execute({studentId, challengeId}: CreateChallengeSubmissionRequest){

        const student = await this.studentsRepository.findById(studentId)

        if(!student){
            throw new Error('Student does not exists.')
        }

        const challenge = await this.challengeRepository.findById(challengeId)

        if(!challenge){
            throw new Error('Challenge does not exists.')
        }


        const submission = Submission.create({
            studentId,
            challengeId,
        })

        return submission;
    }

}