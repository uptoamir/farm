import { useTheme } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { reportOnClick } from "src/core/utils/gaReporters";
import SingleItem from "./SingleItem";

export type ItemDetail =
  | {
      title?: string | null;
      subTitle?: string | null;
      logo?: string | null;
    }
  | undefined;

type TestPropsType = {
  details: ItemDetail[];
  // eslint-disable-next-line no-unused-vars
  setCurrentList: (p: any) => void;
};

const DropDown: FC<TestPropsType> = ({ details, setCurrentList }) => {
  const [currentItem, setCurrentItem] = useState(details?.[0]);
  const [showItems, setShowItems] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const onBodyClick = (e: Event) => {
      if (ref?.current?.contains(e.target as HTMLInputElement)) {
        return;
      }

      setShowItems(false);
    };
    window.addEventListener("click", onBodyClick);

    return () => {
      window.removeEventListener("click", onBodyClick);
    };
  }, []);

  useEffect(() => {
    setCurrentList(currentItem);
  }, [currentItem]);

  return (
    <div ref={ref} className="relative">
      {currentItem && (
        <div>
          <SingleItem
            onClick={() => {
              reportOnClick("DropdownHeader");
              setShowItems(!showItems);
            }}
            detail={currentItem}
            showExpandIcon={true}
            rotateExpandIcon={showItems}
            bgColor={theme.palette.background.paper}
            borderColor={theme.palette.text.grey}
          />
          <div>
            <div
              className="flex flex-col justify-center w-full absolute z-10"
              style={{
                left: 0,
                right: 0,
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
              }}
            >
              {showItems &&
                details
                  .filter((item) => item?.title !== currentItem.title)
                  .map((item, idx) => {
                    return (
                      <SingleItem
                        key={idx}
                        detail={item}
                        onClick={() => {
                          reportOnClick("DropdownList");
                          setCurrentItem(item);
                          setShowItems(false);
                        }}
                        lastItem={idx === details.length - 2}
                        bgColor={theme.palette.background.paper}
                        borderColor={theme.palette.divider}
                      />
                    );
                  })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DropDown;
