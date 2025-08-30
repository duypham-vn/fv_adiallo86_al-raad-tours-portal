'use client';

import { useEffect } from 'react';

import {
	Alert,
	Anchor,
	Avatar,
	Button,
	Container,
	Grid,
	Group,
	Paper,
	Stack,
	TextInput,
	Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

import { IconAlertCircle } from '@tabler/icons-react';
import { zod4Resolver } from 'mantine-form-zod-resolver';

import {
	UpdateProfilePayload,
	UpdateProfileSchema,
} from '@app/api/auth/profile/types';

import PageHeader from '@components/PageHeader';
import Surface from '@components/Surface';

import { PATH_ACCOUNTS, PATH_DASHBOARD } from '@configs/routes';

import { useGetProfile } from '@hooks/react-query/auth/useGetProfile';
import { useUpdateProfile } from '@hooks/react-query/auth/useUpdateProfile';

import classes from './page.module.css';

const items = [
	{ title: 'Dashboard', href: PATH_DASHBOARD.default },
	{ title: 'Accounts', href: PATH_ACCOUNTS.root },
	{ title: 'Profile', href: PATH_ACCOUNTS.profile },
].map((item, index) => (
	<Anchor href={item.href} key={index}>
		{item.title}
	</Anchor>
));

export const Profile = () => {
	const { data: profile } = useGetProfile();
	const {
		mutateAsync: updateProfile,
		isPending,
		error,
		isError,
	} = useUpdateProfile();

	const form = useForm<UpdateProfilePayload>({
		initialValues: {
			firstName: '',
			lastName: '',
			companyName: '',
			phoneNumber: '',
		},
		validate: zod4Resolver(UpdateProfileSchema),
	});

	const handleSubmit = async (values: typeof form.values) => {
		await updateProfile(values);

		notifications.show({
			title: 'Profile updated',
			message: 'You are now updated your profile',
			color: 'green',
		});
	};

	useEffect(() => {
		if (profile) {
			form.setValues({
				firstName: profile.firstName,
				lastName: profile.lastName,
				companyName: profile.companyName,
				phoneNumber: profile.phoneNumber,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [profile]);

	return (
		<>
			<>
				<title>Profile | Al Raad Tours & Travel</title>
				<meta
					name="description"
					content="Explore our versatile dashboard website template featuring a stunning array of themes and meticulously crafted components. Elevate your web project with seamless integration, customizable themes, and a rich variety of components for a dynamic user experience. Effortlessly bring your data to life with our intuitive dashboard template, designed to streamline development and captivate users. Discover endless possibilities in design and functionality today!"
				/>
			</>
			<Container fluid>
				<Stack gap="lg">
					<PageHeader title="Profile" breadcrumbItems={items} />
					<Grid>
						<Grid.Col span={{ base: 12, md: 5, lg: 4 }}>
							<Surface component={Paper} className={classes.card}>
								{isError && (
									<Alert
										icon={<IconAlertCircle size="1rem" />}
										title="Update Error"
										color="red"
										mb="md"
									>
										{error.message}
									</Alert>
								)}

								<form onSubmit={form.onSubmit(handleSubmit)}>
									<Stack gap="md" justify="center" align="center">
										<Title order={3} c="blue.5" fw="bold">
											Profile Details
										</Title>
										<Avatar size={80} radius="xl">
											{profile?.email.charAt(0).toUpperCase() || ''}
										</Avatar>

										<TextInput
											label="Email"
											placeholder="you@example.com"
											withAsterisk
											readOnly
											disabled
											w="100%"
											value={profile?.email || ''}
										/>
										<Group>
											<TextInput
												label="First name"
												placeholder="John"
												withAsterisk
												{...form.getInputProps('firstName')}
											/>
											<TextInput
												label="Last name"
												placeholder="Doe"
												withAsterisk
												{...form.getInputProps('lastName')}
											/>
										</Group>

										<TextInput
											label="Company name"
											placeholder="Example Inc."
											withAsterisk
											w="100%"
											{...form.getInputProps('companyName')}
										/>
										<TextInput
											label="Phone number"
											placeholder="+123 456 7890"
											withAsterisk
											w="100%"
											{...form.getInputProps('phoneNumber')}
										/>
									</Stack>

									<Button fullWidth mt="xl" type="submit" loading={isPending}>
										Update
									</Button>
								</form>
							</Surface>
						</Grid.Col>
					</Grid>
				</Stack>
			</Container>
		</>
	);
};

export default Profile;
