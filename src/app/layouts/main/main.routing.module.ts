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
      // {
      //   path: 'unit',
      //   loadChildren: () =>
      //     import('../../features/unit/unit.routing.module').then(
      //       (m) => m.UnitRoutingModule,
      //     ),
      //   // title: 'Unit',
      // },
      // {
      //   path: 'task',
      //   loadChildren: () =>
      //     import('../../features/task/task.routing.module').then(
      //       (m) => m.TaskRoutingModule,
      //     ),
      //   // title: 'Unit',
      // },
      // {
      //   path: 'user-management',
      //   loadChildren: () =>
      //     import('../../features/management/management.routing.module').then(
      //       (m) => m.ManagementRoutingModule,
      //     ),
      //   // title: 'Unit',
      // },
      // {
      //   path: 'individual-task/:id',
      //   loadChildren: () =>
      //     import(
      //       '../../features/individual-task/individual-task.routing.module'
      //     ).then((m) => m.IndividualTaskRoutingModule),
      //   // title: 'Unit',
      // },
      // {
      //   path: 'user-infor/:id',
      //   loadComponent: () =>
      //     import('../../features/user-infor/user-infor.component').then(
      //       (m) => m.UserInforComponent,
      //     ),
      //   // title: 'Unit',
      // },
      // {
      //   path: 'unit/list/othertask/:id',
      //   loadChildren: () =>
      //     import('../../features/unit/unit.routing.module').then(
      //       (m) => m.UnitRoutingModule,
      //     ),
      //   // title: 'Unit',
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule],
})
export class MainRoutingModule {}
