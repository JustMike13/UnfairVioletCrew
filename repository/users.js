const db = require('../models');

module.exports.getAllUsers = async () => {
  try {
    const allUsers = await db.User.findAll();
    return allUsers;
  } catch (error) {
    console.error('Something went wrong');
    return null;
  } 
}

module.exports.getUserById = async (id) => {
  return await db.User.findByPk(id);
}

module.exports.createUser = async (args) => {
  const { email, password, firstName, lastName } = args;
  try {
    const newUser = await db.User.create({
      email,
      password,
      firstName,
      lastName,
    });

    return newUser;

  } catch (error) {
    console.error(error);
    return null;
  }
}

// Updated User
module.exports.updateUser = async (args, context) => {
  const { user } = context;
  
  if(!user) {
    return null;
  }

  const { id } = user;
  
  const { email, firstName, lastName } = args;

  try {
    await db.User.update({
      email,
      firstName,
      lastName,
    }, { where: { id } });

    return await db.User.findByPk(id);

  } catch (e) {
    console.error(e);
    return null;
  }
}

// Follow User
module.exports.followUser = async (args, context) => {
  const { user } = context;
  
  if(!user) {
    return null;
  }

  const userFollowing = user.id;
  
  const userFollowed = args.id;

  var exists = db.Follow.findOne({ where: {userFollowing, userFollowed}});

  if(exists.email){
    return { token : "Allready following user"};
  }
  try {
    await db.Follow.create({
      userFollowing,
      userFollowed,
    });

    return { token : "Successfully followed user "};

  } catch (e) {
    console.error(e);
    return { token: "Error following user" };
  }
}

// Nothing
module.exports.deleteUser = (req, res) => {
  
}
