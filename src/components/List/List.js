import { Item } from "../Item/Item";
import "./List.css";
import { Total } from "../Total/Total";
import { callToServer } from "../../api";
import React, { useState, useReducer } from "react";

export const actions = {
  addTask: "addTask",
  completeToDo: "completeToDo",
  editText: "editText",
};

export const TotalContext = React.createContext();

export function List() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const reducer = (listToDos, action) => {
    switch (action.type) {
      case actions.addTask:
        return [...listToDos, newToDo(action.payload.userInput)];
      case actions.completeToDo:
        return listToDos.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, completeToDo: !item.completeToDo };
          }
          return item;
        });
      case actions.editText:
        return listToDos.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, toDoText: action.payload.toDoText };
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
      completeToDo: false,
    };
    return newToDo;
  }

  const handleAdd = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      await callToServer();
      dispatch({ type: actions.addTask, payload: { userInput: userInput } });
      setUserInput("");
      setLoading(false);
    } catch {
      return console.error();
    }
  };
  return (
    <>
      <div className="form">
        <input
          data-testid={"todo-input"}
          type="text"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
        />
        <button disabled={userInput === ""} onClick={handleAdd}>{loading ? "Adding...":"Add"}</button>
      </div>
      <div className="list" data-testid={"todo-list"}>
        {listToDos.map((item) => (
          <Item key={item.id} toDoTask={item} dispatch={dispatch} />
        ))}
      </div>
      <TotalContext.Provider value={listToDos}>
        <Total />
      </TotalContext.Provider>
    </>
  );
}
