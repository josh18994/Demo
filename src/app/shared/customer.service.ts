import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public employeeList: AngularFireList<any>;
  public form: FormGroup;
  constructor(private firebase: AngularFireDatabase) { }

  public initializeForm() {
    if (this.form === undefined) {
      this.form = new FormGroup({
        $key: new FormControl(null),
        fullName: new FormControl(''),
        email: new FormControl(''),
        mobile: new FormControl(''),
        city: new FormControl(''),
        gender: new FormControl('1'),
        department: new FormControl(0),
        hireDate: new FormControl(''),
        isPermanent: new FormControl(false)
      });
    }
  }

  public getCustomer() {
    this.employeeList = this.firebase.list('employees');
    return this.employeeList.snapshotChanges();
  }

  public insertEmployee(employee) {
    this.employeeList.push({
      fullName: employee.fullName,
      email: employee.email,
      mobile: employee.mobile,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      isPermanent: employee.isPermanent
    });
  }

  updateEmployee(employee) {
    this.employeeList.update(employee.$key,
      {
        fullName: employee.fullName,
        email: employee.email,
        mobile: employee.mobile,
        city: employee.city,
        gender: employee.gender,
        department: employee.department,
        isPermanent: employee.isPermanent
      });
  }

  deleteEmployee($key: string) {
    this.employeeList.remove($key);
  }
}


