'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

import {
	Alert,
	Button,
	Flex,
	Loader,
	Paper,
	PasswordInput,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import z from 'zod/v4';

import Surface from '@components/Surface';

import { PATH_AUTH } from '@configs/routes';

import { createClient } from '@helpers/supabase/client';

import classes from '../page.module.css';
import { usePasswordResetConfirm } from '../services/usePasswordResetConfirm';

const schema = z
	.object({
		password: z.string().min(6, 'Password must be at least 6 characters'),
		confirmPassword: z
			.string()
			.min(6, 'Password must be at least 6 characters'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

type ResetPasswordPayload = z.infer<typeof schema>;

export default function ConfirmPage() {
	const router = useRouter();

	const [isConfirmed, setIsConfirmed] = useState(false);

	const {
		mutateAsync: confirmReset,
		isPending,
		error,
		isError,
	} = usePasswordResetConfirm();

	const form = useForm<ResetPasswordPayload>({
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		validate: zod4Resolver(schema),
	});

	const handleSubmit = async (values: ResetPasswordPayload) => {
		await confirmReset({
			password: values.password,
		});

		notifications.show({
			title: 'Success',
			message: 'Password reset successfully',
			color: 'green',
			icon: <IconCheck size="1rem" />,
		});

		router.push(PATH_AUTH.signin);
	};

	useEffect(() => {
		if (isConfirmed) return;

		const supabase = createClient();

		supabase.auth.onAuthStateChange(async (event) => {
			if (event === 'PASSWORD_RECOVERY') {
				setIsConfirmed(true);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!isConfirmed) {
		return (
			<Flex mt="lg" w="100vw" justify="center" align="center">
				<Loader />
			</Flex>
		);
	}

	return (
		<>
			<Title ta="center" c="blue">
				Reset Your Password
			</Title>
			<Text ta="center">Enter your new password below</Text>

			<Surface component={Paper} className={classes.card}>
				{isError && (
					<Alert
						icon={<IconAlertCircle size="1rem" />}
						title="Reset Password Error"
						color="red"
						mb="md"
					>
						{error.message}
					</Alert>
				)}

				<form onSubmit={form.onSubmit(handleSubmit)}>
					<Stack gap="md">
						<PasswordInput
							label="New Password"
							placeholder="Enter your new password"
							withAsterisk
							{...form.getInputProps('password')}
						/>
						<PasswordInput
							label="Confirm New Password"
							placeholder="Confirm your new password"
							withAsterisk
							{...form.getInputProps('confirmPassword')}
						/>
						<Button fullWidth type="submit" loading={isPending}>
							Reset Password
						</Button>
					</Stack>
				</form>
			</Surface>
		</>
	);
}
