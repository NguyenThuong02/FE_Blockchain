import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { TranslateModule } from '@ngx-translate/core';
// import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'unit',
        pathMatch: 'full',
      },
      {
        path: 'statistical',
        loadChildren: () =>
          import('../../features/statistical/statistical.routing.module').then(
            (m) => m.StatisticalRoutingModule,
          ),
      },
      {
        path: 'user-management',
        loadChildren: () =>
          import('../../features/management/management.routing.module').then(
            (m) => m.ManagementRoutingModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule],
})
export class MainRoutingModule {}
