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
import { useState, useContext, useEffect, useMemo ,useReducer } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTodos,useTodosDispatch } from "../contexts/todosContext";
import { v4 as uuidv4 } from "uuid";
import { useSnackbar} from "../contexts/SnackbarContext";
import todosReducer from '../reducers/todoReducer'
export default function List() {

// reducers 


//contexts 
const todos=useTodos()
const dispatch=useTodosDispatch()


const {showHideSnackbar}=useSnackbar()




  // states
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [dialogTodo, setDialogTodo] = useState(null);
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
    //Doesn't have a payload which fine !!
    dispatch({type:"get"})

  }, []);

  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  function handleAddClick() {
    // title input is needed in the redecer to add a todo with title 
    dispatch({type:"added" , payload:{newTitle:titleInput}})
    setTitleInput("")
    showHideSnackbar("تم إضافه مهمة بنجاح")
  };
  

  //Delete handalers

  function handleDeleteDialogClose() {
    setDeleteDialog(false);
  }
  function showDeleteDialog(todo) {
    setDialogTodo(todo);
    setDeleteDialog(true);
  }

  function handleDeleteConforim() {
    dispatch({type:"deleted" , payload:dialogTodo})
    handleDeleteDialogClose();
    showHideSnackbar("تم الحذف بنجاح")

  }

  // Update handlers

  function handleUpdateDialog(todo) {
    setDialogTodo(todo);
    setUpdateDialog(true);
  }

  function handleUpdateDialogClose() {
    setUpdateDialog(false);
  }
  function handleUpdateConforim() {
    dispatch({type:"updated", payload:dialogTodo})
    showHideSnackbar("تم التحديث بنجاح")
    handleUpdateDialogClose()
  }

  const todosJSX = todosTobeRender.map((t) => {
    return (
      <ToDo
        key={t.id}
        todo={t}
        openDeleteDialog={showDeleteDialog}
        openUpdateDialog={handleUpdateDialog}
      />
    );
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
      {/* UPDATE DIALOG*/}
      <Dialog
        style={{ direction: "rtl" }}
        open={updateDialog}
        onClose={handleUpdateDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          تعديل مهمة : {dialogTodo ? dialogTodo.title : ""}
        </DialogTitle>
        <DialogContent>
          <TextField
            value={dialogTodo ? dialogTodo.title : ""}
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="عنوان المهمة "
            fullWidth
            variant="standard"
            onChange={(e) => {
              //{ ...dialogTodo, title: e.target.value }
              setDialogTodo({ ...dialogTodo, title: e.target.value });
            }}
          />
          <TextField
            value={dialogTodo ? dialogTodo.details : ""}
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="تفاصيل المهمة "
            fullWidth
            variant="standard"
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>إغلاق</Button>
          <Button autoFocus onClick={handleUpdateConforim}>
            تحديث
          </Button>
        </DialogActions>
      </Dialog>
      {/* == UPDATE DIALOG ==*/}
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
