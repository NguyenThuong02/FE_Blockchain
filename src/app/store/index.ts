import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { ToDOReducer } from './ToDo.reducer';
import { UnitReducer } from './Unit.reducer';
import { TennatReducer } from './Tenant.reducer';

export interface State {}
export const reducers: ActionReducerMap<State> = {
  toDoReduce: ToDOReducer,
  unitReduce: UnitReducer,
  tennatReduce: TennatReducer, 
};
export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
