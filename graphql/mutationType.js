const { 
  GraphQLObjectType, GraphQLString, GraphQLNonNull
} = require('graphql');
const loginHandler = require('../repository/login');
const createUserInputType = require('./inputTypes/createUserInputType');
const loginInputType = require('./inputTypes/loginInputType');
const updateUserInputType = require('./inputTypes/updateUserInputType');
const followUserInputType = require('./inputTypes/followUserInputType');

const loginResultType = require('./types/loginResultType');
const followType = require('./types/followType');
const userType = require('./types/userType');
const db = require('../models');
const { createUser, updateUser, followUser } = require('../repository/users');

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
    followUser: {
      type: followType,
      args: {
        followInput: {
          type: followUserInputType,
        },
      },
      resolve: async (source, args, context) => {
        return followUser(args.followInput, context);
      }
    }
  },
})

module.exports = mutationType;