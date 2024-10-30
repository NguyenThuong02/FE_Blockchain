// unit.selector.ts
import { createSelector } from '@ngrx/store';
import { initialStateInterface } from './Unit.reducer';

export const selectUnitState = (state: any) => state.unitReduce;

export const selectUnitsData = createSelector(
  selectUnitState,
  (state: initialStateInterface) => state.data
);
