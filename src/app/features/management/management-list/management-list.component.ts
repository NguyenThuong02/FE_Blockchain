import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ShareTableModule } from '../../../shared/components/share-table/share-table.module';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ManagermentService } from '../../../core/api/managerment.service';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ManagementAddComponent } from '../management-add/management-add.component';

@Component({
  selector: 'app-management-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    ShareTableModule,
    RouterModule,
    NzIconModule,
    TranslateModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    ManagementAddComponent
  ],
  templateUrl: './management-list.component.html',
  styleUrl: './management-list.component.scss'
})
export class ManagementListComponent implements OnInit{
  public isLoading: boolean = false;
  public totalCount: number = 10;
  public listUserManagements : any = [];
  public role: string;
  public params = {
    page: 1,
    pageSize:10
  }

  listStatus = [
    {
      label: 'Chưa đổi mật khẩu',
      value: 0,
    },
    {
      label: 'Hoạt động',
      value: 1,
    },
    {
      label: 'Khoá',
      value: 2,
    },
  ];

  listRoles = [
    {
      label: 'Quản trị viên',
      value: 0,
    },
    {
      label: 'Người dùng thường',
      value: 1,
    }
  ];

  form: FormGroup = this.fb.group({
    fullName: [''],
    email: [null],
    cellPhone: [null],
    createdDate: [null],
    status: [null],
    roles: [null],
  });


  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private managermentService: ManagermentService,
  ){}
  
  ngOnInit(): void {
    
  }

  viewListUserManager() {
    this.isLoading = true;
    this.managermentService.getAllManagementOwner(this.params.page, this.params.pageSize).subscribe(res => {
      this.isLoading = false;
      this.listUserManagements = res.data;
      this.totalCount = res.totalItems;
    })
  }

  viewListUserTenant() {
    this.isLoading = true;
    this.managermentService.getAllManagementTenant(this.params.page, this.params.pageSize).subscribe(res => {
      this.isLoading = false;
      this.listUserManagements = res.data;
      this.totalCount = res.totalItems;
    })
  }

  isVisiblePopUpAddManagement: boolean = false;
  handelVisiblePopUpAddManagement(e: boolean) {
    this.isVisiblePopUpAddManagement = e;
  }
  handelOpenPopUpAddManagement() {
    this.isVisiblePopUpAddManagement = true;
  }

  isVisiblePopUpEditManagement: boolean = false;
  handelVisiblePopUpEditManagement(e: boolean) {
    this.isVisiblePopUpEditManagement = e;
  }
  handelOpenPopUpEditManagement(id: string) {
    console.log("Id: ", id)
    this.isVisiblePopUpEditManagement = true;
  }

  handleCancel() {
    this.form.reset({ emitEvent: true });
    this.handleSearch();
  }

  handleSearch() {

  }

  changePage(e: number) {
    this.params.page = e;
    this.viewListUserManager();
  }
  changePageSize(e: number) {
    this.params.pageSize = e;
    this.viewListUserManager();
  }
}
