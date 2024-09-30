export type AboutContent = {
	id: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	revisedAt: string;
	name: string;
	image: {
		url: string;
		height: number;
		width: number;
	};
	birthday: string;
	from: string;
	introduction: string;
	skills: string;
	interest: string;
};

export type AboutResult = {
	contents: AboutContent[];
	totalCount: number;
	offset: number;
	limit: number;
};
