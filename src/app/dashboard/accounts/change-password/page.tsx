'use client';

import {
	Alert,
	Anchor,
	Button,
	Container,
	Grid,
	Paper,
	PasswordInput,
	Stack,
	Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

import { IconAlertCircle } from '@tabler/icons-react';
import { zod4Resolver } from 'mantine-form-zod-resolver';

import {
	ChangePasswordPayload,
	ChangePasswordSchema,
} from '@app/api/auth/change-password/types';

import PageHeader from '@components/PageHeader';
import Surface from '@components/Surface';

import { PATH_ACCOUNTS, PATH_DASHBOARD } from '@configs/routes';

import { useChangePassword } from '@hooks/react-query/auth/useChangePassword';

import classes from './page.module.css';

const items = [
	{ title: 'Dashboard', href: PATH_DASHBOARD.default },
	{ title: 'Accounts', href: PATH_ACCOUNTS.root },
	{ title: 'Change Password', href: PATH_ACCOUNTS.changePassword },
].map((item, index) => (
	<Anchor href={item.href} key={index}>
		{item.title}
	</Anchor>
));

export default function Page() {
	const {
		mutateAsync: changePassword,
		isError,
		error,
		isPending,
	} = useChangePassword();

	const form = useForm<ChangePasswordPayload>({
		initialValues: { oldPassword: '', password: '', confirmPassword: '' },
		validate: zod4Resolver(ChangePasswordSchema),
	});

	const handleSubmit = async (values: typeof form.values) => {
		await changePassword(values);

		notifications.show({
			title: 'Password changed',
			message: 'You are now changed your password',
			color: 'green',
		});
	};

	return (
		<>
			<>
				<title>Change Password | Al Raad Tours & Travel</title>
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
											Change Password
										</Title>

										<PasswordInput
											label="Old Password"
											placeholder="Your old password"
											withAsterisk
											w="100%"
											{...form.getInputProps('oldPassword')}
										/>

										<PasswordInput
											label="New Password"
											placeholder="Your new password"
											withAsterisk
											w="100%"
											{...form.getInputProps('password')}
										/>

										<PasswordInput
											label="Confirm New Password"
											placeholder="Confirm your new password"
											withAsterisk
											w="100%"
											{...form.getInputProps('confirmPassword')}
										/>
									</Stack>

									<Button fullWidth mt="xl" type="submit" loading={isPending}>
										Change Password
									</Button>
								</form>
							</Surface>
						</Grid.Col>
					</Grid>
				</Stack>
			</Container>
		</>
	);
}
