'use client';

import { ReactNode } from 'react';

import { Box, useMantineTheme } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

import HeaderNav from './components/Header';
import SidebarNav from './components/Sidebar';
import layoutClasses from './MainLayout.module.css';

type Props = {
	children: ReactNode;
};

export function MainLayout({ children }: Props) {
	const theme = useMantineTheme();
	const tablet_match = useMediaQuery('(max-width: 768px)');
	const mobile_match = useMediaQuery('(max-width: 425px)');
	const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] =
		useDisclosure();

	const shouldOverlay = mobile_match;

	// Show overlay backdrop when sidebar overlays content

	const handleSidebarToggle = () => {
		if (mobile_match) {
			// Mobile: toggle mobile menu
			toggleMobile();
		} else {
			// Desktop: toggle sidebar visibility in theme config
			toggleSidebarVisibility();
		}
	};

	const handleSidebarClose = () => {
		if (mobile_match) {
			closeMobile();
		} else {
			hideSidebar();
		}
	};

	return (
		<Box className={layoutClasses.layoutRoot}>
			{mobile_match && mobileOpened && (
				<Box className={layoutClasses.overlay} onClick={closeMobile} />
			)}

			<Box
				className={layoutClasses.sidebar}
				data-overlay={shouldOverlay}
				style={{
					width: 250,
					left: 0,
					zIndex: shouldOverlay ? 102 : 101,
				}}
			>
				<SidebarNav
					onClose={handleSidebarClose}
					showCloseButton={mobile_match}
				/>
			</Box>

			<Box
				className={layoutClasses.main}
				data-overlay={shouldOverlay}
				ml={250}
				mih="100vh"
				pos="relative"
			>
				<Box className={layoutClasses.header} py="sm" px="lg" bg="white">
					<HeaderNav
						mobileOpened={mobileOpened}
						toggleMobile={toggleMobile}
						sidebarVisible={true}
						onSidebarToggle={handleSidebarToggle}
					/>
				</Box>
				<Box className={layoutClasses.content}>{children}</Box>
			</Box>
		</Box>
	);
}
