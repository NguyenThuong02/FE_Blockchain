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
import { VoteService } from '../../../core/api/vote.service';

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
export class ProceedEvotingComponent implements OnInit, OnChanges{
  @Input() isVisibleEvoting: boolean = true;
  @Input() nameEvoting: any;
  @Input() numberVote: any;
  @Input() idEvoting: any;
  @Output() visiblePopUpEvoting = new EventEmitter<boolean>();
  public isLoading: boolean = false;

  candidates: any = [];

  selectedCandidates: any[] = [];

  public form: FormGroup = this.fb.group({
    privateKey: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private message: NzMessageService,
    private modal: NzModalService,
    private voteService: VoteService,
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idEvoting']) {
      if(this.idEvoting) {
        this.selectedCandidates = [];
        this.viewListVote();
      }
    }
  }

  ngOnInit(): void {
    if(this.idEvoting) {
      this.viewListVote();
    }
  }

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

  viewListVote() {
    this.isLoading = true;
    this.voteService.listViewCandidate(this.idEvoting).subscribe({
      next: res => {
        this.isLoading = false;
        this.candidates = res.data;
        console.log("Candisdates: ", this.candidates);
      }
    });
  }

  toggleCandidateSelection(candidate: any) {
    if (this.selectedCandidates.includes(candidate)) {
      this.removeCandidate(candidate);
    } else {
      if (this.selectedCandidates.length < this.numberVote) {
        this.selectedCandidates.push(candidate);
      } else {
        this.message.warning(`Bạn chỉ có thể bầu chọn tối đa ${this.numberVote} ứng viên.`);
      }
    }
  }

  removeCandidate(candidate: any) {
    this.selectedCandidates = this.selectedCandidates.filter((c: any) => c.id !== candidate.id);
  }

  handleMaxSelection(candidate: any) {
    if (this.selectedCandidates.length >= this.numberVote && !this.selectedCandidates.includes(candidate)) {
      this.message.warning(`Bạn chỉ có thể bầu chọn tối đa ${this.numberVote} ứng viên.`);
    }
  }
}
