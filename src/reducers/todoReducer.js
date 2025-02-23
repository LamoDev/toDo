import { v4 as uuidv4 } from "uuid";

export default function reducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.newTitle,
        details: "",
        isCompleted: false,
      };
      const updatedTodos = [...currentTodos, newTodo];
      // Updating the state now is done by the RETURN
      //   setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "deleted": {
      const updatedTodos = currentTodos.filter((t) => {
        // // todo the clicked task , filter in every iteration returns true or false
        // // shortcut return t.id!=todo.id
        return t.id != action.payload.id;
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "updated": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id == action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            details: action.payload.details,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "get":{
        const storedTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
        return storedTodos;

    }
    case "toggledCompleated":{
        const updatedTodos = currentTodos.map((t) => {
            if (t.id == action.payload.id) {

             //   t.isCompleted = !t.isCompleted; // mutation 
                const updatedTodo={
                    ...t ,isCompleted: !t.isCompleted
                }
                return updatedTodo;
            }
            return t;
          });
          localStorage.setItem("todos", JSON.stringify(updatedTodos));
          return updatedTodos;

    }


    default: {
      throw Error("Unknown Action " + action.type);
    }
  }
}
