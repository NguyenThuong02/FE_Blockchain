import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartColumnsComponent } from '../chart-columns/chart-columns.component';
import { ChartCircleComponent } from '../chart-circle/chart-circle.component';
import { SheducerComponent } from '../sheducer/sheducer.component';
import { PagiComponent } from '../../../shared/components/pagi/pagi.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';

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
export class StatisticalListComponent {
  public chartType: any = 'columns'
  public isLoading: boolean = false;
  public totalCount: number = 10;
  public param = {
    pageNumber: 1,
    pageSize: 10,
  };
  public slectionArray: any = [
    {
      name: 'Bầu cử chủ tịch nước Việt Nam',
      startDate: '10-10-2021',
      endDate: '10-10-2021',
      status: false
    },
    {
      name: 'Bầu cử tổng thống Mỹ',
      startDate: '10-10-2021',
      endDate: '10-10-2021',
      status: true
    },
    {
      name: 'Bầu cử bí thư Tỉnh uỷ',
      startDate: '10-10-2021',
      endDate: '10-10-2021',
      status: true
    },
    {
      name: 'Bầu cử uỷ ban xã',
      startDate: '10-10-2021',
      endDate: '10-10-2021',
      status: false
    },
    {
      name: 'Bầu cử quốc hội khoá IXX',
      startDate: '10-10-2021',
      endDate: '10-10-2021',
      status: false
    },
  ];
  public listCandidate: any = [
    {
      id: '1',
      fullName: 'Nguyễn Văn A',
      email: '',
    }
  ];
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
