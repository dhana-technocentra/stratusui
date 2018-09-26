import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { InventoryService } from './../../core/services/inventory.service';
import { AppComponent } from './../../app.component';

@Component({
  selector: 'app-inventorydetails',
  templateUrl: './inventorydetails.component.html',
  styleUrls: ['./inventorydetails.component.css']
})
export class InventorydetailsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private inventoryService: InventoryService, private appComponent: AppComponent) { }

  orderId = "";
  order: any;

  ngOnInit() {
    this.appComponent.title = "Inventory";
    this.orderId = this.route.snapshot.paramMap.get("orderId");
    this.inventoryService.getOrderDetailsByOrderId(this.orderId).subscribe(data => {
      this.order = data;
      console.log(this.order);
    });
    
  }

}
