import logo from "./logo.svg";
import "./App.css";
import List from "./components/List";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Footer from "./components/Footer";
import MySnackbar from "./components/MySnackbar";
import {SnackbarPovider} from "./contexts/SnackbarContext";
import {TodosProvider} from './contexts/todosContext'
uuidv4();

const initialTodos = [
  {
    id: uuidv4(),
    title: "اقرا كتاب",
    details: " ",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "مذاكره اختبار ",
    details: "  كل المحاضرات",
    isCompleted: false,
  },
];

const theme = createTheme({
  typography: {
    fontFamily: ["A"],
  },
  palette: {
    primary: {
      main: "#2E1B4B",
    },
  },
});
function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
      <SnackbarPovider>
        <div
          className="App"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            direction: "rtl",
          }}
        >
            <List />

          <Footer />
        </div>
      </SnackbarPovider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
