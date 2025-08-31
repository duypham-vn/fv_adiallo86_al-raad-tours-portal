import { usePathname } from 'next/navigation';

import { ADMIN_EMAIL } from '@configs/_constant';
import { SIDEBAR_LINKS } from '@configs/sidebar-links';

import { useAuth } from './useAuth';

import { Role } from '@/types/auth';

export const useCheckAllowPage = () => {
	const { user } = useAuth();
	const pathname = usePathname();

	const role = user?.email === ADMIN_EMAIL ? Role.ADMIN : Role.PARTNER;

	if (!user) return true;

	let linkConfig: any = null;

	SIDEBAR_LINKS.forEach((link) => {
		link.links.forEach((link) => {
			if (link.link === pathname) {
				linkConfig = link;
			}
		});
	});

	console.log('Link config', linkConfig?.roles?.includes(role));

	return linkConfig?.roles?.includes(role) ?? false;
};
