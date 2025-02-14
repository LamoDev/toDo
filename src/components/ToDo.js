import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useContext, useState } from "react";
import { TodoContext } from "../contexts/todosContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function ToDo({ todo ,openDeleteDialog }) {

  function handleDeleteClick() {
    openDeleteDialog(todo);
  }




  function handleUpdateConforim() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        return {...t, title:updatedTodo.title , details:updatedTodo.details}
      }else {
        return t
      }
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos" ,JSON.stringify(updatedTodos))
   handleUpdateDialogClose();
  }


  function handleUpdateDialogClose() {
    setUpdateDialog(false);
  }
  const [updateDialog, setUpdateDialog] = useState(false);
  const [updatedTodo ,setUpdatedTodo]=useState({
    title:todo.title,
    details:todo.details
  })

  const { todos, setTodos } = useContext(TodoContext);
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos" ,JSON.stringify(updatedTodos)) 

  }

  function handleUpdateClick() {
    setUpdateDialog(true);
  }

  return (
    <>

      {/* UPDATE DIALOG*/}
      <Dialog
        style={{ direction: "rtl" }}
        open={updateDialog}
        onClose={handleUpdateDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          تعديل مهمة : {todo.title}
        </DialogTitle>
        <DialogContent>
          <TextField
            value={updatedTodo.title}
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="عنوان المهمة "
            fullWidth
            variant="standard"
            onChange={(e)=>{
              setUpdatedTodo({...updatedTodo , title:e.target.value})
            }

            }
          />
          <TextField
            value={updatedTodo.details}
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="تفاصيل المهمة "
            fullWidth
            variant="standard"
            onChange={(e)=>{
              setUpdatedTodo({...updatedTodo , details:e.target.value})
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

      <Card
        className="toDoCard"
        sx={{
          minWidth: 275,
          background: "#AF93CE",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h5"
                style={{ textAlign: "right", fontWeight: "600" , textDecoration:todo.isCompleted?"line-through":"none" }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="h6"
                style={{
                  textAlign: "right",
                  fontWeight: "300",
                  marginTop: "3px",
                }}
              >
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {/*check to do icon*/}
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                className="iconHover"
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? "white" : "rgb(186, 219, 124)",
                  background: todo.isCompleted ? "rgb(186, 219, 124)" : "white",
                  border: "solid rgb(186, 219, 124)",
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={handleUpdateClick}
                className="iconHover"
                aria-label="delete"
                style={{
                  color: "#2E1B4B",
                  background: "white",
                  border: "solid #2E1B4B",
                 
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={handleDeleteClick}
                className="iconHover"
                aria-label="delete"
                style={{
                  color: "rgb(216, 92, 92)",
                  background: "white",
                  border: "solid rgb(216, 92, 92)",
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
