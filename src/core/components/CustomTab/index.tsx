import React, { FC } from "react";
import StyledTab from "./StyledTab";
import StyledTabs from "./StyledTabs";

type CustomTabProps = {
  items: string[];
  logos?: string[];
  icons?: string[];
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: React.SyntheticEvent, newValue: number) => void;
  initialTab?: number;
  currentTab: number;
  isCentered?: string;
};

const CustomTab: FC<CustomTabProps> = ({
  items,
  onChange,
  currentTab,
  isCentered,
  logos,
  icons,
}) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onChange?.(event, newValue);
  };

  return (
    <StyledTabs
      iscentered={isCentered}
      value={currentTab}
      onChange={handleChange}
      logos={logos}
      icons={icons}
    >
      {items.map((ele, idx) => (
        <StyledTab
          logo={logos && logos[idx]}
          iconName={icons && icons[idx]}
          label={ele}
          key={idx}
        />
      ))}
    </StyledTabs>
  );
};

export default CustomTab;
