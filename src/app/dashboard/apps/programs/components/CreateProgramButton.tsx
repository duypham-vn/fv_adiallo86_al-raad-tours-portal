import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';

import { IconPlus } from '@tabler/icons-react';

import { CreateProgramForm } from './CreateProgramForm';

export const CreateProgramButton = () => {
	const handleCreateProgram = () => {
		modals.open({
			title: 'Create Program',
			children: <CreateProgramForm />,
		});
	};

	return (
		<Button leftSection={<IconPlus />} onClick={handleCreateProgram}>
			Create Program
		</Button>
	);
};
