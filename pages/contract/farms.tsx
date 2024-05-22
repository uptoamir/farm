import { useTheme } from "@mui/material/styles";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { reportScroll } from "src/core/utils/gaReporters";
import Image from "next/image";
import Arrow from "public/assets/arrow.svg";
import InfoBox from "src/features/Contract/components/InfoBox";
import Loading from "src/core/components/Loading";
import CultivationDeterminationBottomSheet from "src/features/Home/Containers/CultivationDeterminationBottomSheet";
import useFarmsInfo from "src/features/Contract/utils/customHooks/useFarmsInfo";
import PageWithHeader from "src/core/components/PageWithHeader";
import ContradictionConfirmationModal from "src/features/Home/components/ContradictionConfirmationModal";
import { useContractContradictMutation } from "src/features/Contract/api/hooks";
import { HOME } from "src/core/routes";

const Farms: NextPage = () => {
  const theme = useTheme();

  const ref = useRef(null);

  const router = useRouter();

  const [
    farmsInfo,
    isFetching,
    isSuccess,
    open,
    sections,
    setOpen,
    handleMap,
    handleChange,
    handleOpen,
    handleSubmit,
  ] = useFarmsInfo();

  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);

  const [openRequest, setOpenRequest] = useState<boolean>(false);

  const { mutate: postContractContradict } = useContractContradictMutation();

  const handleSubmitContradict = (id: string | number) => {
    postContractContradict(
      {
        id,
      },
      {
        onSuccess() {
          setOpenRequest(false);
          setOpenConfirmation(true);
        },
      }
    );
  };

  const handleSubmitContradiction = (id: string | number) => {
    handleSubmitContradict(id);
  };

  const handleContradictionConfirmation = () => {
    router.push(HOME);
  };

  return (
    <div
      style={{ backgroundColor: theme.palette.background.default }}
      className="flex flex-col flex-1"
    >
      {isFetching && <Loading />}
      {!isFetching && isSuccess && farmsInfo && (
        <div
          style={{
            backgroundColor: theme.palette.background.default,
          }}
          className="flex flex-col flex-1 items-center overflow-hidden"
        >
          <div
            ref={ref}
            className="flex flex-col flex-1 justify-start w-full max-w-3xl px-4 mb-2 no-scrollbar"
            onScrollCapture={(e) => {
              reportScroll("HomePage", e);
            }}
            id="SwipeScroll"
          >
            {handleMap(farmsInfo).map((farmInfoItem: InfoBoxItem) => (
              <InfoBox
                key={farmInfoItem.id}
                data={[farmInfoItem]}
                confirm={true}
                handleOpen={handleOpen}
                openRequest={openRequest}
                setOpenRequest={setOpenRequest}
                handleSubmitContradiction={handleSubmitContradiction}
              />
            ))}
            <ContradictionConfirmationModal
              open={openConfirmation}
              setOpen={setOpenConfirmation}
              handleClick={handleContradictionConfirmation}
            />
            <CultivationDeterminationBottomSheet
              sections={sections}
              open={open}
              setOpen={setOpen}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PageWithHeader(
  Farms,
  "right",
  "اطلاعات زمین کشاورزی",
  <Image src={Arrow} alt="arrow" />,
  "back"
);
