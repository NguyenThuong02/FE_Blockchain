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
  selector: 'app-proceed-evoting',
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
  templateUrl: './proceed-evoting.component.html',
  styleUrl: './proceed-evoting.component.scss'
})
export class ProceedEvotingComponent implements OnInit{
  @Input() isVisibleEvoting: boolean = true;
  @Input() nameEvoting: any;
  @Input() idEvoting: any;
  @Output() visiblePopUpEvoting = new EventEmitter<boolean>();

  candidates = [
    { id: 1, name: 'Trương Thị Quý', birthdate: '14/06/2000', age: 23 },
    { id: 2, name: 'Nguyễn Anh Tuấn', birthdate: '05/10/2000', age: 22 },
    { id: 3, name: 'Đào Hải Long', birthdate: '11/09/2000', age: 22 },
    { id: 4, name: 'Nguyễn Văn Hậu', birthdate: '24/08/2000', age: 22 },
    { id: 5, name: 'Nguyễn Đắc Duy', birthdate: '01/03/1998', age: 25 },
  ];

  selectedCandidates: any[] = [];

  public form: FormGroup = this.fb.group({
    privateKey: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private message: NzMessageService,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {}

  handleOk(): void {
    console.log("Các ứng viên đã chọn: ", this.selectedCandidates);
    if (this.form.invalid) {
      this.form.get('privateKey')?.markAsTouched();
      return;
    }
  }

  handleCancel(): void {
    this.visiblePopUpEvoting.emit(false);
  }

  toggleCandidateSelection(candidate: any) {
    if (this.selectedCandidates.includes(candidate)) {
      this.removeCandidate(candidate);
    } else {
      if (this.selectedCandidates.length < 3) {
        this.selectedCandidates.push(candidate);
      } else {
        this.message.warning("Bạn chỉ có thể bầu chọn tối đa 3 ứng viên.");
      }
    }
  }

  removeCandidate(candidate: any) {
    this.selectedCandidates = this.selectedCandidates.filter((c: any) => c.id !== candidate.id);
  }
}
