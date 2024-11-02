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
      {
        path: 'level-management',
        loadChildren: () =>
          import('../../features/level-management/level-management.routing.module').then(
            (m) => m.LevelManagementRoutingModule,
          ),
      },
      {
        path: 'slection-management',
        loadChildren: () =>
          import('../../features/slection-management/slection-management.routing.module').then(
            (m) => m.SlectionManagementRoutingModule,
          ),
      },
      {
        path: 'slection-ticket',
        loadChildren: () =>
          import('../../features/slection-evoting/slection-evoting.routing.module').then(
            (m) => m.SlectionEvotingRoutingModule,
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
