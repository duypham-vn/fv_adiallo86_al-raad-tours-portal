import { IconUserCircle, IconUserCode } from '@tabler/icons-react';

import { PATH_APPS } from './routes';

export const SIDEBAR_LINKS = [
	// {
	// 	title: 'Dashboard',
	// 	links: [
	// 		{ label: 'Default', icon: IconChartBar, link: PATH_DASHBOARD.default },
	// 		{
	// 			label: 'Analytics',
	// 			icon: IconChartInfographic,
	// 			link: PATH_DASHBOARD.analytics,
	// 		},
	// 		{ label: 'SaaS', icon: IconChartArcs3, link: PATH_DASHBOARD.saas },
	// 	],
	// },
	{
		title: 'Apps',
		links: [
			{ label: 'Profile', icon: IconUserCircle, link: PATH_APPS.profile },
			{ label: 'Referrals', icon: IconUserCode, link: PATH_APPS.referrals },
		],
	},
];
