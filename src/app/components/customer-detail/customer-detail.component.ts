import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/customer.service';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  public departments = [
    { id: 3, value: 'Health Care' },
    { id: 2, value: 'Nursing' },
    { id: 3, value: 'Engineering' }];

  constructor(private service: CustomerService, public dialogRef: MatDialogRef<CustomerDetailComponent>) { }

  ngOnInit() {
    this.service.initializeForm();
    this.service.getCustomer();
  }

  public onSubmit() {
    if (!this.service.form.get('$key').value) {
      this.service.insertEmployee(this.service.form.value);
    } else {
      this.service.updateEmployee(this.service.form.value);
    }
    this.onClose();
  }

  public onCancel() {
    this.service.form.reset();
  }

  public onClose() {
    this.service.form.reset();
    this.dialogRef.close();
  }
}
