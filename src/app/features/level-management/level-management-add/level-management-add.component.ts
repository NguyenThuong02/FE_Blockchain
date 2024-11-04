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
import { rePassValidator } from '../../../shared/validate/check-repass.directive';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PositionService } from '../../../core/api/position.service';

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
    private positionService: PositionService,
    private modal: NzModalService,
    private message: NzMessageService,
  ) {}
  ngOnInit(): void {
    this.form.controls['isAdmin'].disable();
  }

  handleOk(): void {
    const body = {
      positionName: this.form.get('levelName')?.value,
      positionDescription: this.form.get('description')?.value,
      status: this.form.get('status')?.value,
    };
    if (this.form.invalid) {
      this.form.get('levelName')?.markAsTouched();
      this.form.get('description')?.markAsTouched();
      this.form.get('status')?.markAsTouched()
      return;
    }
    this.positionService.createPosition(body).subscribe(res => {
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
}
