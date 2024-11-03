import { Component, ViewChild } from "@angular/core";
import { ApexLegend, ApexStroke, ChartComponent, NgApexchartsModule } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors: string[];
  legend: ApexLegend;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-chart-circle-evoting',
  standalone: true,
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './chart-circle-evoting.component.html',
  styleUrl: './chart-circle-evoting.component.scss'
})
export class ChartCircleEvotingComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [9, 4, 6, 2],
      chart: {
        width: 380,
        type: "pie",
        dropShadow: {
          enabled: true,            
          top: 3,                 
          left: 3,                 
          blur: 5,                 
          opacity: 0.5           
        }
      },
      labels: ["Nguyễn Thưởng", "Ngô Minh Trang", "Nguyễn Văn Đức", "Phạm Thị Hà"],
      colors: ["#008ffb", "#feaf1a", "#259e66", "#e60e1b"],
      legend: {
        position: "bottom",       // Đặt chú thích ở dưới biểu đồ
        horizontalAlign: "left",  // Căn chỉnh chú thích về bên trái
        floating: false,          // Chú thích không nổi
        fontSize: '14px',
        itemMargin: {
          vertical: 5            // Khoảng cách dọc giữa các phần tử
        }
      },
      stroke: {
        show: false // Tắt viền giữa các phần của biểu đồ
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}
