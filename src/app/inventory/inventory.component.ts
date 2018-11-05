import { Component, OnInit, ChangeDetectorRef, ViewChild, HostListener } from '@angular/core';
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
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSort, MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router: Router, private inventoryService: InventoryService, private appComponent: AppComponent, private userService: UserService, private spinnerService: Ng4LoadingSpinnerService, private changeDetector: ChangeDetectorRef) { }

  userProfile: any;
  companyId: any;
  orders: any;
  columnsToDisplay = ["Category", "Service Media", "Head Location", "Remote Location", "PON Number"];
  length = 0;
  pageSize = 1;
  pageSizeOptions = [1, 2, 3];
  pageEvent: PageEvent;
  sortField = "expiration_date";
  sortOrder = "DESC";
  pageIndex = 0;
  dataLoaded = false;
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    if (window.innerWidth <= 767) {
      this.appComponent.title = "Stratus Inventory";
    } else {
      this.appComponent.title = "Inventory";
    }
    this.spinnerService.show();
    this.userService.getUserProfile()
      .subscribe(data => {
        this.userProfile = data;
        this.companyId = this.userProfile.companyId;
        this.inventoryService.getOrdersByCompanyId(this.companyId).subscribe(data => {
          this.orders = data;
          this.dataSource = new MatTableDataSource(this.orders);
          this.dataSource.sort = this.sort;
          this.length = this.orders.length;
          this.dataLoaded = true;
          this.spinnerService.hide();
        });
      });
  }

  setPageSizeOptions(setPageSizeOptionsInput: any) {
    this.pageIndex = setPageSizeOptionsInput.pageIndex;
    this.pageSize = setPageSizeOptionsInput.pageSize;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth <= 767) {
      this.appComponent.title = "Stratus Inventory";
    } else {
      this.appComponent.title = "Inventory";
    }
  }

  navigateToInventoryDetails(id) {
    console.log(id);
    this.router.navigate(['/inventorydetails', { orderId: id }]);
  }

  sortData(sort: Sort) {
    this.spinnerService.show();
    this.orders = this.orders.sort((a, b) => {
      const isAsc = sort.direction === 'asc' ? true : false;
      switch (sort.active) {
        case 'Category': return this.compare(a.serviceCategory, b.serviceCategory, isAsc);
        case 'Service Media': return this.compare(a.mediaType, b.mediaType, isAsc);
        case 'PON Number': return this.compare(a.ponNumber, b.ponNumber, isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.orders);
    this.spinnerService.hide();
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }



}
