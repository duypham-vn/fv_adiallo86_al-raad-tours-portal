'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
	Alert,
	Anchor,
	Button,
	Center,
	Flex,
	Paper,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

import { IconAlertCircle } from '@tabler/icons-react';
import { zod4Resolver } from 'mantine-form-zod-resolver';

import { SignupPayload, SignupSchema } from '@app/api/auth/signup/types';

import Surface from '@components/Surface';

import { PATH_AUTH, PATH_DASHBOARD } from '@configs/routes';

import { useSignup } from './services/useSignup';
import classes from './page.module.css';

const LINK_PROPS = {
	className: classes.link,
};

export default function Page() {
	const router = useRouter();

	const { mutateAsync: signup, isPending, error, isError } = useSignup();

	const form = useForm<SignupPayload>({
		initialValues: {
			firstName: '',
			lastName: '',
			companyName: '',
			phoneNumber: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validate: zod4Resolver(SignupSchema),
	});

	const handleSubmit = async (values: typeof form.values) => {
		await signup(values);

		notifications.show({
			title: 'Account created',
			message: 'You are now logged in',
			color: 'green',
		});

		router.push(PATH_DASHBOARD.default);
	};

	return (
		<>
			<>
				<title>Sign up | Al Raad Tours & Travel - Portal</title>
				<meta
					name="description"
					content="Sign up to your account to access the dashboard."
				/>
			</>

			<Title ta="center" c="blue">
				Welcome!
			</Title>
			<Text ta="center">Create your account to continue</Text>

			<Surface component={Paper} className={classes.card}>
				{isError && (
					<Alert
						icon={<IconAlertCircle size="1rem" />}
						title="Registration Error"
						color="red"
						mb="md"
					>
						{error.message}
					</Alert>
				)}

				<form onSubmit={form.onSubmit(handleSubmit)}>
					<Stack gap="md">
						<Flex
							direction={{ base: 'column', sm: 'row' }}
							gap={{ base: 'md' }}
						>
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
						</Flex>
						<Flex
							direction={{ base: 'column', sm: 'row' }}
							gap={{ base: 'md' }}
						>
							<TextInput
								label="Company name"
								placeholder="Example Inc."
								withAsterisk
								{...form.getInputProps('companyName')}
							/>
							<TextInput
								label="Phone number"
								placeholder="+123 456 7890"
								withAsterisk
								{...form.getInputProps('phoneNumber')}
							/>
						</Flex>
						<TextInput
							label="Email"
							placeholder="you@example.com"
							withAsterisk
							{...form.getInputProps('email')}
						/>
						<PasswordInput
							label="Password"
							placeholder="Your password"
							withAsterisk
							{...form.getInputProps('password')}
						/>
						<PasswordInput
							label="Confirm Password"
							placeholder="Confirm password"
							withAsterisk
							{...form.getInputProps('confirmPassword')}
						/>
						<Button fullWidth type="submit" loading={isPending}>
							Create account
						</Button>
					</Stack>
				</form>
				<Center mt="md">
					<Text size="sm" {...LINK_PROPS}>
						Already have an account?
						<Anchor component={Link} fz="sm" ml={10} href={PATH_AUTH.signin}>
							Sign in
						</Anchor>
					</Text>
				</Center>
			</Surface>
		</>
	);
}
