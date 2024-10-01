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

export type Post = {
	id: string;
	createdAt: string;
	updatedAt: string;
	title: string;
	tags?: string;
	content: string;
};

export type PostsResult = {
	contents: Post[];
	totalCount: number;
	offset: number;
	limit: number;
};
