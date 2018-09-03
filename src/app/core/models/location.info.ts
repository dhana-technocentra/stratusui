export class LocationInfo {
    address: string;
    city: string;
    state: string;
    zip: string;
    npa: number;
    nxx: number;
    name: string;
    contactPhone: string;
    contactExtension: string;
    contactCell: string;
    firstName: string;
    lastName: string;

    constructor(address: string, city: string, state: string, zip: string, npa: number, nxx: number, name: string,
        contactPhone: string, contactExtension: string, contactCell: string, firstName: string, lastName: string) {
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.npa = npa;
        this.nxx = nxx;
        this.name = name;
        this.contactPhone = contactPhone;
        this.contactExtension = contactExtension;
        this.contactCell = contactCell;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}