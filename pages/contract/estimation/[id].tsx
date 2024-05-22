import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import React, { useRef } from "react";
import { NextPage } from "next/types";
import { reportScroll } from "src/core/utils/gaReporters";
import Image from "next/image";
import Arrow from "public/assets/arrow.svg";
import InfoBox from "src/features/Contract/components/InfoBox";
import Button from "src/core/components/Button";
import Checkbox from "@mui/material/Checkbox";
import PageWithHeader from "src/core/components/PageWithHeader";
import Loading from "src/core/components/Loading";
import useEstimations from "src/features/Contract/utils/customHooks/useEstimations";

const Typography = dynamic(() => import("@mui/material/Typography"), {
	suspense: true
});

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Farms: NextPage = () => {
	const router = useRouter();

	const theme = useTheme();

	const ref = useRef(null);

	const { id } = router.query;

	const [
		estimationsInfo,
		isSuccess,
		isFetching,
		total_price,
		insuranceChecked,
		setInsuranceChecked,
		handleMap,
		handleSubmit
	] = useEstimations(id && id.toString());

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInsuranceChecked(event.target.checked);
	};

	return (
		<div style={{ backgroundColor: theme.palette.background.default }} className="flex flex-col flex-1">
			{isFetching && <Loading />}
			{!isFetching &&
			isSuccess &&
			estimationsInfo && (
				<div
					style={{
						backgroundColor: theme.palette.background.default
					}}
					className="flex flex-col flex-1 items-center overflow-scroll"
				>
					<div
						ref={ref}
						className="flex flex-col flex-1 justify-between w-full max-w-3xl px-4 mb-2"
						onScrollCapture={(e) => {
							reportScroll("HomePage", e);
						}}
						id="SwipeScroll"
					>
						<div>
							{isSuccess &&
								estimationsInfo.map((element: any, index: number) => (
									<InfoBox key={index} data={handleMap(element)} confirm={false} />
								))}
							<div
								className="flex justify-between rounded-12 px-2 py-6 mt-6"
								style={{ backgroundColor: theme.palette.background.grey }}
							>
								<Typography color="text.black" sx={{ fontWeight: 500 }} variant="h4" className="px-2">
									مبلغ برآوردی کل تولید
								</Typography>
								<div className="flex">
									<Typography
										color="text.primary"
										sx={{ fontWeight: 600 }}
										variant="h4"
										className="px-2"
									>
										{total_price}
									</Typography>
									<Typography
										color="text.grey"
										sx={{ fontWeight: 600 }}
										variant="h4"
										className="px-2"
									>
										تومان
									</Typography>
								</div>
							</div>
							<div
								className="flex justify-start items-center rounded-12 px-2 py-1 mt-6"
								style={{ backgroundColor: theme.palette.background.grey }}
							>
								<Checkbox
									{...label}
									checked={insuranceChecked}
									onChange={handleChange}
									color="primary"
								/>
								<Typography color="error.main" sx={{ fontWeight: 600 }} variant="h4" className="px-2">
									متقاضی استفاده از خدمات صندوق بیمه کشاورزی هستم.
								</Typography>
							</div>
						</div>
						<div className="flex w-full mt-10">
							<Button
								variant="primary"
								className="flex-1 rounded-[15px] px-4 py-2 ml-3"
								onClick={() => handleSubmit()}
							>
								تایید و ادامه
							</Button>
							<Button
								variant="inherit"
								outlined
								outlinedColor={theme.palette.primary.main}
								outlinedWidth={2}
								className="flex-1 rounded-[15px] px-4 py-2"
								onClick={() => router.back()}
							>
								بازگشت
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PageWithHeader(Farms, "right", "برآورد هزینه", <Image src={Arrow} alt="arrow" />, "back");
