import { MedicalDetails } from '../model/medicalDetails';

export class Donor {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dob: string;
    medicalDetails: MedicalDetails;

}
