import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

type Todo = {
  text: string;
  done: boolean;
};

function App() {
  const [textInput, setTextInput] = useState("");

  const [todos, setTodos] = useState<Todo[]>([]);

  const [currentlyEditing, setCurrentlyEditing] = useState<
    number | undefined
  >();

  return (
    <div>
      <input
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="Write here"
      />
      <button
        onClick={() => {
          setTodos((currentTodos) => [
            ...currentTodos,
            { text: textInput, done: false },
          ]);
          setTextInput("");
        }}
      >
        Add
      </button>
      {todos.map((todo, index) => (
        <div key={index} className="listElement">
          <input
            type={"checkbox"}
            checked={todo.done}
            onChange={(e) =>
              setTodos((currentTodos) => {
                const newTodos = [...currentTodos];
                newTodos[index].done = e.target.checked;
                return newTodos;
              })
            }
          ></input>
          <div
            className={todo.done ? "textInputDone" : ""}
            onClick={() => setCurrentlyEditing(index)}
            onBlur={() => setCurrentlyEditing(undefined)}
          >
            {currentlyEditing === index ? (
              <input
                value={todo.text}
                autoFocus
                onChange={(e) =>
                  setTodos((currentTodos) => {
                    const newTodos = [...currentTodos];
                    newTodos[index].text = e.target.value;
                    return newTodos;
                  })
                }
              ></input>
            ) : (
              todo.text
            )}
          </div>
          <button
            onClick={() =>
              setTodos((currentTodos) => {
                const newTodos = [...currentTodos];
                newTodos.splice(index, 1);
                return newTodos;
              })
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
