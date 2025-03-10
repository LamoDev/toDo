import { createContext ,useReducer, useContext } from "react";
import todosReducer from '../reducers/todoReducer'

 export const TodosContext=createContext([])
 export const DispatchContext=createContext([null])

 
 export const TodosProvider=({children})=>{

    const [todos ,dispatch]=useReducer(todosReducer,[])
    return (
        <TodosContext.Provider value={todos}>
            <DispatchContext.Provider value={dispatch}>
        {children}
        </DispatchContext.Provider >
        </TodosContext.Provider>

    )
}

export const useTodos = () => {
  return useContext(TodosContext);
};
export const useTodosDispatch = () => {
    return useContext(DispatchContext);
  };

export default TodosProvider;