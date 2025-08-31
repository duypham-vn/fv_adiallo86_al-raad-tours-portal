import { ActionIcon, Box, Flex, Group, ScrollArea, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { IconX } from '@tabler/icons-react';

import Logo from '@components/Logo/Logo';
import UserProfileButton from '@components/UserButton';

import { ADMIN_EMAIL } from '@configs/_constant';
import { SIDEBAR_LINKS } from '@configs/sidebar-links';

import { useAuth } from '@hooks/useAuth';

import { LinksGroup } from '../NavLinks';

import classes from './Sidebar.module.css';

import { Role } from '@/types/auth';

type NavigationProps = {
	onClose: () => void;
	showCloseButton?: boolean;
};

const SidebarNav = ({ onClose, showCloseButton = false }: NavigationProps) => {
	const tablet_match = useMediaQuery('(max-width: 768px)');

	const { user } = useAuth();

	const isAllowed = (item: any) => {
		const role = user?.email === ADMIN_EMAIL ? Role.ADMIN : Role.PARTNER;

		return item.roles.includes(role);
	};

	const links = SIDEBAR_LINKS.map((m) => (
		<Box key={m.title} pl={0} mb="md">
			<Text
				tt="uppercase"
				size="xs"
				pl="md"
				fw={500}
				mb="sm"
				className={classes.linkHeader}
			>
				{m.title}
			</Text>
			{m.links.filter(isAllowed).map((item) => (
				<LinksGroup
					key={item.label}
					{...item}
					closeSidebar={() => {
						setTimeout(() => {
							onClose();
						}, 250);
					}}
				/>
			))}
		</Box>
	));

	return (
		<div className={classes.navbar}>
			<div className={classes.header}>
				<Flex justify="space-between" align="center" gap="sm">
					<Group
						justify="space-between"
						style={{ flex: tablet_match ? 'auto' : 1 }}
					>
						<Logo className={classes.logo} />
					</Group>
					{showCloseButton && (
						<ActionIcon onClick={onClose} variant="transparent" size="sm">
							<IconX size={18} />
						</ActionIcon>
					)}
				</Flex>
			</div>

			<ScrollArea className={classes.links}>
				<div className={classes.linksInner}>{links}</div>
			</ScrollArea>

			<div className={classes.footer}>
				<UserProfileButton
					email={user?.email ?? ''}
					image={user?.user_metadata.avatar_url ?? ''}
					name={user?.user_metadata.full_name ?? ''}
					showText={true}
					p={0}
				/>
			</div>
		</div>
	);
};

export default SidebarNav;
