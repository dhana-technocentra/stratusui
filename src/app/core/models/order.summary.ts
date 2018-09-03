import { LocationInfo } from './location.info';

export class OrderSummary {
    serviceCategory: string;
    mediaType: string;
    bandwidth: number;
    headLocation: LocationInfo;
    ponNumber: string;
    orderSerId: number;
    accountNumber: number;
    companyName: string;
    orderServiceState: string;
    orderServiceCountry: string;

    constructor(serviceCategory: string,
        mediaType: string,
        bandwidth: number,
        headLocation: LocationInfo,
        ponNumber: string,
        orderSerId: number,
        accountNumber: number,
        companyName: string,
        orderServiceState: string,
        orderServiceCountry: string)
        {
            this.serviceCategory = serviceCategory;
            this.mediaType =  mediaType;
            this.bandwidth = bandwidth;
            this.headLocation = headLocation;
            this.ponNumber = ponNumber;
            this.orderSerId = orderSerId;
            this.accountNumber = accountNumber;
            this.companyName = companyName;
            this.orderServiceState = orderServiceState;
            this.orderServiceCountry = orderServiceCountry;
        }

    
}