import { Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import Button from "src/core/components/Button";
import Modal from "src/core/components/Modal";

type FinalizedContractModalProps = {
  description?: string;
  trackingNumber?: number;
  downloadLink?: string;
  open: boolean;
  setOpen: any;
};

const FinalizedContractModal: FC<FinalizedContractModalProps> = ({
  description = "درخواست شما به بانک کشاورزی ارسال گردید و پس از بررسی نتیجه آن از طریق پیامک اطلاع رسانی خواهد شد. ",
  trackingNumber = 9875542545,
  downloadLink = "/",
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
          router.push("/home");
        }}
        title="انعقاد قرارداد"
        show={open}
        variant="modal"
        snapHeight={"100vh"}
      >
        <div className="flex flex-col gap-3" style={{ paddingBottom: "35px" }}>
          <Button
            iconName="finalizedContract"
            className="mx-auto"
            iconSize={155}
          />
          <Typography
            color={theme.palette.primary.main}
            variant="h3"
            className="mx-auto pt-4 pb-2 text-center"
          >
            قرارداد شما با موفقیت ثبت شد.
          </Typography>
          <Typography
            className="text-justify pb-2"
            variant="h5"
            sx={{ lineHeight: 2 }}
          >
            {description}
          </Typography>
          <div
            className="flex flex-row gap-2 py-4 px-5 mt-2 mb-3 rounded-14 items-center justify-between"
            style={{ background: theme.palette.secondary.light }}
          >
            <Typography className="text-center" variant="body1">
              شماره رهگیری
            </Typography>
            <Typography color={theme.palette.primary.main} variant="h3">
              {trackingNumber}
            </Typography>
          </div>
          <Link href={downloadLink}>
            <Button
              variant="inherit"
              className="px-1.5 py-3 mb-2 rounded-8"
              fullWidth={true}
              iconName="download"
              iconSize={22}
              isIconRight={true}
              outlined={true}
              outlinedColor={theme.palette.text.warning}
              isCenter={true}
            >
              <Typography color={theme.palette.text.warning} variant="h3">
                دریافت نسخه چاپی قرارداد
              </Typography>
            </Button>
          </Link>

          <Button
            variant="secondary"
            outlined={true}
            outlinedColor={theme.palette.primary.main}
            outlinedWidth={1}
            className="px-1.5 py-3 rounded-8"
            fullWidth={true}
            onClick={() => {
              setOpen(false);
              router.push("/home");
            }}
          >
            <Typography variant="h3">بازگشت به صفحه اول</Typography>
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default FinalizedContractModal;
