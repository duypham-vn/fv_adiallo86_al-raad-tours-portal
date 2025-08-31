import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';

import { Partners } from '@prisma/client';
import { IconUsers } from '@tabler/icons-react';

import { ReferralsTable } from '../../referrals/components/ReferralsTable';

type PartnerActionsColumnProps = {
	partner: Partners;
};

export const PartnerActionsColumn = ({
	partner,
}: PartnerActionsColumnProps) => {
	const handleViewReferrals = () => {
		modals.open({
			title: 'Referrals',
			children: <ReferralsTable partnerId={partner.id} />,
			styles: {
				content: {
					minWidth: '1000px',
				},
			},
		});
	};

	return (
		<Group justify="center">
			<ActionIcon onClick={handleViewReferrals}>
				<Tooltip label="View referrals">
					<IconUsers size={16} />
				</Tooltip>
			</ActionIcon>
		</Group>
	);
};
