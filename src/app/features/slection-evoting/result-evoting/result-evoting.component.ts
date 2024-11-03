import { Component } from '@angular/core';
import { ChartEvotingComponent } from './chart-evoting/chart-evoting.component';
import { ChartCircleEvotingComponent } from './chart-circle-evoting/chart-circle-evoting.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ShareTableModule } from '../../../shared/components/share-table/share-table.module';
import { RouterLink, RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { PagiComponent } from '../../../shared/components/pagi/pagi.component';

@Component({
  selector: 'app-result-evoting',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NzSpinModule,
    FormsModule,
    ReactiveFormsModule,
    PagiComponent,
    NzIconModule,
    RouterModule,
    ChartEvotingComponent,
    ChartCircleEvotingComponent
  ],
  templateUrl: './result-evoting.component.html',
  styleUrl: './result-evoting.component.scss'
})
export class ResultEvotingComponent {
  public chartType: any = 'columns'
  public type: any = 'candidate'
  public isLoading: boolean = false;
  public totalCount: number = 10;
  maxheight: string = '';
  public param = {
    pageNumber: 1,
    pageSize: 10,
  };

  public listCandidate: any = [
    {
      id: '1',
      fullName: 'Nguyễn Văn A',
      email: '',
    }
  ];

  public listVoters: any = [
    {
      id: '1',
      fullName: 'Nguyễn Văn B',
      email: '',
    }
  ];

  viewInformation() {
    this.isLoading = true;
    // Gọi hàm ra service
  }

  handleChangeChart(name: string) {
    this.chartType = name;
  }

  handleChangeTable(name: string) {
    this.type = name;
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
