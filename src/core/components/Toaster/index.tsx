import React, { FC, RefAttributes, RefObject, SyntheticEvent } from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { hideToastrMessage } from "src/core/redux/slices/toastrSlice";
import { useToastr } from "src/core/utils/customHooks/toastr";
import { useDispatch } from "react-redux";
/** TODO : remove ts ignore */
/* eslint-disable react/display-name */
//@ts-ignore
// eslint-disable-next-line no-undef
const Alert: IntrinsicAttributes & RefAttributes<HTMLDivElement> =
  React.forwardRef(
    (
      props,
      ref: // eslint-disable-next-line no-unused-vars
      | ((instance: HTMLDivElement | null) => void)
        | RefObject<HTMLDivElement>
        | null
        | undefined
    ) => {
      return (
        <MuiAlert
          className="dir-ltr"
          elevation={6}
          ref={ref}
          variant="filled"
          icon={false}
          {...props}
        />
      );
    }
  );

const timeoutDelay = 6000;

// a toastr message from material snackbar that uses for errors, infos, and etc.
// to show a toastr message dispatch an object with message and type props into redux
// dispatch(setToastrMessage({message: 'sample toastr message', type: 'error'}));
// its styles override in material-override.scss file
const Toastr: FC = () => {
  const { message, visibility, type } = useToastr();

  const dispatch = useDispatch();

  const handleClose = (
    event: Event | SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideToastrMessage());
  };

  return (
    <Snackbar
      open={visibility}
      onClose={handleClose}
      autoHideDuration={timeoutDelay}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        elevation={6}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
export default Toastr;
