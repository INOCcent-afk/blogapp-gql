import { Post } from "@prisma/client";
import { Context } from "../index";

interface PostCreateArgs {
	title: string;
	content: string;
}

interface PostPayloadType {
	userErrors: { message: string }[];
	post: null | Post;
}

export const Mutation = {
	postCreate: async (
		_: any,
		{ title, content }: PostCreateArgs,
		{ prisma }: Context
	): Promise<PostPayloadType> => {
		if (!title || !content) {
			return {
				userErrors: [
					{
						message:
							"you must provide a title and content to create a post",
					},
				],
				post: null,
			};
		}

		const post = await prisma.post.create({
			data: {
				title,
				content,
				authorId: 1,
			},
		});

		return {
			userErrors: [],
			post,
		};
	},
};
