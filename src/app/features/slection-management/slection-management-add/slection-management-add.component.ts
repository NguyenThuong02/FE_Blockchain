import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalComponent, NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ManagermentService } from '../../../core/api/managerment.service';
import { rePassValidator } from '../../../shared/validate/check-repass.directive';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-slection-management-add',
  standalone: true,
  imports: [
    FormsModule,
    MatInput,
    MatLabel,
    CommonModule,
    NzModalComponent,
    NzModalModule,
    NzIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    TranslateModule,
    NzButtonModule,
    NzPopconfirmModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  templateUrl: './slection-management-add.component.html',
  styleUrl: './slection-management-add.component.scss'
})
export class SlectionManagementAddComponent implements OnInit, OnChanges{
  @Input() isVisiblePopUpAddSlectionManagement: boolean = true;
  @Input() idSlectionManagement: any;
  @Input() mode: 'create' | 'edit';
  @Output() visiblePopUpAddSlectionManagement = new EventEmitter<boolean>();
  public edit: boolean = false;
  public listCandidate: any = [];
  public listVoter: any = [];

  listLevel = [
    {
      label: 'Chức vụ 1',
      value: 0,
    },
    {
      label: 'Chức vụ 2',
      value: 1,
    },
    {
      label: 'Chức vụ 3',
      value: 2,
    },
  ];

  public form: FormGroup = this.fb.group({
    name: [''],
    position: [0],
    number: [null],
    startDateSlection: [''],
    endDateSlection: [''],
    term: [''],
    startDateTerm: [''],
    endDateTerm: [''],
    candidates: [[]],
    voters: [[]],
  });

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private modal: NzModalService,
    private message: NzMessageService,
    private managermentService: ManagermentService,
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idSlectionManagement']) {
      this.viewListUser();
      this.setupFormListeners();
      if(this.idSlectionManagement && this.mode === 'edit') {
        this.edit = true;
      } else {
        this.edit = false;
        this.form.reset(); 
      }
    }
  }
  ngOnInit(): void {
    this.viewListUser();
    this.setupFormListeners();
    this.form.controls['isAdmin'].disable();
    if(this.idSlectionManagement && this.mode === 'edit') {
      this.edit = true;
    } else {
      this.edit = false;
      this.form.reset(); 
    }
  }

  viewListUser() {
    this.managermentService.getAllManagement(1, 999).subscribe(res => {
      this.listCandidate = res.data;
      this.listVoter = res.data;
      this.updateFilteredLists();
    });
  }
  filteredCandidates: any = [];
  filteredVoters: any = [];
  setupFormListeners() {
    this.form.get('candidates')?.valueChanges.subscribe(() => this.updateFilteredLists());
    this.form.get('voters')?.valueChanges.subscribe(() => this.updateFilteredLists());
  }

  updateFilteredLists() {
    const selectedCandidates = this.form.get('candidates')?.value || [];
    const selectedVoters = this.form.get('voters')?.value || [];

    this.filteredCandidates = this.listCandidate.filter((candidate: any) => !selectedVoters.includes(candidate.id));
    this.filteredVoters = this.listVoter.filter((voter: any) => !selectedCandidates.includes(voter.id));

    this.cdr.markForCheck();
  }

  handleOk(): void {
    const body = {
      userName: this.form.get('username')?.value,
      fullName: this.form.get('fullName')?.value,
      cellPhone: this.form.get('cellPhone')?.value,
      identityCardNumber: this.form.get('identityCardNumber')?.value,
      identityCardDate: this.form.get('identityCardDate')?.value,
      identityCardPlace: this.form.get('identityCardPlace')?.value,
      email: this.form.get('email')?.value,
      address: this.form.get('address')?.value,
      birthday: this.form.get('birthday')?.value,
      gender: this.form.get('gender')?.value,
      isAdmin: this.form.get('isAdmin')?.value,
    };
    if (this.form.invalid) {
      this.form.get('username')?.markAsTouched();
      this.form.get('fullName')?.markAsTouched();
      this.form.get('identityCardNumber')?.markAsTouched();
      this.form.get('identityCardDate')?.markAsTouched();
      this.form.get('identityCardPlace')?.markAsTouched();
      this.form.get('cellPhone')?.markAsTouched();
      this.form.get('address')?.markAsTouched();
      this.form.get('birthday')?.markAsTouched();
      this.form.get('gender')?.markAsTouched();
      this.form.get('email')?.markAsTouched();
      return;
    }
    this.managermentService.addAccountManagementOwner(body).subscribe(res => {
      if(res) {
        this.message.success("Tạo tài khoản thành công")
        this.visiblePopUpAddSlectionManagement.emit(false);
      }
    }, (err) => {
      const errorMessage = err.error ? err.error.split('|')[1] : 'Có lỗi xảy ra';
      this.message.error(errorMessage);
    })
  }

  handleEdit(): void {}

  handleCancel(): void {
    this.visiblePopUpAddSlectionManagement.emit(false);
  }

  updateValidateRepass(e: any) {
    this.form.get('rePass')?.clearValidators();
    this.form.get('rePass')?.addValidators(rePassValidator(e.target.value));
  }

  confirmModal?: NzModalRef;
  showAlerPhoneNumber(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Thông báo',
      nzContent:
        'Bạn không thể xác minh tài khoản thông qua số điện thoại nếu bỏ trống',
      nzOnOk: () => {},
    });
  }
  showAlerEmail(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Thông báo',
      nzContent:
        'Bạn không thể xác minh tài khoản thông qua email nếu bỏ trống',
      nzOnOk: () => {},
    });
  }
  handleConfirmEmail() {
    console.log('confirm email');
  }
}
