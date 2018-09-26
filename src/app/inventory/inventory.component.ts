import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { InventoryService } from './../core/services/inventory.service';
import { AppComponent } from './../../app/app.component';
import { UserService } from './../core/services/user.service';
import { Sort } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatPaginator} from '@angular/material';
import { PageEvent } from '@angular/material';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router: Router, private inventoryService: InventoryService, private appComponent: AppComponent, private userService: UserService) { }

  userProfile: any;
  companyId: any;
  orders: any;
  columnsToDisplay = ["Category", "Service Type", "Head Location", "Remote Location", "PON Number"];
  length = 0;
  pageSize = 1;
  pageSizeOptions = [1, 2, 3];
  pageEvent: PageEvent;
  sortField = "expiration_date";
  sortOrder = "DESC";
  pageIndex = 0;

  ngOnInit() {
    this.appComponent.title = "Inventory";
    this.userService.getUserProfile()
    .subscribe(data => {
      this.userProfile = data;
      this.companyId = this.userProfile.companyId;
      this.inventoryService.getOrdersByCompanyId(this.companyId).subscribe(data => {
        this.orders = data;
        this.length = this.orders.length;
      });
    });
  }

  setPageSizeOptions(setPageSizeOptionsInput: any) {
    this.pageIndex = setPageSizeOptionsInput.pageIndex;
    this.pageSize = setPageSizeOptionsInput.pageSize;
  }

  navigateToInventoryDetails(id) {
    console.log(id);
    this.router.navigate(['/inventorydetails', { orderId: id }]);
  }

}
