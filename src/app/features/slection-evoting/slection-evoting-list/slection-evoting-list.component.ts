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
import { DetailCtvComponent } from '../../slection-management/slection-management-list/detail-ctv/detail-ctv.component';
import { ProceedEvotingComponent } from '../proceed-evoting/proceed-evoting.component';

@Component({
  selector: 'app-slection-evoting-list',
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
    DetailCtvComponent,
    ProceedEvotingComponent
  ],
  templateUrl: './slection-evoting-list.component.html',
  styleUrl: './slection-evoting-list.component.scss'
})
export class SlectionEvotingListComponent {
  public isLoading: boolean = false;
  public isVisibleDetail: boolean = false;
  public isVisibleEvoting: boolean = false;
  public idCtv: any = '';
  public idEvoting: any = '';
  public nameEvoting: any = '';
  public mode: 'create' | 'edit' = 'create';
  public totalCount: number = 10;
  public idSlectionManagement: any = '';
  public listUserManagements: any = [];
  public listStatus: any = [
    {
      label: 'Tất cả',
      value: 0
    },
    {
      label: 'Đang hoạt động',
      value: 1
    },
    {
      label: 'Hết hạn',
      value: 2
    },
  ];
  public listSlection: any = [
    {
      id: '1',
      fullName: 'Bầu cử chủ tịch nước Việt Nam, Quốc hội khóa XV',
      array: [
        {
          id: 'A',
          fullName: 'Array 1',
        },
        {
          id: 'B',
          fullName: 'Array 2',
        },
        {
          id: 'C',
          fullName: 'Array 3',
        },
        {
          id: 'D',
          fullName: 'Array 4',
        },
        {
          id: 'A',
          fullName: 'Array 1',
        },
        {
          id: 'B',
          fullName: 'Array 2',
        },
        {
          id: 'C',
          fullName: 'Array 3',
        },
        {
          id: 'D',
          fullName: 'Array 4',
        },
        {
          id: 'A',
          fullName: 'Array 1',
        },
        {
          id: 'B',
          fullName: 'Array 2',
        },
        {
          id: 'C',
          fullName: 'Array 3',
        },
        {
          id: 'D',
          fullName: 'Array 4',
        },
      ],
      email: '',
    },
    {
      id: '2',
      fullName: 'Bầu cử Tổng thống Mỹ',
      email: '',
    }
  ]
  public searchQuery: string = '';
  public role: string;
  public params = {
    page: 1,
    pageSize:10
  }

  form: FormGroup = this.fb.group({
    name: [''],
    status: [null],
  });


  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private managermentService: ManagermentService,
  ){}
  
  ngOnInit(): void {
    
  }

  viewListLevelManager() {
    this.isLoading = true;
    this.managermentService.getAllManagementOwner(this.params.page, this.params.pageSize).subscribe(res => {
      this.isLoading = false;
      // this.listUserManagements = res.data;
      this.totalCount = res.totalItems;
    })
  }

  openEvotingPopup(id: string, name?: string) {
    this.idEvoting = id;
    this.nameEvoting = name;
    this.isVisibleEvoting = true;
  }

  handleChangeVotingVisible(data: any) {
    this.isVisibleEvoting = data.visible;
  }

  openDetailPopup(id?: string) {
    this.isVisibleDetail = true;
    this.idCtv = id;
  }
  handleChangeDetailVisible(data: any) {
    this.isVisibleDetail = data.visible;
  }

  handleCancel() {
    this.form.reset({ emitEvent: true });
    this.handleSearch();
  }

  handleSearch() {

  }

  changePage(e: number) {
    this.params.page = e;
    this.viewListLevelManager();
  }
  changePageSize(e: number) {
    this.params.pageSize = e;
    this.viewListLevelManager();
  }
}