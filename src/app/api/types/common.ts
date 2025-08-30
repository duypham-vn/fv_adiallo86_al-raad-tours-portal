export type ApiResponse<T> = {
	data: T;
	error?: string | null;
};

export type ApiListResponse<T> = {
	data: T[];
	error?: string | null;
};
