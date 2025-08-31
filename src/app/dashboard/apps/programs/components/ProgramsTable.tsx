import { useState } from 'react';

import {
	Center,
	Group,
	Pagination,
	Pill,
	Skeleton,
	Stack,
	Table,
	Text,
} from '@mantine/core';

import { ProgramStatus } from '@prisma/client';
import { IconMoodEmpty } from '@tabler/icons-react';
import dayjs from 'dayjs';

import { useGetPagingPrograms } from '@hooks/react-query/programs/useGetPagingPrograms';

import { ProgramActionsColumn } from './ProgramActionsColumn';

export const ProgramsTable = () => {
	const [page, setPage] = useState(1);

	const { data: programs, isLoading } = useGetPagingPrograms({
		page,
		limit: 10,
	});

	const getStatusColor = (status: ProgramStatus) => {
		if (status === ProgramStatus.ACTIVE) return 'green.5';
		if (status === ProgramStatus.ARCHIVED) return 'gray';
		return 'gray';
	};

	const rows = programs?.data.map((program, index) => (
		<Table.Tr key={program.id}>
			<Table.Td>{(page - 1) * 10 + index + 1}</Table.Td>
			<Table.Td>{program.name}</Table.Td>
			<Table.Td ta="center">
				<Pill bg={getStatusColor(program.status)} c="white" size="sm">
					{program.status}
				</Pill>
			</Table.Td>
			<Table.Td ta="center">
				{dayjs(program.createdAt).format('MM/DD/YYYY HH:mm:ss')}
			</Table.Td>
			<Table.Td ta="center">
				<ProgramActionsColumn program={program} />
			</Table.Td>
		</Table.Tr>
	));

	const loadingRows = Array.from({ length: 10 }).map((_, index) => (
		<Table.Tr key={index}>
			{Array.from({ length: 5 }).map((_, index) => (
				<Table.Td key={index}>
					<Skeleton h={30} w="100%" />
				</Table.Td>
			))}
		</Table.Tr>
	));

	const emptyRows = (
		<Table.Tr>
			<Table.Td colSpan={5}>
				<Center h={300}>
					<Stack justify="center" align="center">
						<IconMoodEmpty size={40} color="var(--theme-primary-color)" />
						<Text fw="semibold">No data found</Text>
					</Stack>
				</Center>
			</Table.Td>
		</Table.Tr>
	);

	const hasData = Boolean(programs?.total);
	const hasPagination = (programs?.total || 0) > 10;

	return (
		<Table bg="white" border={1}>
			<Table.Thead>
				<Table.Tr>
					<Table.Th w={100}>#</Table.Th>
					<Table.Th>Name</Table.Th>
					<Table.Th w={120} ta="center">
						Status
					</Table.Th>
					<Table.Th w={180} ta="center">
						Created At
					</Table.Th>
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
					<Table.Td colSpan={5}>
						<Group justify="space-between">
							{hasData && (
								<Text fz="sm" fw={500}>
									Total:{' '}
									<Text span c="blue.5" fw="bold">
										{programs?.total}
									</Text>
								</Text>
							)}
							{hasPagination && (
								<Pagination
									fz="sm"
									value={page}
									total={Math.ceil((programs?.total || 0) / 10) || 0}
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
