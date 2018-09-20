import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { InventoryService } from './../core/services/inventory.service';
import { AppComponent } from './../../app/app.component';
import { UserService } from './../core/services/user.service';
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

  ngOnInit() {
    this.userService.getUserProfile()
    .subscribe(data => {
      this.userProfile = data;
      this.companyId = this.userProfile.companyId;
      this.inventoryService.getOrdersByCompanyId(this.companyId).subscribe(data => {
        this.orders = data;
      });
    });
  }

}
