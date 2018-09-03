export class SupportTicket {
ponNumber : number;
sevrityParmValue: number;
shortDescription: string;
fullDescription: string;
contactPersonName: string;
phoneNumber: string;
operationHours: string;

constructor(ponNumber : number,
    severityParmValue: number,
    shortDescription: string,
    fullDescription: string,
    contactPersonName: string,
    phoneNumber: string,
    operationHours: string){

this.ponNumber  =  ponNumber;
this.sevrityParmValue = severityParmValue;
this.shortDescription = shortDescription;
this.fullDescription = fullDescription;
this.contactPersonName = contactPersonName;
this.phoneNumber = phoneNumber;
this.operationHours = operationHours;

}

}