export interface IProfile {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    websiteUrl: string;
}

export interface IUpdateProfileResponse {
    success: boolean,
    message: string
}
