import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TenantService } from '../core/api/tenant.service';
import { loadTenant, loadTenantSuccess } from './Tenant.action';
import { map, mergeMap } from 'rxjs';
import { GetListTenantBodyService } from '../core/services/get-list-tenant-body.service';


@Injectable()
export class TodoEffect {
  constructor(
    private action$: Actions,
    private tenantService: TenantService,
    private getListTenantBodyService: GetListTenantBodyService,
  ) {}
  loadTodos = createEffect(() => {
    return this.action$.pipe(
      ofType(loadTenant),
      mergeMap(() => {
        return this.tenantService.getListTenant(
          // this.getListTenantBodyService.body,
        ).pipe(
          map((data) => {
            return loadTenantSuccess({ data });
          }),
        );
      }),
    );
  });
}
