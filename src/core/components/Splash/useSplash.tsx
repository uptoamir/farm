import { useEffect, useState } from "react";
import { useSessionStorage } from "react-use-storage";

interface BeforeInstallPromptEvent extends Event {
	readonly platforms: Array<string>;
	readonly userChoice: Promise<{
		outcome: "accepted" | "dismissed";
		platform: string;
	}>;
	prompt(): Promise<void>;
}

const useSplash = (delay = 1000): boolean => {
	// const [ isInstalled, setIsInstalled ] = useSessionStorage('isInstalled', false);
	const [ isLoaded, setIsLoaded ] = useSessionStorage("isLoaded", false);
	const [ showSplash, setShowSplash ] = useState(!isLoaded);

	useEffect(() => {
		setIsLoaded(true);
	});
	/** Must be added later for pwa installation condition to show splash
     * useEffect(() => {
	 * let beforeInstallPromptEvent: BeforeInstallPromptEvent | undefined;
     * const handleBeforeInstallPrompt = (event: Event) => {
     *     event.preventDefault();
     *     beforeInstallPromptEvent = event as BeforeInstallPromptEvent;
     *     setIsInstalled(true);
     *     beforeInstallPromptEvent.userChoice.then((choiceResult) => {
     *     setIsInstalled(choiceResult.outcome === 'accepted');
     *     });
     * };
     * window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
     * return () => {
     *     window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
     * };
     * }, [setIsInstalled]);
     */

	useEffect(
		() => {
			if (!isLoaded) {
				const timer = setTimeout(() => {
					setShowSplash(false);
				}, delay);
				return () => clearTimeout(timer);
			}
		},
		/** this is ignored because when isLoaded is added to dep array, clearTimeout gets called with each render and it freezez splash */
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ delay ]
	);

	return showSplash;
};

export default useSplash;
