import { Select } from '@mantine/core';

import { useGetPagingPrograms } from '@hooks/react-query/programs/useGetPagingPrograms';

export const ProgramSelect = () => {
	const { data: programs } = useGetPagingPrograms({
		page: 1,
		limit: 10000,
	});

	return (
		<Select
			data={programs?.data.map((program) => ({
				value: program.id,
				label: program.name,
			}))}
		/>
	);
};
