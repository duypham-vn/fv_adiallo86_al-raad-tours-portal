import {
	Alert,
	Box,
	Button,
	Group,
	Select,
	Stack,
	Textarea,
	TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';

import { IconAlertCircle } from '@tabler/icons-react';
import { zod4Resolver } from 'mantine-form-zod-resolver';

import {
	CreateReferralPayload,
	CreateReferralSchema,
} from '@app/api/referrals/types';

import { useGetPagingPrograms } from '@hooks/react-query/programs/useGetPagingPrograms';
import { useCreateReferral } from '@hooks/react-query/referrals/useCreateReferral';

export const CreateReferralForm = () => {
	const { data: programs } = useGetPagingPrograms({
		page: 1,
		limit: 10000,
	});

	const {
		mutateAsync: createReferral,
		isPending,
		isError,
		error,
	} = useCreateReferral();

	const form = useForm<CreateReferralPayload>({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
			passportNumber: '',
			programId: '',
		},
		validate: zod4Resolver(CreateReferralSchema),
	});

	const handleSubmit = async (values: typeof form.values) => {
		await createReferral(values);

		notifications.show({
			title: 'Referral created',
			message: 'Referral created successfully',
			color: 'green',
		});

		modals.closeAll();
	};

	return (
		<Box>
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
					<Group w="100%">
						<TextInput
							label="First Name"
							placeholder="John"
							withAsterisk
							w="100%"
							{...form.getInputProps('firstName')}
						/>
						<TextInput
							label="Last Name"
							placeholder="Doe"
							withAsterisk
							w="100%"
							{...form.getInputProps('lastName')}
						/>
					</Group>

					<Group w="100%">
						<TextInput
							label="Email"
							placeholder="john.doe@example.com"
							withAsterisk
							w="100%"
							{...form.getInputProps('email')}
						/>
						<TextInput
							label="Phone Number"
							placeholder="+123 456 7890"
							withAsterisk
							w="100%"
							{...form.getInputProps('phoneNumber')}
						/>
					</Group>

					<TextInput
						label="Passport Number"
						placeholder="1234567890"
						withAsterisk
						w="100%"
						{...form.getInputProps('passportNumber')}
					/>

					<Select
						data={programs?.data.map((program) => ({
							value: program.id,
							label: program.name,
						}))}
						withAsterisk
						w="100%"
						placeholder="Select Program"
						{...form.getInputProps('programId')}
					/>

					<Textarea
						w="100%"
						label="Additional Notes"
						rows={5}
						placeholder="Additional Notes"
						{...form.getInputProps('additionalNotes')}
					/>
				</Stack>

				<Button fullWidth mt="xl" type="submit" loading={isPending}>
					Create
				</Button>
			</form>
		</Box>
	);
};
