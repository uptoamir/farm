import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { FC, useState } from "react";
import Card from "src/core/components/Card";
import Button from "src/core/components/Button";
import ContradictionRequestModal from "src/features/Home/components/ContradictionRequestModal";

type InfoBoxProps = {
  data: Array<InfoBoxItem>;
  confirm?: boolean;
  openRequest?: boolean;
  setOpenRequest?: any;
  handleOpen?: (id: string | number) => void;
  handleSubmitContradiction?: (id: string | number) => void;
  borderColor?: string;
};

const InfoBox: FC<InfoBoxProps> = ({
  data,
  confirm = false,
  openRequest = false,
  setOpenRequest,
  handleOpen,
  handleSubmitContradiction,
  borderColor = "primary",
}) => {
  const theme = useTheme();

  return (
    <Card
      className={`flex flex-col justify-center items-center w-full my-5 rounded-xl border-1 border-${borderColor}`}
      style={{}}
    >
      <div className="flex flex-col w-full pt-1">
        {data.map((element: InfoBoxItem, index: number) => {
          return (
            <div key={index}>
              <Typography
                color="text.black"
                variant="h3"
                className="px-4"
                sx={{
                  fontSize: { xs: "14px", sm: "16px" },
                  marginTop: "1.5em",
                }}
              >
                {element.title}
              </Typography>
              {element.content.map(
                (item: InfoBoxItemContent, index: number) => {
                  if (item.columns) {
                    return (
                      <div key={index} className="flex w-full my-5 px-4">
                        <div className="text-box">
                          <Typography
                            color="text.secondary"
                            variant="h4"
                            sx={{
                              fontSize: { xs: "12px", sm: "14px" },
                              fontWeight: 600,
                            }}
                          >
                            {item.key}
                          </Typography>
                        </div>
                        <div className="dots-box" />
                        <div className="flex text-box">
                          <Typography
                            color={
                              item.color ? `text.${item.color}` : "text.black"
                            }
                            variant="h3"
                            sx={{
                              fontSize: { xs: "14px", sm: "16px" },
                              fontWeight: 600,
                            }}
                          >
                            {item.value}
                          </Typography>
                          {item.unit !== "" && (
                            <Typography
                              color="text.grey"
                              variant="h4"
                              sx={{
                                fontSize: { xs: "12px", sm: "14px" },
                                marginRight: "0.5rem",
                              }}
                            >
                              {item.unit}
                            </Typography>
                          )}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={index}
                        className="flex flex-col w-full my-5 px-4"
                      >
                        <div className="">
                          <Typography
                            color="text.secondary"
                            variant="h4"
                            sx={{
                              fontSize: { xs: "12px", sm: "14px" },
                              fontWeight: 600,
                            }}
                          >
                            {item.key}
                          </Typography>
                        </div>
                        <div className="mt-4">
                          <Typography
                            color="text.black"
                            variant="h3"
                            sx={{ fontSize: { xs: "14px", sm: "16px" } }}
                          >
                            {item.value}
                          </Typography>
                        </div>
                      </div>
                    );
                  }
                }
              )}

              {confirm && (
                <ContradictionRequestModal
                  open={openRequest}
                  setOpen={setOpenRequest}
                  handleClick={() =>
                    handleSubmitContradiction &&
                    element.id &&
                    handleSubmitContradiction(element.id)
                  }
                />
              )}
              {confirm && (
                <div className="flex w-full">
                  <Button
                    variant="error"
                    outlined
                    outlinedColor={theme.palette.error.main}
                    outlinedWidth={1.5}
                    className="flex-1 rounded-br-[11px] px-4 py-2 -mr-[1px] -mb-[1px]"
                    fontSize={14}
                    onClick={() => setOpenRequest(true)}
                  >
                    اعلام مغایرت
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-1 rounded-bl-[11px] px-4 py-2 -ml-[1px] -mb-[1px]"
                    outlinedWidth={1.5}
                    fontSize={14}
                    onClick={() =>
                      handleOpen && element.id && handleOpen(element.id)
                    }
                  >
                    تایید اطلاعات
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default InfoBox;
