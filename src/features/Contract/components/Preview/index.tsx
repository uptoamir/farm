import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";
import Card from "src/core/components/Card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useReduxSelector } from "src/core/utils/customHooks/reduxHooks";

type PreviewProps = {
  product?: string;
  preview?: string;
};

const Preview: FC<PreviewProps> = ({ product, preview = "" }) => {
  const theme = useTheme();

  const isLightMode =
    useReduxSelector((state) => state.darkMode).name === "light";

  return (
    <Card
      className="flex flex-col justify-center items-center w-full rounded-2xl border-1 border-primary"
      style={{}}
    >
      <div className="flex flex-col w-full pt-4">
        <Typography
          color="text.black"
          variant="h3"
          className="px-6 text-center"
          sx={{
            fontSize: { xs: "14px", sm: "16px" },
            fontWeight: 500,
          }}
        >
          بسمه تعالی
        </Typography>
        <Typography
          color="text.black"
          variant="h3"
          className="px-6 text-center"
          sx={{
            fontSize: { xs: "14px", sm: "16px" },
            marginY: "1.5em",
          }}
        >
          قرارداد خرید {product} در قالب کشت قراردادی
        </Typography>
        <hr className="w-full border-1 border-dashed border-[#C3C6D0]" />
        <div
          className="flex flex-col rounded-10 overflow-scroll dir-rtl px-4 text-justify max-h-[22rem]"
          style={{
            backgroundColor: theme.palette.background.paper,
            background: "scroll",
          }}
        >
          <ReactMarkdown
            className={`markdown ${
              !isLightMode ? "light" : "dark"
            } !font-light`}
            remarkPlugins={[remarkGfm]}
          >
            {preview}
          </ReactMarkdown>
        </div>
        {/* </Typography> */}
      </div>
    </Card>
  );
};

export default Preview;
