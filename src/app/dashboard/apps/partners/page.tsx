'use client';

import { Anchor, Container, Stack } from '@mantine/core';

import PageHeader from '@components/PageHeader';

import { PATH_APPS, PATH_DASHBOARD } from '@configs/routes';

import { PartnersTable } from './components/PartnersTable';

const items = [
	{ title: 'Dashboard', href: PATH_DASHBOARD.default },
	{ title: 'Apps', href: PATH_APPS.root },
	{ title: 'Partners', href: PATH_APPS.partners },
].map((item, index) => (
	<Anchor href={item.href} key={index}>
		{item.title}
	</Anchor>
));

export default function Page() {
	return (
		<>
			<>
				<title>Partners | Al Raad Tours & Travel</title>
				<meta
					name="description"
					content="Explore our versatile dashboard website template featuring a stunning array of themes and meticulously crafted components. Elevate your web project with seamless integration, customizable themes, and a rich variety of components for a dynamic user experience. Effortlessly bring your data to life with our intuitive dashboard template, designed to streamline development and captivate users. Discover endless possibilities in design and functionality today!"
				/>
			</>
			<Container fluid>
				<Stack>
					<PageHeader title="Partners" breadcrumbItems={items} />
					<PartnersTable />
				</Stack>
			</Container>
		</>
	);
}
