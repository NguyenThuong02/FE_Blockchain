import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { phoneNumberValidator } from '../../../shared/validate/check-phone-number.directive';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AddressService } from '../../../core/api/address.service';


@Component({
  selector: 'app-my-info-view',
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
    MatSelectModule,
    MatDatepickerModule,
  ],
  templateUrl: './my-info-view.component.html',
  styleUrl: './my-info-view.component.scss'
})
export class MyInfoViewComponent implements OnInit {
  requiredMsg: string = '';
  isLoadingSaveEdit: boolean = false;
  isEdit: boolean = false;
  idOwner: any;
  nameOwner: any;
  cityData: any = [];
  districtData: any = [];
  wardsData: any = [];
  public listGender: any = [
    {
      value: 0,
      label: 'Nam',
    },
    {
      value: 1,
      label: 'Nữ',
    },
  ];
  constructor(
      private fb: FormBuilder,
      private translate: TranslateService,
      private message: NzMessageService,
      private modal: NzModalService,
      private cdr: ChangeDetectorRef,
      private addressService: AddressService
  ) {
      this.translate
          .get('settings.securityTab.noEmty')
          .subscribe((value) => (this.requiredMsg = value));
      this.translate.onLangChange.subscribe((e) => {
          this.translate
              .get('settings.securityTab.noEmty')
              .subscribe((value) => (this.requiredMsg = value));
      });
     
  }
  ngOnInit(): void {
      this.form.disable();
      this.idOwner = JSON.parse(
        localStorage.getItem('id_token_claims_obj') || '{}',
      )?.sub;
      this.nameOwner = JSON.parse(
        localStorage.getItem('id_token_claims_obj') || '{}',
      )?.name;
      this.getCity();
  }
  
  handleEdit(): void {
      this.isEdit = !this.isEdit
      if( this.isEdit ){
          this.form.enable()
      } else {
          this.form.disable();
      }
  }
  public form: FormGroup = this.fb.group({
      fullName: [null, Validators.required],
      dob: [null, Validators.required],
      phoneNumber: [null, [Validators.required, phoneNumberValidator()]],
      email: [null, [Validators.required, Validators.email]],
      provice: [null, Validators.required],
      district: [null, Validators.required],
      ward: [null, Validators.required],
      idNumber: [null, Validators.required],
      dateOfIssue: [null, Validators.required],
      placeOfIssue: [null, Validators.required],
      workPlace: [null],
      personalNote: [null],
  });

  confirmModal?: NzModalRef;
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
  handleSubmit(): void {
      if (this.form.invalid) {
          this.form.markAsDirty()
      }
      console.log(this.form.invalid);
      console.log(this.form.value)
  }
  handleCancel(): void {
      
  }

  // avatar change
  public avatarChangeForm: FormGroup = this.fb.group({
      image: [null, [Validators.required]]
  }) 
  
  avatarPreview:string = "../../../assets/img/Logo-Hoc-Vien-Ky-Thuat-Mat-Ma-ACTVN.webp"
  oldAvatar!: string
  avatarFileName:string | null = null
  avatarNotMatchRegex: boolean = false
  allowUploadAvatar: boolean = false

  onAvatarSelected(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
          if (/\.(jpe?g|png|gif)$/i.test(target.files[0].name)){
              this.oldAvatar = this.avatarPreview
              this.avatarFileName = target.files[0].name
              const reader = new FileReader()
              reader.onload = (e:any) => {
                  this.avatarPreview = e.target.result;
              }
              reader.readAsDataURL(target.files[0])
              this.avatarNotMatchRegex = false;
              this.allowUploadAvatar = true;
          } else {
              this.avatarNotMatchRegex = true;
              this.allowUploadAvatar = false;
          }
      } else {
          this.message.error("No file selected")
      }
  }

  uploadAvatarChange() {
      console.log('clicked')
      if(this.avatarChangeForm.invalid){
          this.avatarNotMatchRegex = true;
          this.allowUploadAvatar = true;
      } else {
          this.avatarChangeForm.reset()
          this.avatarNotMatchRegex = false;
          this.allowUploadAvatar = false
      }
  }

  cancelUploadAvatar(){
      this.avatarChangeForm.reset()
      this.avatarNotMatchRegex = false;
      this.allowUploadAvatar = false
      this.avatarPreview = this.oldAvatar
  }

  changeCity(data: any) {
    this.getDistricts(data);
  }
  getCity() {
    this.addressService.getListCity().subscribe({
      next: (data: any) => {
        this.cityData = data;
        this.cdr.detectChanges();
      }
    }
    );
  }
  getDistricts(data: string) {
    this.addressService.getDistricts(data).subscribe({
      next:(value: any) => {
        this.districtData = value;
        this.cdr.detectChanges();
      }
    });
  }
  getWards(data: string) {
    this.addressService.getWards(data).subscribe( {
      next: (value) => {
        this.wardsData = value;
      },
    });
  }
  changeDistrict(data: any) {
    this.getWards(data);
  }


}
