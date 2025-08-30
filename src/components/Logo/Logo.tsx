import Image from 'next/image';
import Link from 'next/link';

import { Group, UnstyledButton, UnstyledButtonProps } from '@mantine/core';

import classes from './Logo.module.css';

type LogoProps = {
	href?: string;
	showText?: boolean;
} & UnstyledButtonProps;

const Logo = ({ href, ...others }: LogoProps) => {
	return (
		<UnstyledButton
			className={classes.logo}
			component={Link}
			href={href || '/'}
			{...others}
		>
			<Group gap="xs">
				<Image
					src="/logo-no-background.png"
					width={200}
					height={100}
					alt="logo"
					objectFit="cover"
				/>
			</Group>
		</UnstyledButton>
	);
};

export default Logo;
