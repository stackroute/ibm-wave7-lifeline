interface Donor {
    aadhar: string;
    address: Address;
    dob: string;
    email: string;
    firstName: string;
    gender: string;
    guardianList: GuardianList[];
    id: number;
    lastName: string;
    medicalInfo: MedicalInfo;
    password: string;
    phoneNumber: string;
    userType: string;
}

interface MedicalInfo {
    bloodGroup: string;
    disease: Disease;
    height: number;
    organs: Array<Organs>;
    weight: number;
}

interface Organs {
    organ: string;
    donateOrNot: boolean;
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

interface Address {
    addressLine1: string;
    addressLine2: string;
    city: string;
    pinCode: string;
    state: string;
}

interface Recepient {
    aadhar: string;
    address: Address;
    bloodGroup: string;
    dob: string;
    email: string;
    firstName: string;
    gender: string;
    id: number;
    lastName: string;
    password: string;
    phoneNumber: string;
    userType: string;
}