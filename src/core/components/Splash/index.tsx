import { useTheme } from '@mui/material';
import React, { FC } from 'react';
import Icon from 'src/core/components/Icon';
import { useWindowSize } from 'src/core/utils/customHooks/useWindowSize';
import useSplash from './useSplash';

type SplashProps = {
  showSplash: boolean;
	children: React.ReactNode;
};
const Splash: FC<SplashProps> = ({ showSplash, children }) => {
	const windowSize = useWindowSize();
	const theme = useTheme();

	return (
		<div>
			{showSplash ? (
				<div
					className="fixed top-0 bottom-0 z-1600 flex flex-col justify-around gap-5 items-center p-3 no-scrollbar overflow-scroll"
					style={{
						backgroundColor: theme.palette.primary.main,
						height: windowSize.height,
						width: windowSize.width
					}}
				>
					<Icon icon="splash_logo" size={260} />
					<div className="absolute bottom-0">
						<Icon icon="splash_bottom_logo" size={100} />
					</div>
				</div>
			) : (
				children
			)}
		</div>
	);
};

export default Splash;
