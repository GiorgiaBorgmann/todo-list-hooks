import { Item } from "../Item/Item";
import "./List.css";
import { Total } from "../Total/Total";
import React, { useState, useReducer } from "react";

export const actions = {
  addTask: "addTask",
  completeToDo: "completeToDo",
};

export const TotalContext = React.createContext();

export function List() {
  const [userInput, setUserInput] = useState("");
  const reducer = (listToDos, action) => {
    switch (action.type) {
      case actions.addTask:
        return [...listToDos, newToDo(action.payload.userInput)];
      case actions.completeToDo:
        return listToDos.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, completed: !item.completed };
          }
          return item;
        });
      default:
        return listToDos;
    }
  };

  const [listToDos, dispatch] = useReducer(reducer, []);

  function newToDo(userInput) {
    const newToDo = {
      id: Math.random(),
      toDoText: userInput,
      completed: false,
    };
    return newToDo;
  }

  const handleAdd = (event) => {
    event.preventDefault();
    dispatch({ type: actions.addTask, payload: { userInput: userInput } });
    setUserInput("");
  };
  return (
    <TotalContext.Provider value={listToDos}>
      <div className="form">
        <input
          type="text"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div className="list">
        {listToDos.map((item) => (
          <Item key={item.id} toDoTask={item} dispatch={dispatch} />
        ))}
      </div>
      <Total />
    </TotalContext.Provider>
  );
}
