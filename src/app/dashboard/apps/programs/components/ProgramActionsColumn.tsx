import { useEffect } from 'react';

import { ActionIcon, Group, Text, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';

import { Programs, ProgramStatus } from '@prisma/client';
import {
	IconAlertCircle,
	IconCheck,
	IconEye,
	IconEyeOff,
	IconPencil,
} from '@tabler/icons-react';

import { useUpdateProgram } from '@hooks/react-query/programs/useUpdateProgram';

import { UpdateProgramForm } from './UpdateProgramForm';

type ProgramActionsColumnProps = {
	program: Programs;
};

export const ProgramActionsColumn = (props: ProgramActionsColumnProps) => {
	const { program } = props;

	const {
		error,
		isError,
		mutateAsync: updateProgram,
		isPending,
	} = useUpdateProgram();

	const handleArchiveProgram = () => {
		modals.openConfirmModal({
			title: 'Archive Program',
			children: (
				<Text fz="sm">Are you sure you want to archive this program?</Text>
			),
			labels: {
				confirm: 'Archive',
				cancel: 'Cancel',
			},
			onConfirm: async () => {
				await updateProgram({
					id: program.id,
					data: {
						status: ProgramStatus.ARCHIVED,
					},
				});

				notifications.show({
					title: 'Success',
					message: 'Program archived successfully',
					color: 'green',
					icon: <IconCheck size="1rem" />,
				});
			},
			styles: {
				title: {
					fontWeight: 'bold',
				},
			},
		});
	};

	const handleActivateProgram = async () => {
		await updateProgram({
			id: program.id,
			data: {
				status: ProgramStatus.ACTIVE,
			},
		});

		notifications.show({
			title: 'Success',
			message: 'Program activated successfully',
			color: 'green',
			icon: <IconCheck size="1rem" />,
		});
	};

	const handleEditProgram = () => {
		return modals.open({
			title: 'Update Program',
			children: <UpdateProgramForm program={program} />,
		});
	};

	useEffect(() => {
		if (isError) {
			notifications.show({
				title: 'Error',
				message: error.message,
				color: 'red',
				icon: <IconAlertCircle size="1rem" />,
			});
		}
	}, [isError, error]);

	const isActive = program.status === ProgramStatus.ACTIVE;

	return (
		<Group justify="center">
			<ActionIcon onClick={handleEditProgram}>
				<Tooltip label="Edit">
					<IconPencil size={16} />
				</Tooltip>
			</ActionIcon>
			<ActionIcon
				color={isActive ? 'red' : 'green'}
				onClick={isActive ? handleArchiveProgram : handleActivateProgram}
				loading={isPending}
				disabled={isPending}
			>
				{isActive ? (
					<Tooltip label="Archive">
						<IconEyeOff size={16} />
					</Tooltip>
				) : (
					<Tooltip label="Activate">
						<IconEye size={16} />
					</Tooltip>
				)}
			</ActionIcon>
		</Group>
	);
};
