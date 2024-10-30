import { createReducer, on } from '@ngrx/store';
import { loadTenantSuccess } from './Tenant.action';

export interface initialStateInterface {
  data: any;
}

export const initialState: initialStateInterface = {
  data: null,
};

export const TennatReducer = createReducer(
  initialState,
  on(loadTenantSuccess, (state, { data }) => {
    return {
      ...state,
      ...data,
    };
  }),
);
