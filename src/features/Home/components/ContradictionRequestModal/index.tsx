import { Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import Button from "src/core/components/Button";
import Modal from "src/core/components/Modal";

type ContradictionRequestModalProps = {
  handleClick?: any;
  open: boolean;
  setOpen: any;
};

const ContradictionRequestModal: FC<ContradictionRequestModalProps> = ({
  handleClick,
  open,
  setOpen,
}) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <div>
      <Modal
        onClose={() => {
          setOpen(false);
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
            کشاورز گرامی،
          </Typography>
          <Typography
            className="text-justify pb-2"
            variant="h5"
            sx={{ lineHeight: 2 }}
          >
            در صورت اطمینان از اعلام مغایرت دکمه تایید را کلیک کنید.
          </Typography>

          <div className="flex flex-row gap-2 mt-2 rounded-14 items-center justify-between">
            <Button
              variant="error"
              outlined={true}
              outlinedColor={theme.palette.error.main}
              outlinedWidth={1}
              className="px-1.5 py-3 rounded-8"
              fullWidth={true}
              onClick={() => {
                setOpen(false);
                handleClick();
              }}
            >
              <Typography variant="h3">تایید</Typography>
            </Button>
            <Button
              variant="secondary"
              outlined={true}
              outlinedColor={theme.palette.primary.main}
              outlinedWidth={1}
              className="px-1.5 py-3 rounded-8"
              fullWidth={true}
              onClick={() => {
                setOpen(false);
              }}
            >
              <Typography variant="h3">انصراف</Typography>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ContradictionRequestModal;
