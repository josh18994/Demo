import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { CustomerService } from 'src/app/shared/customer.service';
import { CustomerDetailComponent } from '../customer-detail/customer-detail.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  public displayedColumns: string[] = ['fullName', 'email', 'mobile', 'city', 'departmentName', 'actions'];
  public listData: MatTableDataSource<any>;
  public searchKey: string;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private service: CustomerService, private dialog: MatDialog) { }

  ngOnInit() {
    this.service.getCustomer().subscribe(
      list => {
        const array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }
    );
  }

  public onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  public applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  public onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CustomerDetailComponent, dialogConfig);
  }

  onEdit(row) {
    console.log(row);
    this.service.initializeForm();
    this.service.form.setValue(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CustomerDetailComponent, dialogConfig);
  }

  onDelete($key) {
    if (confirm('Are you sure to delete this record ?')) {
    this.service.deleteEmployee($key);
    }
  }

}
