import { actions } from "../List/List";

export function Item({ toDoTask, dispatch }) {
  return (
    <div>
      <label
        style={
          toDoTask.completed
            ? { textDecoration: "line-through" }
            : { textDecoration: "none" }
        }
      >
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
        {toDoTask.toDoText}
      </label>
    </div>
  );
}
