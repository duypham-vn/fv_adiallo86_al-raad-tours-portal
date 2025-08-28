'use client';

import Image from 'next/image';

import { ReactNode } from 'react';

import { Center, Stack } from '@mantine/core';

type AuthProps = {
	children: ReactNode;
};

function SignInLayout({ children }: AuthProps) {
	return (
		<Center
			style={{
				height: '100vh',
				width: '100vw',
			}}
		>
			<Stack>
				<Center>
					<Image
						src="/logo-no-background.png"
						alt="Al Raad Tours & Travel logo"
						width={200}
						height={100}
						style={{ objectFit: 'contain' }}
					/>
				</Center>
				{children}
			</Stack>
		</Center>
	);
}

export default SignInLayout;
