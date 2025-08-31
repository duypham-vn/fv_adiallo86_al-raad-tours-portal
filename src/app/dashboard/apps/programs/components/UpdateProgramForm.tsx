import { Alert, Button, Paper, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';

import { Programs } from '@prisma/client';
import { IconAlertCircle } from '@tabler/icons-react';
import { zod4Resolver } from 'mantine-form-zod-resolver';

import {
	UpdateProgramPayload,
	UpdateProgramSchema,
} from '@app/api/programs/[id]/types';

import Surface from '@components/Surface';

import { useUpdateProgram } from '@hooks/react-query/programs/useUpdateProgram';

import classes from '../page.module.css';

type UpdateProgramFormProps = {
	program: Programs;
};

export const UpdateProgramForm = (props: UpdateProgramFormProps) => {
	const { program } = props;

	const {
		mutateAsync: updateProgram,
		isPending,
		isError,
		error,
	} = useUpdateProgram();

	const form = useForm<UpdateProgramPayload>({
		initialValues: { name: program.name },
		validate: zod4Resolver(UpdateProgramSchema),
	});

	const handleSubmit = async (values: typeof form.values) => {
		await updateProgram({
			id: program.id,
			data: values,
		});

		notifications.show({
			title: 'Program updated',
			message: 'Program updated successfully',
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
					Update
				</Button>
			</form>
		</Surface>
	);
};
