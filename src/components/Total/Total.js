import { useContext } from "react";
import { TotalContext } from "../List/List";

export function Total() {
  const listToDos = useContext(TotalContext);
  const countCompletedTasks = (listToDos) => {
    let counter = 0;
    if (listToDos) {
      for (let i = 0; i < listToDos.length; i++) {
        if (listToDos[i].completeToDo === true) {
          counter++;
        }
      }
    }
    return counter;
  };
  return (
    <div>
      Total: {countCompletedTasks(listToDos)}/{listToDos && listToDos.length}
    </div>
  );
}
