'use client';

import { redirect } from 'next/navigation';

import { Anchor, Box, Container, Stack } from '@mantine/core';

import PageHeader from '@components/PageHeader';

import { PATH_APPS, PATH_DASHBOARD } from '@configs/routes';

import { useCheckAllowPage } from '@hooks/useCheckAllowPage';

import { CreateProgramButton } from './components/CreateProgramButton';
import { ProgramsTable } from './components/ProgramsTable';

const items = [
	{ title: 'Dashboard', href: PATH_DASHBOARD.default },
	{ title: 'Apps', href: PATH_APPS.root },
	{ title: 'Programs', href: PATH_APPS.programs },
].map((item, index) => (
	<Anchor href={item.href} key={index}>
		{item.title}
	</Anchor>
));

export default function Page() {
	const isAllowed = useCheckAllowPage();

	if (!isAllowed) {
		return redirect('/not-found');
	}

	return (
		<>
			<>
				<title>Programs | Al Raad Tours & Travel</title>
				<meta
					name="description"
					content="Explore our versatile dashboard website template featuring a stunning array of themes and meticulously crafted components. Elevate your web project with seamless integration, customizable themes, and a rich variety of components for a dynamic user experience. Effortlessly bring your data to life with our intuitive dashboard template, designed to streamline development and captivate users. Discover endless possibilities in design and functionality today!"
				/>
			</>
			<Container fluid>
				<Stack>
					<PageHeader title="Programs" breadcrumbItems={items} />
					<Box w="fit-content" ml="auto">
						<CreateProgramButton />
					</Box>
					<ProgramsTable />
				</Stack>
			</Container>
		</>
	);
}
