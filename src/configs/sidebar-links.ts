import {
	IconBuildings,
	IconBus,
	IconKey,
	IconUserCode,
	IconUsers,
} from '@tabler/icons-react';

import { PATH_ACCOUNTS, PATH_APPS } from './routes';

import { Role } from '@/types/auth';

export const SIDEBAR_LINKS = [
	{
		title: 'Apps',
		links: [
			{
				label: 'Programs',
				icon: IconBus,
				link: PATH_APPS.programs,
				roles: [Role.ADMIN],
			},
			{
				label: 'Partners',
				icon: IconBuildings,
				link: PATH_APPS.partners,
				roles: [Role.ADMIN],
			},
			{
				label: 'Referrals',
				icon: IconUsers,
				link: PATH_APPS.referrals,
				roles: [Role.PARTNER],
			},
		],
	},
	{
		title: 'Accounts',
		links: [
			{
				label: 'Profile',
				icon: IconUserCode,
				link: PATH_ACCOUNTS.profile,
				roles: [Role.ADMIN, Role.PARTNER],
			},
			{
				label: 'Change Password',
				icon: IconKey,
				link: PATH_ACCOUNTS.changePassword,
				roles: [Role.ADMIN, Role.PARTNER],
			},
		],
	},
];
