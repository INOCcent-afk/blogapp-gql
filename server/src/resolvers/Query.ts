import { Context } from "..";

export const Query = {
	me: async (_: any, __: any, { userInfo, prisma }: Context) => {
		if (!userInfo) return null;

		return prisma.user.findUnique({
			where: {
				id: userInfo.userId,
			},
		});
	},
	profile: (_: any, { userId }: { userId: string }, { prisma }: Context) => {
		return prisma.profile.findUnique({
			where: {
				userId: Number(userId),
			},
		});
	},
	posts: (_: any, __: any, { prisma }: Context) => {
		return prisma.post.findMany({
			where: {
				published: true,
			},
			orderBy: [
				{
					createdAt: "desc",
				},
			],
		});
	},
};
