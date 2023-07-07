interface Task {
	name: string,
	description?: string,
	endDate?: string,
	fkBlock: number,
	fkUser: number,
	status: ['TO_DO' | 'IN_PROGRESS' | 'FINISHED'],
}

export { Task };
