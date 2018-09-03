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
  orderSummaries: OrderSummary[] = [];
  //orderSummary: OrderSummary;
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
    const companyId = (queryParms.companyId) ? queryParms.companyId : null;

    if (queryParms.orderId) {
      this.orderService.getOrderSummaryByOrderId(orderId)
        .subscribe(data => {
          this.orderSummaryForm.setValue(data);
          this.orderSummaries.push(this.getOrderSymmaryData(data));
          console.log('order summary', this.orderSummaryForm);
        });
    } else if (queryParms.companyId) {
      this.orderService.getOrderSummariesByCompanyId(companyId)
        .subscribe(data => {
          //this.orderSummaryForm.setValue(data);
          this.getOrderSummaries(data);
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

  getOrderSummaries(data){
    Object.keys(data).forEach( index => {
      console.log("push before orderSummaryData", data[index]);
      let orderSummary = this.getOrderSymmaryData(data[index]);
      this.orderSummaries.push(orderSummary);
      console.log("push ordersummary", orderSummary);
    })
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





