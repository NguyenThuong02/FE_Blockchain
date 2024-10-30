import { createAction, props } from '@ngrx/store';
import { initialStateInterface } from './ToDo.reducer';

export const tenantActionRoute = createAction(
  'routeTenant',
  props<{ data: initialStateInterface }>(),
);

export const LOAD_TENANT = 'load tenant';
export const LOAD_TENANT_SUCCESS = 'load tenant success';
export const loadTenant = createAction(LOAD_TENANT);
export const loadTenantSuccess = createAction(
  LOAD_TENANT_SUCCESS,
  props<{ data: any[] }>(),
);