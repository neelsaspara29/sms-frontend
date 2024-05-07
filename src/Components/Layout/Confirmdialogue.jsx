import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  show,
  close,
  title,
  alertMessage,
  onAgree,
}) {
  return (
    <div>
      <Dialog
        open={show}
        TransitionComponent={Transition}
        keepMounted
        onClose={close}
        aria-describedby="alert-dialog-slide-description"
      >
        <div style={{ backgroundColor: "#FFEDF5", padding: "12px" }}>
          <DialogTitle
            style={{ color: "#851B4A" }}
            sx={{ textTransform: "uppercase" }}
          >
            {title} ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              color={"CaptionText"}
              id="alert-dialog-slide-description"
            >
              {alertMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={close}
              sx={{ background: "#8B0000", color: "white" }}
            >
              Cancle
            </Button>
            <Button
              onClick={() => {
                onAgree();
                close();
              }}
              sx={{ background: "#008000", color: "white" }}
              color="success"
            >
              Delete
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
