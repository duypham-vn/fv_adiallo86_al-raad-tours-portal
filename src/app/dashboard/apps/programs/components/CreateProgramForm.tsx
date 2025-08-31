import { Alert, Button, Paper, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';

import { IconAlertCircle } from '@tabler/icons-react';
import { zod4Resolver } from 'mantine-form-zod-resolver';

import {
	CreateProgramPayload,
	CreateProgramSchema,
} from '@app/api/programs/types';

import Surface from '@components/Surface';

import { useCreateProgram } from '@hooks/react-query/programs/useCreateProgram';

import classes from '../page.module.css';

export const CreateProgramForm = () => {
	const {
		mutateAsync: createProgram,
		isPending,
		isError,
		error,
	} = useCreateProgram();

	const form = useForm<CreateProgramPayload>({
		initialValues: { name: '' },
		validate: zod4Resolver(CreateProgramSchema),
	});

	const handleSubmit = async (values: typeof form.values) => {
		await createProgram(values);

		notifications.show({
			title: 'Program created',
			message: 'Program created successfully',
			color: 'green',
		});

		modals.closeAll();
	};

	return (
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
					<TextInput
						label="Name"
						placeholder="Program name"
						withAsterisk
						w="100%"
						{...form.getInputProps('name')}
					/>
				</Stack>

				<Button fullWidth mt="xl" type="submit" loading={isPending}>
					Create
				</Button>
			</form>
		</Surface>
	);
};
