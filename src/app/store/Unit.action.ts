import { createAction, props } from '@ngrx/store';
import { initialStateInterface } from './ToDo.reducer';

export const unitActionRoute = createAction(
  'routeUnit',
  props<{ data: initialStateInterface }>(),
);

export const LOAD_UNIT = 'load unit';
export const LOAD_UNIT_SUCCESS = 'load unit success';
export const loadUnits = createAction(LOAD_UNIT);
export const loadUnitsSuccess = createAction(
  LOAD_UNIT_SUCCESS,
  props<{ data: any[] }>(),
);

export const loadUnitsAllSuccess = createAction(
  LOAD_UNIT_SUCCESS,
  props<{ id: string }>(),
);

export const LOAD_UNIT_BY_TENANT = 'load unit by tenant';
export const LOAD_UNIT_BY_TENANT_SUCCESS = 'load unit by tenant success';

export const loadUnitsByTenant = createAction(
  LOAD_UNIT_BY_TENANT,
  props<{ tenantId: string }>(),
);

export const loadUnitsByTenantSuccess = createAction(
  LOAD_UNIT_BY_TENANT_SUCCESS,
  props<{ tenantId: string; data: any[] }>(),
);