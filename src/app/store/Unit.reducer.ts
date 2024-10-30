import { createReducer, on } from '@ngrx/store';
import { loadUnitsAllSuccess, loadUnitsSuccess } from './Unit.action';
import { loadUnitsByTenantSuccess } from './Unit.action';

export interface initialStateInterface {
  data: any;
  id: string;
}

export const initialState: initialStateInterface = {
  data: null,
  id: ''
};

export const UnitReducer = createReducer(
  initialState,
  on(loadUnitsSuccess, (state, { data }) => {
    return {
      ...state,
      ...data,
    };
  }),
  on(loadUnitsAllSuccess, (state, id ) => {
    return {
      ...state,
      ...id,
    };
  }),
  on(loadUnitsByTenantSuccess, (state, { tenantId, data }) => {
    return {
      ...state,
      [tenantId]: data,
    };
  }),
);
