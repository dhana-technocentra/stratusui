export class OrderDetail {
    extendedDeMarc: string;
    routerPassword: string;
    providerDNS: string;
    dnsNotes: string;
    routerIncluded: string;
    lecCircuitId: string;
    providedBy: string;
    carrierCuitId: string;
    lecCircuitIdZ: string;
    providedByZ: string;
    serIpFromCarrier: string;
    custSerIpFromCarrier: string;
    ipReceivedFromCarrier: string;

    constructor(extendedDeMarc: string,
        routerPassword: string,
        providerDNS: string,
        dnsNotes: string,
        routerIncluded: string,
        lecCircuitId: string,
        providedBy: string,
        carrierCuitId: string,
        lecCircuitIdZ: string,
        providedByZ: string,
        serIpFromCarrier: string,
        custSerIpFromCarrier: string,
        ipReceivedFromCarrier: string){

            this.extendedDeMarc = extendedDeMarc;
            this.routerPassword = routerPassword;
            this.providerDNS = providerDNS;
            this.dnsNotes = dnsNotes;
            this.routerIncluded = routerIncluded;
            this.lecCircuitId = lecCircuitId;
            this.providedBy = providedBy;
            this.carrierCuitId = carrierCuitId;
            this.lecCircuitIdZ = lecCircuitIdZ;
            this.providedByZ = providedByZ;
            this.serIpFromCarrier = serIpFromCarrier;
            this.custSerIpFromCarrier = custSerIpFromCarrier;
            this.ipReceivedFromCarrier = ipReceivedFromCarrier;

    }
}