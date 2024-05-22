import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Image from "next/image";
import Icon from "../Icon";

interface StyledTabProps {
  label: string;
  logo?: string;
  iconName?: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab
    disableRipple
    {...props}
    label={props.label}
    icon={
      (props.iconName || props.logo) && (
        <div
          className="flex items-center justify-center rounded-full overflow-hidden"
          style={{ width: 32, height: 32 }}
        >
          {props.logo && (
            <Image
              src={props.logo}
              height={28}
              width={28}
              className="m-2 p-0.5"
              alt="logo"
              style={{
                minHeight: 28,
                minWidth: 28,
                maxHeight: 28,
                maxWidth: 28,
              }}
            />
          )}
          {props.iconName && (
            <Icon icon={props?.iconName} size={18} color={"red"} />
          )}
        </div>
      )
    }
    iconPosition="start"
  />
))(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(12),
  color: theme.palette.text.disabled,
  minWidth: "8rem",
  "&.Mui-selected": {
    color: theme.palette.text.primary,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

export default StyledTab;
