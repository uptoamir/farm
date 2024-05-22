import { useState, useEffect } from "react";
import { getFarmsInfoQuery } from "src/features/Contract/api/hooks";
import {
  setFarms,
  setChosenFarm,
} from "src/core/redux/slices/userFarmsReducer";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { INFOCHECK } from "src/core/routes";
import { useQueryClient } from "@tanstack/react-query";

export default function useFarmsInfo() {
  const router = useRouter();

  const dispatch = useDispatch();
  const { isFetching, isSuccess, data: farmsInfo } = getFarmsInfoQuery();
  const [sections, setSections] = useState<Array<FarmSection>>();

  const queryClient = useQueryClient();

  const [farmID, setFarmID] = useState<string>();

  const [open, setOpen] = useState<boolean>(false);

  const handleMap: (farmsInfo: GetFarmsResponse) => Array<InfoBoxItem> = (
    farmsInfo
  ) => {
    return farmsInfo.results.map((farm: Farm) => ({
      title: "",
      id: farm.id,
      content: [
        {
          key: "نام مرکز جهاد کشاورزی",
          value: farm.jahad_name,
          columns: true,
        },
        {
          key: "نوع کشت",
          value: farm.cultivation_type.name,
          columns: true,
        },
        {
          key: "نام کالا",
          value: farm.product.name,
          columns: true,
        },
        {
          key: "آدرس زمین کشاورزی",
          value: farm.address.location,
          columns: false,
        },
      ],
    }));
  };

  useEffect(() => {
    if (farmsInfo) {
      dispatch(setFarms(farmsInfo.results));
    }
  }, [farmsInfo]);

  const handleOpen = (id: string) => {
    if (!farmsInfo || !farmsInfo.results) return;
    setFarmID(id);
    const selectedFarm: Farm = farmsInfo.results.find(
      (farm: Farm) => farm.id === id
    );
    if (!selectedFarm) return;
    const selectedFarmSections: Array<FarmSection> = selectedFarm.sections.map(
      (item: FarmSection) => ({
        ...item,
        value: item.min_capacity,
      })
    );
    setSections(selectedFarmSections);
    setOpen(true);
  };

  const handleChange = (id: string, value: number) => {
    if (!sections) return;
    const temp = [...sections];
    const index = temp.findIndex((element) => element.id === id);
    if (index > -1) {
      temp[index].value = value;
      setSections(temp);
    }
  };

  const handleSubmit = () => {
    if (farmID === undefined) return;
    const index = farmsInfo.results.findIndex(
      (farms: any) => farms.id === farmID
    );
    const temp = { ...farmsInfo.results[index] };
    temp.sections = sections;
    dispatch(setChosenFarm(temp));
    router.push(INFOCHECK);
  };

  return [
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
  ];
}
