import { ReactNode } from 'react';

import { MainLayout } from '@components/layout/Main';

type Props = {
	children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
	return <MainLayout>{children}</MainLayout>;
};

export default DashboardLayout;
