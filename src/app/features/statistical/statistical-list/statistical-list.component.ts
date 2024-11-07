import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartColumnsComponent } from '../chart-columns/chart-columns.component';
import { ChartCircleComponent } from '../chart-circle/chart-circle.component';

@Component({
  selector: 'app-statistical-list',
  standalone: true,
  imports: [
    CommonModule,
    ChartColumnsComponent,
    ChartCircleComponent
  ],
  templateUrl: './statistical-list.component.html',
  styleUrl: './statistical-list.component.scss'
})
export class StatisticalListComponent {
  public chartType: any = 'columns'
  
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

  handleChangeChart(name: string) {
    this.chartType = name;
  }
}
