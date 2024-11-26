import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartColumnsComponent } from '../chart-columns/chart-columns.component';
import { ChartCircleComponent } from '../chart-circle/chart-circle.component';
import { SheducerComponent } from '../sheducer/sheducer.component';
import { PagiComponent } from '../../../shared/components/pagi/pagi.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageService } from 'ng-zorro-antd/message';
import { VoteService } from '../../../core/api/vote.service';

@Component({
  selector: 'app-statistical-list',
  standalone: true,
  imports: [
    CommonModule,
    ChartColumnsComponent,
    ChartCircleComponent,
    SheducerComponent,
    PagiComponent,
    NzSpinModule
  ],
  templateUrl: './statistical-list.component.html',
  styleUrl: './statistical-list.component.scss'
})
export class StatisticalListComponent implements OnInit {
  public chartType: any = 'columns'
  public isLoading: boolean = false;
  public totalCount: number = 10;
  public idOwner: any;
  public nameOwner: any;
  public canActive: boolean = false;
  public role: string;
  public selectedVoteId: string | null = null;
  public param = {
    pageNumber: 1,
    pageSize: 10,
  };
  public slectionArray: any = [];
  public listDetailVote: any = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private voteService: VoteService,
    private message: NzMessageService,
  ){}

  ngOnInit(): void {
    this.idOwner = JSON.parse(
      localStorage.getItem('id_token_claims_obj') || '{}',
    )?.sub;
    this.nameOwner = JSON.parse(
      localStorage.getItem('id_token_claims_obj') || '{}',
    )?.name;
    this.role = JSON.parse(
      localStorage.getItem('id_token_claims_obj') || '{}',
    )?.role;
    if(this.role[0] === 'Administrator'){
      this.canActive = true;
      this.viewVoteforAdmin();
    } else if(this.role[0] === 'User') {
      this.canActive = false;
      // this.viewVoteforUser();
      this.viewVoteHistory();
    }
  }

  viewVoteforAdmin() {
    this.voteService.viewListVote().subscribe({
      next: (res) => {
        this.slectionArray = res.data;
      },
      error: (err) => {
        this.message.error('Lỗi hệ thống');
      }
    })
  }

  viewVoteHistory() {
    this.voteService.viewListVoteHistory().subscribe({
      next: (res) => {
        this.slectionArray = res.data;
      },
      error: (err) => {
        this.message.error('Lỗi hệ thống');
      }
    })
  }

  selectVote(voteId: string): void {
    this.selectedVoteId = voteId;
    this.voteService.listViewCandidate(voteId).subscribe((candidateRes) => {
      this.listDetailVote = candidateRes.data;
      this.cdr.detectChanges();
    });
  }
  
  handleChangeChart(name: string) {
    this.chartType = name;
  }

  currentPage: number = 1;
  itemsPerPage: number = 10;
  changePage(page: number): void {
    this.currentPage = page;
    this.param.pageNumber = page;
  }

  changePageSize(page: number): void {
    if (page) {
      this.itemsPerPage = page;
      this.param.pageSize = page;
    }
  }
}
