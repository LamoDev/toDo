import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Stack from '@mui/material/Stack';


export default function SimpleSnackbar({open ,message}) {


  const action = (
    <React.Fragment>
      <Button color="secondary" size="small">
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
       <Stack sx={{ width: '100%' }} spacing={2}>
 
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message="Note archived"
        action={action}
      >
      <Alert severity="success">{message}</Alert>
      </Snackbar>
      </Stack>
    </div>
  );
}
