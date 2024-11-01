import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  selector: 'app-level-management-add',
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
  templateUrl: './level-management-add.component.html',
  styleUrl: './level-management-add.component.scss'
})
export class LevelManagementAddComponent implements OnInit{
  @Input() isVisiblePopUpAddLevelManagement: boolean = true;
  @Input() idLevelManagement: any;
  @Output() visiblePopUpAddLevelManagement = new EventEmitter<boolean>();
  public hideOldPass: boolean = true;
  public hidePass: boolean = true;
  public hideRePass: boolean = true;

  listStatus = [
    {
      label: 'Hoạt động',
      value: true,
    },
    {
      label: 'Bị khoá',
      value: false,
    }
  ];

  public form: FormGroup = this.fb.group({
    levelName: [null, Validators.required],
    description: [null],
    status: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private modal: NzModalService,
    private message: NzMessageService,
    private managermentService: ManagermentService,
  ) {}
  ngOnInit(): void {
    this.form.controls['isAdmin'].disable();
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
        this.visiblePopUpAddLevelManagement.emit(false);
      }
    }, (err) => {
      const errorMessage = err.error ? err.error.split('|')[1] : 'Có lỗi xảy ra';
      this.message.error(errorMessage);
    })
  }

  handleCancel(): void {
    this.visiblePopUpAddLevelManagement.emit(false);
  }

  updateValidateRepass(e: any) {
    this.form.get('rePass')?.clearValidators();
    this.form.get('rePass')?.addValidators(rePassValidator(e.target.value));
  }
  showOldPass(e: any) {
    const inputPass = document.querySelector(
      '#inputPassChangeOldPassword',
    ) as HTMLInputElement;
    if (inputPass?.type === 'password') {
      inputPass.type = 'text';
      this.hideOldPass = false;
    } else {
      inputPass.type = 'password';
      this.hideOldPass = true;
    }
  }
  showPass(e: any) {
    const inputPass = document.querySelector(
      '#inputPassChangePassword',
    ) as HTMLInputElement;
    if (inputPass?.type === 'password') {
      inputPass.type = 'text';
      this.hidePass = false;
    } else {
      inputPass.type = 'password';
      this.hidePass = true;
    }
  }
  showRePass(e: any) {
    const inputPass = document.querySelector(
      '#inputRePassChangePassword',
    ) as HTMLInputElement;
    if (inputPass?.type === 'password') {
      inputPass.type = 'text';

      this.hideRePass = false;
    } else {
      inputPass.type = 'password';
      this.hideRePass = true;
    }
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
