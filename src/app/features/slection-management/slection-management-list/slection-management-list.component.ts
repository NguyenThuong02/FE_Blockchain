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

@Component({
  selector: 'app-slection-management-list',
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
  ],
  templateUrl: './slection-management-list.component.html',
  styleUrl: './slection-management-list.component.scss'
})
export class SlectionManagementListComponent implements OnInit{
  public isLoading: boolean = false;
  public totalCount: number = 10;
  public idLevelManagement: any = '';
  public nameLevel: any = '';
  public selectedView: string = 'candidate'; 
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
      fullName: 'Nguyễn Văn A',
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
      fullName: 'Nguyễn Văn B',
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

  selectView(view: string): void {
    this.selectedView = view;
  }

  viewListLevelManager() {
    this.isLoading = true;
    this.managermentService.getAllManagementOwner(this.params.page, this.params.pageSize).subscribe(res => {
      this.isLoading = false;
      // this.listUserManagements = res.data;
      this.totalCount = res.totalItems;
    })
  }

  isVisiblePopUpAddLevelManagement: boolean = false;
  handelVisiblePopUpAddLevelManagement(e: boolean) {
    this.isVisiblePopUpAddLevelManagement = e;
    this.cdr.detectChanges();
  }
  handelOpenPopUpAddLevelManagement() {
    this.isVisiblePopUpAddLevelManagement = true;
    this.cdr.detectChanges();
  }

  handelOpenPopUpEditManagement(id: string) {
    this.idLevelManagement = id;
    this.isVisiblePopUpAddLevelManagement = true;
    this.cdr.detectChanges();
  }

  openDeletePopup(id?: string, name?: any) {
    this.isVisible = true;
    this.nameLevel = name;
    this.idLevelManagement = id;
  }
  isVisible: boolean = false;
  handleChangeVisible(data: any) {
    this.isVisible = data.visible;
    if (data.isSuccess == true) {
      this.viewListLevelManager();
    }
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
