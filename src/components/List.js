import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToDo from "./ToDo";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import { useState, useContext, useEffect, useMemo } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TodoContext } from "../contexts/todosContext";
import { v4 as uuidv4 } from "uuid";

export default function List() {


  // states 
  const { todos, setTodos } = useContext(TodoContext);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [dialogTodo,setDialogTodo]=useState(null)
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  //filtering arrays

  const compleatedTodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("calling compleated array");
      return t.isCompleted;
    });
  }, [todos]);

  const notCompleatedTodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("calling NOT compleated array");

      return !t.isCompleted;
    });
  }, [todos]);

  let todosTobeRender = todos;

  if (displayedTodosType == "completed") {
    todosTobeRender = compleatedTodos;
  } else if (displayedTodosType == "non-compleated") {
    todosTobeRender = notCompleatedTodos;
  } else {
    todosTobeRender = todos;
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storedTodos);
  }, []);

  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }


  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
  }

  // handalers function


  function handleDeleteDialogClose() {
    setDeleteDialog(false);
  }
  function showDeleteDialog(todo) {
    setDialogTodo(todo)
    setDeleteDialog(true);
  }

  function handleDeleteConforim() {
    console.log(dialogTodo)

    const updatedTodos = todos.filter((t) => {
      // // todo the clicked task , filter in every iteration returns true or false
      // // shortcut return t.id!=todo.id
     return t.id != dialogTodo.id;
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    handleDeleteDialogClose()
  }


  const todosJSX = todosTobeRender.map((t) => {
    return <ToDo key={t.id} todo={t} openDeleteDialog={showDeleteDialog} />;
  });

  return (
    <>
      {/* DELETE DIALOG*/}
      <Dialog
        style={{ direction: "rtl" }}
        open={deleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل أنت متأكد من حذف المهمة
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكن التراجع عن حذف المهمة بعد إتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>إغلاق</Button>
          <Button autoFocus onClick={handleDeleteConforim}>
            نعم , قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* == DELETE DIALOG ==*/}
      <Container maxWidth="sm" style={{ marginTop: "20px" }}>
        <Card
          sx={{ minWidth: 275 }}
          style={{ maxHeight: "80vh", overflow: "scroll" }}
        >
          <CardContent>
            <Typography
              variant="h2"
              style={{
                textAlign: "center",
                fontWeight: "600",
                color: "#2E1B4B",
              }}
            >
              مهامي
            </Typography>
            <Divider />
            <ToggleButtonGroup
              value={displayedTodosType}
              //   exclusive
              onChange={changeDisplayedType}
              aria-label="text alignment"
              style={{ direction: "ltr", marginTop: "30px" }}
            >
              <ToggleButton value="non-compleated" aria-label="left aligned">
                غير منجز
              </ToggleButton>
              <ToggleButton value="completed" aria-label="centered">
                منجز
              </ToggleButton>
              <ToggleButton value="all" aria-label="left aligned">
                الكل
              </ToggleButton>
            </ToggleButtonGroup>
            {todosJSX}

            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid size={8}>
                <TextField
                  value={titleInput}
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                  id="outlined-password-input"
                  label="عنوان المهمه "
                  type="text"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid size={4} style={{}}>
                <Button
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#2E1B4B",
                    color: "white",
                  }}
                  variant="contained"
                  onClick={handleAddClick}
                  disabled={titleInput.length == 0}
                >
                  إضافة
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
