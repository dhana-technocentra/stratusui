import { HttpHeaders } from "@angular/common/http";

export class BaseService {

    constructor(){}

    public getHeaders() {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return headers;
      }
    
      public  getOptions() {
        //const options = new RequestOptions({ headers: this.getHeaders() });
        return { headers: this.getHeaders() };
      }
}