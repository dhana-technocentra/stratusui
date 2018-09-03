
export class Quote {
    firstName: string;
    lastName: string;
    companyName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    serviceType: string;
    priority: string;
    emailBody: string;

    constructor(firstName: string, lastName: string, companyName: string, phone: string, address: string, city: string, state: string, zip: string, serviceType: string, priority: string, emailBody: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.companyName = companyName;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.serviceType = serviceType;
        this.priority = priority;
        this.emailBody = emailBody;
    }
}