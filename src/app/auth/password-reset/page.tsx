'use client';

import Link from 'next/link';

import {
	Alert,
	Button,
	Group,
	Paper,
	rem,
	Text,
	TextInput,
	Title,
	UnstyledButton,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle, IconChevronLeft } from '@tabler/icons-react';
import { zod4Resolver } from 'mantine-form-zod-resolver';

import {
	PasswordResetPayload,
	PasswordResetSchema,
} from '@app/api/auth/password-reset/types';

import Surface from '@components/Surface';

import { PATH_AUTH } from '@configs/routes';

import { usePasswordReset } from './services/usePasswordReset';
import classes from './page.module.css';

export default function Page() {
	const mobile_match = useMediaQuery('(max-width: 425px)');

	const {
		mutateAsync: passwordReset,
		isPending,
		error,
		isError,
	} = usePasswordReset();

	const form = useForm<PasswordResetPayload>({
		initialValues: { email: '' },
		validate: zod4Resolver(PasswordResetSchema),
	});

	const handleSubmit = async (values: typeof form.values) => {
		await passwordReset(values);

		notifications.show({
			title: 'Password reset',
			message: 'A reset link has been sent to your email',
			color: 'green',
		});
	};

	return (
		<>
			<Title ta="center">Forgot your password?</Title>
			<Text ta="center">Enter your email to get a reset link</Text>
			<form onSubmit={form.onSubmit(handleSubmit)}>
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

					<TextInput
						label="Your email"
						placeholder="me@email.com"
						withAsterisk
						{...form.getInputProps('email')}
					/>
					<Group justify="space-between" mt="lg" className={classes.controls}>
						<UnstyledButton
							component={Link}
							href={PATH_AUTH.signin}
							color="dimmed"
							className={classes.control}
						>
							<Group gap={2} align="center">
								<IconChevronLeft
									stroke={1.5}
									style={{ width: rem(14), height: rem(14) }}
								/>
								<Text size="sm" ml={5}>
									Back to the login page
								</Text>
							</Group>
						</UnstyledButton>
						<Button type="submit" fullWidth={mobile_match} loading={isPending}>
							Reset password
						</Button>
					</Group>
				</Surface>
			</form>
		</>
	);
}
