import { Component } from '@angular/core';
import { ChartEvotingComponent } from './chart-evoting/chart-evoting.component';

@Component({
  selector: 'app-result-evoting',
  standalone: true,
  imports: [
    ChartEvotingComponent
  ],
  templateUrl: './result-evoting.component.html',
  styleUrl: './result-evoting.component.scss'
})
export class ResultEvotingComponent {

}
