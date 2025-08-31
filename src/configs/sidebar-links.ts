import {
	IconBuildings,
	IconBus,
	IconKey,
	IconUserCode,
	IconUsers,
} from '@tabler/icons-react';

import { PATH_ACCOUNTS, PATH_APPS } from './routes';

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
			{ label: 'Programs', icon: IconBus, link: PATH_APPS.programs },
			{ label: 'Partners', icon: IconBuildings, link: PATH_APPS.partners },
			{ label: 'Referrals', icon: IconUsers, link: PATH_APPS.referrals },
		],
	},
	{
		title: 'Accounts',
		links: [
			{ label: 'Profile', icon: IconUserCode, link: PATH_ACCOUNTS.profile },
			{
				label: 'Change Password',
				icon: IconKey,
				link: PATH_ACCOUNTS.changePassword,
			},
		],
	},
];
