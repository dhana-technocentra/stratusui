import { Phone } from "./phone";
import { UserPermissions } from "./user.permissions";

export interface UserProfile {
    userSerId:	number;
    personSerId:	number;
    locationSerId:	number;
    companyId: number;
    userName:	string;
    isActive:	string;
    userPermissions: UserPermissions;
    registerDate:	string;
    firstName:	string;
    lastName:	string;
    email:	string;
    address:	string;
    city:	string;
    state:	string;
    zipCode:	string;
    title:	string;
    officePhone:	Phone;
    cellPhone:	Phone;
    fax:	Phone;
}