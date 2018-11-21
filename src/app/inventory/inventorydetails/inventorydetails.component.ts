import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { InventoryService } from './../../core/services/inventory.service';
import { AppComponent } from './../../app.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-inventorydetails',
  templateUrl: './inventorydetails.component.html',
  styleUrls: ['./inventorydetails.component.css']
})
export class InventorydetailsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private inventoryService: InventoryService, private appComponent: AppComponent, private spinnerService: Ng4LoadingSpinnerService) { }

  orderId = "";
  order: any;
  orderInfo: any;
  dataLoaded: boolean;
  orderPhoneInfo: any;
  phoneStringArray: string;

  ngOnInit() {
    this.appComponent.title = "Inventory";
    this.spinnerService.show();
    this.orderId = this.route.snapshot.paramMap.get("orderId");
    this.inventoryService.getOrderDetailsByOrderId(this.orderId).subscribe(data => {
      this.inventoryService.getOrderDetailById(this.orderId).subscribe(orderData => {
        this.inventoryService.getOrderPhone(this.orderId).subscribe(orderPhoneData => {
          console.log(orderPhoneData);
          this.order = data;
          this.orderInfo = orderData;
          this.orderPhoneInfo = orderPhoneData;
          this.phoneStringArray = this.orderPhoneInfo.map(function(obj){
            return obj.number;
          }).join("<br>");
          this.dataLoaded = true;
          this.spinnerService.hide();
        })
      });
    });

  }

}
