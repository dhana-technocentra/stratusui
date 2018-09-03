export class Incident {
    incidentLogGUID: string;
    incidentID: number;
    attachmentFileType: string;
    createdByFullName: string;
    createDate: string;
    logType: string;
    logTypeDescription: string;
    billable: string;
    publish: string;
    longText: string;
    minutesSpent: string;
    attachmentFileName: string;
    createdByType: string;

    constructor(incidentLogGUID: string,
        incidentID: number,
        attachmentFileType: string,
        createdByFullName: string,
        createDate: string,
        logType: string,
        logTypeDescription: string,
        billable: string,
        publish: string,
        longText: string,
        minutesSpent: string,
        attachmentFileName: string,
        createdByType: string){

this.incidentLogGUID=incidentLogGUID;
this.incidentID=incidentID;
this.attachmentFileType=attachmentFileType;
this.createdByFullName=createdByFullName;
this.createDate=createDate;
this.logType=logType;
this.logTypeDescription=logTypeDescription;
this.billable=billable;
this.publish=publish;
this.longText=longText;
this.minutesSpent=minutesSpent;
this.attachmentFileName=attachmentFileName;
this.createdByType=createdByType;

    }
}