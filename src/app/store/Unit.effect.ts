import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadUnits, loadUnitsAllSuccess, loadUnitsSuccess } from './Unit.action';
import { map, mergeMap } from 'rxjs';
import { unitService } from '../core/api/unit.service';
import { GetListUnitBodyService } from '../core/services/get-list-unit-body.service';
import { loadUnitsByTenant, loadUnitsByTenantSuccess } from './Unit.action';

@Injectable()
export class UnitEffect {
  constructor(
    private action$: Actions,
    private UnitService: unitService,
    private GetListUnitBodyService: GetListUnitBodyService,
  ) {}
  // loadUnits = createEffect(() => {
  //   return this.action$.pipe(
  //     ofType(loadUnits),
  //     mergeMap(() => {
  //       return this.UnitService.getListUnits(
  //         this.GetListUnitBodyService.body,
  //       ).pipe(
  //         map((data) => {
  //           return loadUnitsSuccess({ data });
  //         }),
  //       );
  //     }),
  //   );
  // });

  loadUnits = createEffect(() => {
    return this.action$.pipe(
      ofType(loadUnits),
      mergeMap(() => {
        return this.UnitService.getListUnitsByTenant(
          this.GetListUnitBodyService.body2.id,
        ).pipe(
          map((id) => {
            return loadUnitsAllSuccess({ id:this.GetListUnitBodyService.body2.id });
          }),
        );
      }),
    );
  });

  loadUnitsByTenant = createEffect(() => {
    return this.action$.pipe(
      ofType(loadUnitsByTenant),
      mergeMap(({ tenantId }) => {
        return this.UnitService.getListUnitsByTenant(tenantId).pipe(
          map((data) => {
            return loadUnitsByTenantSuccess({ tenantId, data });
          }),
        );
      }),
    );
  });
}
