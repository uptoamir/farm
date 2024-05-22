import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";
import Weather from "public/assets/weather.svg";
import Location from "public/assets/location.svg";
import Calendar from "public/assets/calendar.svg";
import Degree from "public/assets/degree.svg";
import Image from "next/image";

const WeatherCard: FC = () => {
  const theme = useTheme();

  return (
    <div className="h-16 flex justify-between items-center w-full py-4 px-4 mt-6 rounded-2xl border-1 border-primary">
      <div className="flex">
        <div
          style={{
            backgroundColor: theme.palette.background.light,
          }}
          className="w-10  h-10  ml-4 p-2 rounded-full flex justify-center items-center"
        >
          <Image src={Weather} width={40} height={32} alt="Weather" />
        </div>
        <div className="flex flex-col">
          <Typography
            color="text.black"
            variant="h3"
            sx={{ marginBottom: "0.5rem" }}
          >
            هواشناسی
          </Typography>
          <Typography color="primary" variant="h6">
            50% احتمال بارش باران
          </Typography>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col border-l-1 justify-center items-start my-2 border-primary pl-4 ">
          <div className="flex justify-center items-center mb-1">
            <Image src={Location} className="w-2" alt="location" />
            <Typography
              color="text.black"
              variant="h7"
              sx={{ marginRight: "0.5rem", fontWeight: 400 }}
            >
              آذربایجان غربی ارومیه
            </Typography>
          </div>
          <div className="flex">
            <Image src={Calendar} className="w-2" alt="calendar" />
            <Typography
              color="text.black"
              variant="h7"
              sx={{ marginRight: "0.5rem" }}
            >
              چهارشنبه، 12 بهمن
            </Typography>
          </div>
        </div>
        <div className="relative flex justify-center items-center pr-4">
          <Image
            src={Degree}
            className="absolute top-2 right-2 "
            alt="degree"
          />
          <Typography
            color="primary"
            variant="h1"
            sx={{
              marginRight: "0.25rem",
              fontSize: { xs: "42px", sm: "48px" },
              fontFamily: "dana-FaNum",
              fontWeight: "600",
              marginBottom: "-1rem",
            }}
            className="flex justify-center items-center"
          >
            6
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
