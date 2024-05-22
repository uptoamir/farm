import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import React, { Suspense } from "react";
import { NextPage } from "next/types";

const Typography = dynamic(() => import("@mui/material/Typography"), {
	suspense: true
});

const PageHeader = dynamic(() => import("src/core/components/PageHeader"), {
	suspense: true
});

interface onClickMapInterface {
	[key: string]: any;
}

const PageWithHeader: (
	Page: NextPage,
	side?: string,
	text?: string,
	icon?: any,
	clickFunc?: string
) => NextPage | void = (Page, side = "left", text = "", icon = "", clickFunc = "") => {
	const Component: NextPage = (props) => {
		const theme = useTheme();

		const router = useRouter();

		const onClickMap: onClickMapInterface = {
			back: function () {
				router.back();
			}
		};

		return (
			<div
				className="relative flex flex-col justify-start pb-4 min-h-screen"
				style={{
					backgroundColor: theme.palette.background.default
				}}
			>
				<div
					className="flex flex-col flex-1"
					style={{
						backgroundColor: theme.palette.background.paper
					}}
				>
					<Suspense>
						<PageHeader
							side={side}
							renderSide={() => (
								<div>
									<Typography
										color="text.black"
										sx={{ fontWeight: 600 }}
										variant="h4"
										className="px-2"
									>
										{text}
									</Typography>
								</div>
							)}
							renderMain={() => (
								<div
									className="flex flex-row items-center max-w-6 cursor-pointer"
									onClick={() => clickFunc.length && onClickMap[clickFunc]()}
								>
									<Suspense>{icon}</Suspense>
								</div>
							)}
						/>
					</Suspense>
					<div className="flex flex-col flex-1 mt-16">
						<Page {...props} />
					</div>
				</div>
			</div>
		);
	};

	if (Page.getInitialProps) {
		Component.getInitialProps = async (context) => {
			if (Page.getInitialProps) return Page.getInitialProps(context);
		};
	}

	return Component;
};

export default PageWithHeader;
