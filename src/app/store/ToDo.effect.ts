import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToDOService } from '../core/api/todo.service';
import { loadTodos, loadTodosSuccess } from './ToDo.action';
import { map, mergeMap } from 'rxjs';
import { GetListTodoBodyService } from '../core/services/get-list-todo-body.service';

@Injectable()
export class TodoEffect {
  constructor(
    private action$: Actions,
    private TodoService: ToDOService,
    private GetListTodoBodyService: GetListTodoBodyService,
  ) {}
  loadTodos = createEffect(() => {
    return this.action$.pipe(
      ofType(loadTodos),
      mergeMap(() => {
        return this.TodoService.getListToDo(
          this.GetListTodoBodyService.body,
        ).pipe(
          map((data) => {
            return loadTodosSuccess({ data });
          }),
        );
      }),
    );
  });
}
