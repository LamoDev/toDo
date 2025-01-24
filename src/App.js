import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import List from './components/List';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import todoContext, { TodoContext } from './contexts/todosContext'
import { useContext , useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Footer from './components/Footer';


uuidv4(); 


const initialTodos=[

  {
    id:uuidv4(),
    title:"اقرا كتاب",
    details:" ",
    isCompleted:false
  },
  {
    id:uuidv4(),
    title:"مذاكره اختبار ",
    details:"  كل المحاضرات",
    isCompleted:false
  }

]

const theme = createTheme({
 typography:{
  fontFamily:["A"]
 },
 palette :{
  primary:{
    main:"#2E1B4B",

  }
 }
});

function App() {
    const [todos ,setTodos] =useState(initialTodos);
  
  return (
  
    <ThemeProvider  theme={theme}>
    <div className="App" style={{display:"flex" , flexDirection:"column" , alignItems:"center" ,  minHeight: "100vh", direction:"rtl"}}>
      {/* <div className="toDo border">
        <h1>مهامي</h1>
      </div> */}
        
     
      <TodoContext.Provider value={{todos,setTodos}}>
      <List/>
      </TodoContext.Provider>
   
      <Footer />
    </div>
    </ThemeProvider>
  );
}

export default App;
