const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } = require("graphql");

const createCommentInputType = new GraphQLInputObjectType({
  name: 'likePostInput',
  fields: {
    postId: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    userId: {
        type: new GraphQLNonNull(GraphQLInt),
      },
  }
});

module.exports = createCommentInputType;