import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from './../../core';
import { OrderService } from './../order.service';

@Component({
  selector: 'app-order-phone',
  templateUrl: './order-phone.component.html',
  styleUrls: ['./order-phone.component.css']
})
export class OrderPhoneComponent implements OnInit {
  orderPhones: any[] = [];
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private alertService: AlertService) { }

  ngOnInit() {

    const queryParms = this.route.snapshot.queryParams;
    const orderId = (queryParms.orderId) ? queryParms.orderId : null;
    const phoneType = (queryParms.phoneType) ? queryParms.phoneType : null;

    if (queryParms.orderId && queryParms.phoneType) {
      this.orderService.getOrderPhoneByType(orderId,phoneType)
        .subscribe(data => {
          this.getPhoneTypesData(data);
          console.log('getPhoneTypesData', this.orderPhones);
        });
    } 

  }

  getPhoneTypesData(data)
  {
    Object.keys(data).forEach(index => {
      this.orderPhones.push({"localDialInNumber": data[index]['localDialInNumber'], "number": data[index]['number'] });
    });
  }

}
