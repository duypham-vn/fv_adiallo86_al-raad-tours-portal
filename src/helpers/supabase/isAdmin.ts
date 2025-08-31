import type { User } from '@supabase/supabase-js';

import { ADMIN_EMAIL } from '@configs/_constant';

export const isAdminRole = (user: User) => user.email === ADMIN_EMAIL;
