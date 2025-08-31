import { useState } from 'react';

import {
	Center,
	Group,
	Pagination,
	Skeleton,
	Stack,
	Table,
	Text,
} from '@mantine/core';

import { IconMoodEmpty } from '@tabler/icons-react';
import dayjs from 'dayjs';

import { useGetPagingPartners } from '@hooks/react-query/partners/useGetPagingPrograms';

import { PartnerActionsColumn } from './PartnerActionsColumn';

export const PartnersTable = () => {
	const [page, setPage] = useState(1);

	const { data: partners, isLoading } = useGetPagingPartners({
		page,
		limit: 10,
	});

	const rows = partners?.data.map((partner, index) => (
		<Table.Tr key={partner.id}>
			<Table.Td>{(page - 1) * 10 + index + 1}</Table.Td>
			<Table.Td>{partner.firstName}</Table.Td>
			<Table.Td>{partner.lastName}</Table.Td>
			<Table.Td>{partner.companyName}</Table.Td>
			<Table.Td>{partner.phoneNumber}</Table.Td>
			<Table.Td>{partner.email}</Table.Td>
			<Table.Td ta="center">
				{dayjs(partner.createdAt).format('MM/DD/YYYY HH:mm:ss')}
			</Table.Td>
			<Table.Td ta="center">
				<PartnerActionsColumn partner={partner} />
			</Table.Td>
		</Table.Tr>
	));

	const loadingRows = Array.from({ length: 10 }).map((_, index) => (
		<Table.Tr key={index}>
			{Array.from({ length: 8 }).map((_, index) => (
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

	const hasData = Boolean(partners?.total);
	const hasPagination = (partners?.total || 0) > 10;

	return (
		<Table bg="white" border={1}>
			<Table.Thead>
				<Table.Tr>
					<Table.Th w={100}>#</Table.Th>
					<Table.Th>First Name</Table.Th>
					<Table.Th>Last Name</Table.Th>
					<Table.Th>Company Name</Table.Th>
					<Table.Th>Phone Number</Table.Th>
					<Table.Th>Email</Table.Th>
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
										{partners?.total}
									</Text>
								</Text>
							)}
							{hasPagination && (
								<Pagination
									fz="sm"
									value={page}
									total={Math.ceil((partners?.total || 0) / 10) || 0}
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
