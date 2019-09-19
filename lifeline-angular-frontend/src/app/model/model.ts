export interface Donor {
    aadhar: string;
    address: Address;
    createdDate: string;
    dob: string;
    donorId: string;
    email: string;
    firstName: string;
    formList: FormList[];
    gender: string;
    guardianList: GuardianList[];
    id: number;
    isEmailVerified: string;
    lastName: string;
    medicalDetails: MedicalDetails;
    password: string;
    phoneNumber: string;
    userType: string;
  }
  
  interface MedicalDetails {
    bloodGroup: string;
    bodyMassIndex: number;
    disease: Disease;
    hlaType: string;
    liverAttenuationIndex: number;
    lungSize: number;
    organs: Organ[];
    plateletCount: number;
    rhFactor: number;
  }
  
  interface Organ {
    donateOrNot: boolean;
    id: number;
    name: string;
  }
  
  interface Disease {
    cancer: boolean;
    diabetes: boolean;
    fits: boolean;
    heartAttack: boolean;
    hepatitis: boolean;
    hiv: boolean;
    hyperTension: boolean;
    kidneyDisease: boolean;
    liverDisease: boolean;
    rabies: boolean;
    tuberculosis: boolean;
  }
  
  interface GuardianList {
    address: Address;
    email: string;
    name: string;
    phoneNumber: string;
    relation: string;
  }
  
  interface FormList {
    fileName: string;
    id: number;
  }
  
  interface Address {
    addressLine1: string;
    addressLine2: string;
    city: string;
    pinCode: string;
    state: string;
  }

export interface Recepient {
    organName: any;
    aadhar: string;
    address: Address;
    bloodGroup: string;
    createdDate: string;
    dob: string;
    email: string;
    firstName: string;
    gender: string;
    id: number;
    isEmailVerified: string;
    lastName: string;
    password: string;
    phoneNumber: string;
    request: Request;
    userType: string;
  }
  
  interface Request {
    id: number;
    requestedOrganList: string[];
    status: string;
  }