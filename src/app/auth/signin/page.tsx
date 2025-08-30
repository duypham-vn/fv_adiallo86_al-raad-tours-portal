'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
	Alert,
	Anchor,
	Button,
	Center,
	Checkbox,
	Group,
	Paper,
	PasswordInput,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

import { IconAlertCircle } from '@tabler/icons-react';
import { zod4Resolver } from 'mantine-form-zod-resolver';

import { SignInPayload, SignInSchema } from '@app/api/auth/signin/types';

import Surface from '@components/Surface';

import { PATH_AUTH, PATH_DASHBOARD } from '@configs/routes';

import { useSignin } from './services/useSignin';
import classes from './page.module.css';

const LINK_PROPS = {
	className: classes.link,
};

export default function Page() {
	const router = useRouter();

	const { mutateAsync: signin, isPending, error, isError } = useSignin();

	const form = useForm<SignInPayload>({
		initialValues: { email: '', password: '' },
		validate: zod4Resolver(SignInSchema),
	});

	const handleSubmit = async (values: typeof form.values) => {
		await signin(values);

		notifications.show({
			title: 'Account created',
			message: 'You are now logged in',
			color: 'green',
		});

		router.push(PATH_DASHBOARD.default);
	};

	return (
		<>
			<title>Sign in</title>
			<meta
				name="description"
				content="Sign in to your account to access the dashboard."
			/>

			<Title ta="center" c="blue">
				Welcome back!
			</Title>
			<Text ta="center">Sign in to your account to continue</Text>

			<Surface component={Paper} className={classes.card}>
				{isError && (
					<Alert
						icon={<IconAlertCircle size="1rem" />}
						title="Authentication Error"
						color="red"
						mb="md"
					>
						{error.message}
					</Alert>
				)}

				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput
						label="Email"
						placeholder="you@example.com"
						withAsterisk
						classNames={{ label: classes.label }}
						{...form.getInputProps('email')}
					/>
					<PasswordInput
						label="Password"
						placeholder="Your password"
						withAsterisk
						mt="md"
						classNames={{ label: classes.label }}
						{...form.getInputProps('password')}
					/>
					<Group justify="space-between" mt="lg">
						<Checkbox
							label="Remember me"
							classNames={{ label: classes.label }}
						/>
						<Text
							component={Link}
							href={PATH_AUTH.passwordReset}
							size="sm"
							{...LINK_PROPS}
						>
							Forgot password?
						</Text>
					</Group>
					<Button fullWidth mt="xl" type="submit" loading={isPending}>
						Sign in
					</Button>
				</form>
				<Center mt="md">
					<Text fz="sm" ta="center" {...LINK_PROPS}>
						Do not have an account yet?
						<Anchor component={Link} fz="sm" ml={10} href={PATH_AUTH.signup}>
							Create account
						</Anchor>
					</Text>
				</Center>
			</Surface>
		</>
	);
}
