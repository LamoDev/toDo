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
import { useTodos,useTodosDispatch } from "../contexts/todosContext";
import { SnackbarContext, useSnackbar } from "../contexts/SnackbarContext";

export default function ToDo({ todo, openDeleteDialog, openUpdateDialog }) {
  // contexts
const {showHideSnackbar}=useSnackbar();

const dispatch=useTodosDispatch()

// handlers 
  function handleDeleteClick() {
    openDeleteDialog(todo);
    
  }
  function handleUpdateClick() {
    openUpdateDialog(todo);
  }

  function handleCheckClick() {
    dispatch({type:"toggledCompleated" , payload:todo})
    showHideSnackbar("تم التعديل")
  }
  return (
    <>
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
                style={{
                  textAlign: "right",
                  fontWeight: "600",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
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
