import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../../core';
import { OrderService } from './../order.service';
import { OrderDetail } from './../../core/models';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderDetail: OrderDetail;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private alertService: AlertService) { }

  ngOnInit() {
    const queryParms = this.route.snapshot.queryParams;
    const orderId = (queryParms.orderId) ? queryParms.orderId : null;

    if (queryParms.orderId) {
      this.orderService.getOrderDetailByOrderId(orderId)
        .subscribe(data => {         
          this.orderDetail = this.getOrderDetail(data);
          console.log('order orderDetail', this.orderDetail);
        });
    }
  }


  getOrderDetail(data) {   

    return new OrderDetail(data['extendedDeMarc'],
    data['routerPassword'],
    data['providerDNS'],
    data['dnsNotes'],
    data['routerIncluded'],
    data['lecCircuitId'],
    data['providedBy'],
    data['carrierCuitId'],
    data['lecCircuitIdZ'],
    data['providedByZ'],
    data['serIpFromCarrier'],
    data['custSerIpFromCarrier'],
    data['ipReceivedFromCarrier']);
  }
}
