const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");

const resolvers = {
  Query: {
    info: () => `This is the API of a Twitter Clone`,
    feed: async (parent, args, context) => {
      return context.prisma.post.findMany();
    },
  },
  Mutation: {
    createPost: (parent, args, context, info) => {
      const newLink = context.prisma.post.create({
        data: {
          content: args.content,
        },
      });
      return newLink;
    },
    updatePost: (parent, args, context, info) => {
      return context.prisma.post.update({
        where: { postId: parseFloat(args.postId) },
        data: { content: args.content },
      });
    },
    deletePost: (parent, args, context, info) => {
      return context.prisma.post.delete({
        where: { postId: parseFloat(args.postId) },
      });
    },
  },
};

const prisma = new PrismaClient();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    prisma,
  },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
