export function Item({ toDoTask }) {
  return (
    <div>
      <label>
        <input type="checkbox" />
        {toDoTask.toDoText}
      </label>
    </div>
  );
}
