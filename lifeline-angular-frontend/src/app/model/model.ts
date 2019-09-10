export interface Donor {
    aadhar: string;
    address: Address;
    createdDate: string;
    dob: string;
    donorId: string;
    email: string;
    emailVerified: boolean;
    firstName: string;
    formList?: (FormListEntity)[] | null;
    gender: string;
    guardianList?: (GuardianListEntity)[] | null;
    id: number;
    lastName: string;
    medicalInfo: MedicalInfo;
    password: string;
    phoneNumber: string;
    userType: string;
}
export interface Address {
    addressLine1: string;
    addressLine2: string;
    city: string;
    pinCode: string;
    state: string;
}
export interface FormListEntity {
    data: string;
    fileName: string;
    id: number;
}
export interface GuardianListEntity {
    address: Address;
    email: string;
    name: string;
    phoneNumber: string;
    relation: string;
}
export interface MedicalInfo {
    bloodGroup: string;
    bodyMassIndex: number;
    disease: Disease;
    hlaType: string;
    liverAttenuationIndex: number;
    lungSize: number;
    organs?: (OrgansEntity)[] | null;
    plateletCount: number;
    rhFactor: number;
}
export interface Disease {
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
export interface OrgansEntity {
    donateOrNot: boolean;
    id: number;
    name: string;
}


export interface Recepient {
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