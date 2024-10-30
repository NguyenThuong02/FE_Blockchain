import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { phoneNumberValidator } from '../../shared/validate/check-phone-number.directive';
import { rePassValidator } from '../../shared/validate/check-repass.directive';
import { AuthService } from '../../core/api/auth.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { passWordValidator } from '../../shared/validate/check-password.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NzModalModule,
    NzIconModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NzSelectModule,
    TranslateModule,
    NzButtonModule,
    MatInputModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  isConfirmLoading = false;
  @Input() isVisiblePopUpRegister: boolean = false;
  @Output() isVisiblePopUpOpen = new EventEmitter<any>();
  registerSuccess: string;
  notify: string;
  AlerPhoneNumber: string;
  AlerEmail: string;
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisiblePopUpOpen.emit(false);
  }
  size: NzSelectSizeType = 'default';
  handleCancel(): void {
    this.form.reset();
    this.isVisiblePopUpOpen.emit(false);
  }
  memberList = [
    {
      label: 'Member 1',
      value: 1,
    },
    {
      label: 'Member 2',
      value: 2,
    },
    {
      label: 'Member 3',
      value: 3,
    },
  ];
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private modal: NzModalService,
    private translate: TranslateService,
    private authService: AuthService,
  ) {}
  _snack = inject(SnackbarService);
  public form: FormGroup = this.fb.group({
    username: [null, Validators.required],
    fullName: [null, Validators.required],
    phoneNumber: [null, [phoneNumberValidator()]],
    password: [null, [Validators.required, passWordValidator()]],
    rePass: [null, Validators.required],
    email: [null, Validators.email],
  });
  ngOnInit(): void {
    this.form
      .get('rePass')
      ?.addValidators(rePassValidator(this.form.get('password')?.value));

    this.translate
      .get('Toast.notify')
      .subscribe((value) => (this.notify = value));
    this.translate
      .get('Toast.AlerEmail')
      .subscribe((value) => (this.AlerEmail = value));
    this.translate
      .get('Toast.AlerPhoneNumber')
      .subscribe((value) => (this.AlerPhoneNumber = value));
    this.translate
      .get('Toast.registerSuccess')
      .subscribe((value) => (this.registerSuccess = value));
    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('Toast.notify')
        .subscribe((value) => (this.notify = value));
      this.translate
        .get('Toast.AlerEmail')
        .subscribe((value) => (this.AlerEmail = value));
      this.translate
        .get('Toast.AlerPhoneNumber')
        .subscribe((value) => (this.AlerPhoneNumber = value));
      this.translate
        .get('Toast.registerSuccess')
        .subscribe((value) => (this.registerSuccess = value));
    });
  }
  register(): void {
    const body = {
      userName: this.form.get('username')?.value,
      fullName: this.form.get('fullName')?.value,
      phoneNumber: this.form.get('phoneNumber')?.value,
      password: this.form.get('password')?.value,
      repassword: this.form.get('rePass')?.value,
      email: this.form.get('email')?.value,
    };
    if (this.form.invalid) {
      this.form.get('username')?.markAsTouched();
      this.form.get('fullName')?.markAsTouched();
      this.form.get('phoneNumber')?.markAsTouched();
      this.form.get('password')?.markAsTouched();
      this.form.get('rePass')?.markAsTouched();
      this.form.get('email')?.markAsTouched();
      return;
    }
    this.authService.register(body).subscribe((data) => {
      this._snack.success(this.registerSuccess);
      this.form.reset();
    });
    this.isVisiblePopUpOpen.emit(false);
  }
  updateValidateRepass(e: any) {
    this.form.get('rePass')?.clearValidators();
    this.form.get('rePass')?.addValidators(rePassValidator(e.target.value));
  }
  hidePass: boolean = true;
  hideRePass: boolean = true;
  showPass(e: any) {
    const inputPass = document.querySelector(
      '#inputPassRegister',
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
      '#inputRePassRegister',
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
