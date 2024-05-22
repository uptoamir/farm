import { Typography, useTheme } from "@mui/material";
import { FC } from "react";
import Button from "src/core/components/Button";
import Modal from "src/core/components/Modal";

type ContradictionConfirmationModalProps = {
  handleClick?: any;
  open: boolean;
  setOpen: any;
};

const ContradictionConfirmationModal: FC<
  ContradictionConfirmationModalProps
> = ({ handleClick, open, setOpen }) => {
  const theme = useTheme();

  return (
    <div>
      <Modal
        onClose={() => {
          setOpen(false);
          handleClick();
        }}
        title="اعلام مغایرت"
        show={open}
        variant="modal"
        snapHeight={"100vh"}
      >
        <div
          className="flex flex-col gap-3 px-5"
          style={{ paddingBottom: "35px" }}
        >
          <Typography variant="h5" className="mx-auto pt-4">
            کشاورز گرامی!
          </Typography>
          <Typography
            className="text-justify pb-1"
            variant="h5"
            sx={{ lineHeight: 1.2 }}
          >
            در صورتی که اطلاعات اعلام شده مغایرت دارد لطفا به مرکز جهاد کشاورزی
            جهت اصلاح اطلاعات مراجعه فرمایید.
          </Typography>
          <Typography
            className="text-justify pb-1"
            variant="h5"
            sx={{ lineHeight: 1.2 }}
          >
            باتشکر
          </Typography>
          <Button
            variant="secondary"
            outlined={true}
            outlinedColor={theme.palette.primary.main}
            outlinedWidth={1}
            className="px-1.5 py-3 rounded-8"
            fullWidth={true}
            onClick={() => {
              setOpen(false);
              handleClick();
            }}
          >
            <Typography variant="h3">متوجه شدم</Typography>
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ContradictionConfirmationModal;
