import { actions } from "../List/List";
import './Item.css'

export function Item({ toDoTask, dispatch }) {
  return (
    <div className="item-container">
      <input
        type="checkbox"
        checked={toDoTask.completeToDo}
        
        onChange={() =>
          dispatch({
            type: actions.completeToDo,
            payload: { id: toDoTask.id },
          })
        }
      />
      <input
        className={
          toDoTask.completeToDo
            ? 'todo-text-done'
            : 'todo-text'
        }
        id={toDoTask.id}
        value={toDoTask.toDoText}
        data-testid={"toDoTask-input"}
        onChange={(e)=> 
        dispatch({type: actions.editText, payload: {toDoText: e.target.value, id: toDoTask.id }})}
      > 
      </input>
    </div>
  );
}
