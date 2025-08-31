function path(root: string, sublink: string) {
	return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_PAGES = '/pages';
const ROOTS_AUTH = '/auth';

const ROOT_APPS = path(ROOTS_DASHBOARD, '/apps');
const ROOTS_ACCOUNTS = path(ROOTS_DASHBOARD, '/accounts');

export const PATH_DASHBOARD = {
	root: ROOTS_DASHBOARD,
	default: path(ROOTS_DASHBOARD, '/'),
	analytics: path(ROOTS_DASHBOARD, '/analytics'),
	saas: path(ROOTS_DASHBOARD, '/saas'),
};

export const PATH_APPS = {
	root: ROOT_APPS,
	referrals: path(ROOT_APPS, '/referrals'),
	programs: path(ROOT_APPS, '/programs'),
};

export const PATH_PAGES = {
	root: ROOTS_PAGES,
	blank: path(ROOTS_PAGES, '/blank'),
};

export const PATH_AUTH = {
	root: ROOTS_AUTH,
	signin: path(ROOTS_AUTH, '/signin'),
	signup: path(ROOTS_AUTH, '/signup'),
	passwordReset: path(ROOTS_AUTH, '/password-reset'),
};

export const PATH_ACCOUNTS = {
	root: ROOTS_ACCOUNTS,
	profile: path(ROOTS_ACCOUNTS, '/profile'),
	changePassword: path(ROOTS_ACCOUNTS, '/change-password'),
};
