import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { CONTRACTPREVIEW } from "src/core/routes";
import {
  getEstimationsQuery,
  useInitailContractMutation,
} from "src/features/Contract/api/hooks";
import { setEstimations } from "src/core/redux/slices/userFarmsReducer";

export default function useEstimations(id: string | undefined) {
  const router = useRouter();

  const [insuranceChecked, setInsuranceChecked] = useState(true);

  const dispatch = useDispatch();

  const { mutate: patchInitialContract } = useInitailContractMutation();

  const {
    data: estimationsInfo,
    isSuccess,
    isFetching,
  } = getEstimationsQuery({
    id: id,
  });

  useEffect(() => {
    if (id && isSuccess) {
      dispatch(setEstimations(estimationsInfo));
    }
  }, [estimationsInfo]);

  const handleMap = (estimationInfo: EstimationSection) => {
    return [
      {
        title: "",
        content: [
          {
            key: "نام کالا",
            value: estimationInfo.section?.product?.name,
            columns: true,
            unit: "",
          },
          {
            key: "سطح زیرکشت",
            value: estimationInfo.cultivation_area,
            columns: true,
            unit: "هکتار",
          },
          {
            key: "برآورد تولید",
            value: estimationInfo.production_estimation,
            columns: true,
            unit: "کیلوگرم",
          },
          {
            key: "قیمت واحد کالا",
            value: estimationInfo.unit_price,
            columns: true,
            unit: "تومان",
          },
          {
            key: "مبلغ برآوردی تولید",
            value: estimationInfo.total_price,
            columns: true,
            unit: "تومان",
            color: "primary",
          },
        ],
      },
    ];
  };

  const handleSubmit = () => {
    patchInitialContract(
      {
        data: {
          id: id,
          use_insurance: insuranceChecked,
        },
      },
      {
        onSuccess() {
          router.push(`${CONTRACTPREVIEW}/${id}`);
        },
      }
    );
  };

  const total_price = isSuccess
    ? estimationsInfo.reduce(
        (accumulator: any, currentValue: any) =>
          accumulator + currentValue.total_price,
        0
      )
    : 0;

  return [
    estimationsInfo,
    isSuccess,
    isFetching,
    total_price,
    insuranceChecked,
    setInsuranceChecked,
    handleMap,
    handleSubmit,
  ];
}
