import { Component } from '@angular/core';
import { ChartEvotingComponent } from './chart-evoting/chart-evoting.component';
import { ChartCircleEvotingComponent } from './chart-circle-evoting/chart-circle-evoting.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result-evoting',
  standalone: true,
  imports: [
    CommonModule,
    ChartEvotingComponent,
    ChartCircleEvotingComponent
  ],
  templateUrl: './result-evoting.component.html',
  styleUrl: './result-evoting.component.scss'
})
export class ResultEvotingComponent {
  public chartType: any = 'columns'

  handleChangeChart(name: string) {
    this.chartType = name;
  }
}
