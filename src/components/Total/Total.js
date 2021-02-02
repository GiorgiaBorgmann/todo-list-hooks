import { useContext } from "react";
import { TotalContext } from "../List/List";


export function Total() {
  const listToDos = useContext(TotalContext);
  let counter = 0;

  const countCompletedTasks = () => {
    if (listToDos) {
      for (let i = 0; i < listToDos.length; i++) {
        if (listToDos[i].completed === true) {
          counter++;
        }
      }
    }
    return counter;
  };
  return (
    <div>
      Total: {countCompletedTasks()}/{listToDos && listToDos.length}
    </div>
  );
}
