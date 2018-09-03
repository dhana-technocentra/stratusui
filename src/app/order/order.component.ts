import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../core';
import { OrderService } from './order.service';
import { OrderSummary, LocationInfo } from './../core/models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderSummaryForm: FormGroup;
  orderSummary: OrderSummary;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private alertService: AlertService) { }

  ngOnInit() {

    this.orderSummaryForm = this.getFormGroup();

    const queryParms = this.route.snapshot.queryParams;
    const orderId = (queryParms.orderId) ? queryParms.orderId : null;

    if (queryParms.orderId) {
      this.orderService.getOrderSummaryByOrderId(orderId)
        .subscribe(data => {
          this.orderSummaryForm.setValue(data);
          this.orderSummary = this.getOrderSymmaryData(data);
          console.log('order summary', this.orderSummaryForm);
        });
    }
  }

  getFormGroup() {
    return this.formBuilder.group({
      accountNumber: [''],
      bandwidth: [''],
      companyName: [''],
      headLocation:
        this.formBuilder.group({
          address: [''],
          city: [''],
          state: [''],
          zip: [''],
          npa: [''],
          nxx: [''],
          name: ['']
          /*contactPhone: [''],
          contactExtension: [''],
          contactCell: [''],
          firstName:	[''],
          lastName:	[''] */
        }),
      mediaType: [''],
      orderSerId: [''],
      orderServiceCountry: [''],
      orderServiceState: [''],
      ponNumber: [''],
      serviceCategory: ['']
    });
  }

  getOrderSymmaryData(data) {

    var locationInfo: LocationInfo = new LocationInfo(data['address'],
      data['city'],
      data['state'],
      data['zip'],
      data['npa'],
      data['nxx'],
      data['name'],
      data['contactPhone'],
      data['contactExtension'],
      data['contactCell'],
      data['firstName'],
      data['lastName']
    );

    return new OrderSummary(data['serviceCategory'], data['mediaType'],
      data['bandwidth'],
      locationInfo,
      data['ponNumber'],
      data['orderSerId'],
      data['accountNumber'],
      data['companyName'],
      data['orderServiceState'],
      data['orderServiceCountry']);
  }

}





