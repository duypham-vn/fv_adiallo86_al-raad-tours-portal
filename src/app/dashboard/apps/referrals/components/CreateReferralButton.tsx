import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';

import { IconPlus } from '@tabler/icons-react';

import { CreateReferralForm } from './CreateReferralForm';

export const CreateReferralButton = () => {
	const handleCreateReferral = () => {
		modals.open({
			title: 'Create Referral',
			children: <CreateReferralForm />,
		});
	};

	return (
		<Button leftSection={<IconPlus />} onClick={handleCreateReferral}>
			Create Referral
		</Button>
	);
};
