import { useEffect, useState } from 'react';

import {
	ActionIcon,
	Center,
	Group,
	Pagination,
	Skeleton,
	Stack,
	Table,
	Text,
	Tooltip,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { IconMoodEmpty, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';

import { useDeleteReferral } from '@hooks/react-query/referrals/useDeleteReferral';
import { useGetPagingReferrals } from '@hooks/react-query/referrals/useGetPagingReferrals';

export const ReferralsTable = () => {
	const [page, setPage] = useState(1);
	const [deleteId, setDeleteId] = useState<string | null>(null);

	const { data: referrals, isLoading } = useGetPagingReferrals({
		page,
		limit: 10,
	});

	const {
		mutateAsync: deleteReferral,
		isPending,
		isError,
		error,
	} = useDeleteReferral();

	const handleDeleteReferral = async (id: string) => {
		setDeleteId(id);

		await deleteReferral({ id });

		setDeleteId(null);

		notifications.show({
			title: 'Referral deleted',
			message: 'Referral deleted successfully',
			color: 'green',
		});
	};

	const loadingRows = Array.from({ length: 10 }).map((_, index) => (
		<Table.Tr key={index}>
			{Array.from({ length: 10 }).map((_, index) => (
				<Table.Td key={index}>
					<Skeleton h={30} w="100%" />
				</Table.Td>
			))}
		</Table.Tr>
	));

	const emptyRows = (
		<Table.Tr>
			<Table.Td colSpan={10}>
				<Center h={300}>
					<Stack justify="center" align="center">
						<IconMoodEmpty size={40} color="var(--theme-primary-color)" />
						<Text fw="semibold">No data found</Text>
					</Stack>
				</Center>
			</Table.Td>
		</Table.Tr>
	);

	useEffect(() => {
		if (isError) {
			notifications.show({
				title: 'Error',
				message: error.message,
				color: 'red',
			});
		}
	}, [isError, error]);

	const rows = referrals?.data.map((referral, index) => (
		<Table.Tr key={referral.id}>
			<Table.Td>{(page - 1) * 10 + index + 1}</Table.Td>
			<Table.Td>{referral.firstName}</Table.Td>
			<Table.Td>{referral.lastName}</Table.Td>
			<Table.Td>{referral.email}</Table.Td>
			<Table.Td>{referral.phoneNumber}</Table.Td>
			<Table.Td>{referral.passportNumber}</Table.Td>
			<Table.Td>{referral.program?.name}</Table.Td>
			<Table.Td ta="center">
				{dayjs(referral.createdAt).format('MM/DD/YYYY HH:mm:ss')}
			</Table.Td>
			<Table.Td>
				<Tooltip
					label={referral.additionalNotes}
					w={500}
					h="fit-content"
					position="left"
					style={{
						whiteSpace: 'normal',
						wordWrap: 'break-word',
						overflowWrap: 'break-word',
					}}
				>
					<Text fz="sm" lineClamp={2}>
						{referral.additionalNotes}
					</Text>
				</Tooltip>
			</Table.Td>
			<Table.Td ta="center">
				<ActionIcon
					color="red"
					onClick={() => handleDeleteReferral(referral.id)}
					loading={isPending && deleteId === referral.id}
					disabled={isPending && deleteId === referral.id}
				>
					<IconTrash size={16} />
				</ActionIcon>
			</Table.Td>
		</Table.Tr>
	));

	const hasData = Boolean(referrals?.total);
	const hasPagination = (referrals?.total || 0) > 10;

	return (
		<Table bg="white" border={1}>
			<Table.Thead>
				<Table.Tr>
					<Table.Th>#</Table.Th>
					<Table.Th>First Name</Table.Th>
					<Table.Th>Last Name</Table.Th>
					<Table.Th>Email</Table.Th>
					<Table.Th w={150}>Phone Number</Table.Th>
					<Table.Th w={150}>Passport Number</Table.Th>
					<Table.Th>Program</Table.Th>
					<Table.Th ta="center" w={180}>
						Created At
					</Table.Th>
					<Table.Th w={200}>Additional Notes</Table.Th>
					<Table.Th w={100} ta="center">
						Actions
					</Table.Th>
				</Table.Tr>
			</Table.Thead>

			<Table.Tbody>
				{isLoading ? loadingRows : hasData ? rows : emptyRows}
			</Table.Tbody>

			<Table.Tfoot>
				<Table.Tr>
					<Table.Td colSpan={10}>
						<Group justify="space-between">
							{hasData && (
								<Text fz="sm" fw={500}>
									Total:{' '}
									<Text span c="blue.5" fw="bold">
										{referrals?.total}
									</Text>
								</Text>
							)}
							{hasPagination && (
								<Pagination
									fz="sm"
									value={page}
									total={Math.ceil((referrals?.total || 0) / 10) || 0}
									onChange={(page) => setPage(page)}
								/>
							)}
						</Group>
					</Table.Td>
				</Table.Tr>
			</Table.Tfoot>
		</Table>
	);
};
