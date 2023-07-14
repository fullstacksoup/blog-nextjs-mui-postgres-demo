import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function DialogUpdateBlogPost(props: any) {  
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>(props.data);
  const [title, setTitle] = useState(props.data.title);
  const [body, setBody] = useState(props.data.body);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon color="primary" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>
          Edit <i style={{ color: "blue" }}>{data.title}</i>
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Stack spacing={2} direction="column">
            <TextField
              type="text"
              id="standard-basic"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              type="text"
              multiline
              rows={4}
              id="standard-basic"
              label="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={(e) =>
              props.handleUpdateRecord(props.data.id, title, body)
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
