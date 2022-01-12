const { 
  GraphQLObjectType, GraphQLString, GraphQLNonNull
} = require('graphql');

const loginHandler = require('../repository/login');

const createUserInputType = require('./inputTypes/createUserInputType');
const loginInputType = require('./inputTypes/loginInputType');
const updateUserInputType = require('./inputTypes/updateUserInputType');
const createCommentInputType = require('./inputTypes/createCommentInputType');
const followUserInputType = require('./inputTypes/followUserInputType');
const likePostInputType = require('./inputTypes/likePostInputType');

const followResultType = require('./types/followResultType');
const loginResultType = require('./types/loginResultType');
const userType = require('./types/userType');
const commentType = require('./types/commentType');
const followType = require('./types/followType');
const likeType = require('./types/likeType');

const { createUser, updateUser, followUser, unfollowUser } = require('../repository/users');
const { createComment, likePost } = require('../repository/posts');
const pubsub = require('../pubsub');

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login: {
      type: loginResultType,
      args: {
        loginInput: {
          type: loginInputType,
        }
      },
      resolve: (source, args) => {
        const { email, password } = args.loginInput;
        
        const token = loginHandler(email, password);

        return {
          token,
        }
      }
    },
    createUser: {
      type: userType,
      args: {
        createUserInput: {
          type: createUserInputType,
        }
      },
      resolve: async (source, args) => {
        return createUser(args.createUserInput)
      }
    },
    updateUser: {
      type: userType,
      args: {
        updateUserInput: {
          type: updateUserInputType,
        },
      },
      resolve: async (source, args, context) => {
        return updateUser(args.updateUserInput, context);
      }
    },
    createComment: {
      type: commentType,
      args: {
        createCommentInput: {
          type: createCommentInputType,
        }
      },
      resolve: async (source, args, context) => {
        const userId = context.user.id;

        const comment = await createComment(
          args.createCommentInput.postId, 
          userId,
          args.createCommentInput.body,
        );

        pubsub.publish('comments', {
          postComments: {
            comment: comment.toJSON(),
          }
        });
        return comment;
      }
    },
    followUser: {
      type: followResultType,
      args: {
        followInput: {
          type: followUserInputType,
        },
      },
      resolve: async (source, args, context) => {
        return followUser(args.followInput, context);
      }
    },
    unfollowUser: {
      type: followType,
      args: {
        followInput: {
          type: followUserInputType,
        },
      },
      resolve: async (source, args, context) => {
        return unfollowUser(args.followInput, context);
      }
    },
    likePost: {
      type: likeType,
      args: {
        likePostInput: {
          type: likePostInputType,
        }
      },
      resolve: async (source, args, context) => {
        return likePost(args.likePostInput, context);
      }
    }
  },
})

module.exports = mutationType;