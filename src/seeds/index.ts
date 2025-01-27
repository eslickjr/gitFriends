import db from '../config/connection.js';
import { Thought, User } from '../models/index.js';
import cleanDB from './cleanDB.js';
//import { getRandomName, getRandomThoughts, getRandomReactions } from './data.js';
import { getRandomName } from './data.js';
import mongoose from 'mongoose';

try {
  await db();
  await cleanDB();

  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    // Get a random name and email
    const username = getRandomName();
    const email = `${username.split(' ').join('.')}@gmail.com`;
    const friendList: mongoose.Types.ObjectId[] = [];
    const thoughts: mongoose.Types.ObjectId[] = [];

    users.push({
      username,
      email,
      friendList,
      thoughts,
    });
  }

  // Add students to the collection and await the results
  const userData = await User.create(users);

  userData.map(async ( x ) => {
    // get a random number of friends (0 to 5)
    const friendCount = Math.floor(Math.random() * 5);

    // loop throught friend count
    for (let j = 0; j < friendCount; j++) {
      x.friends.push(userData[Math.floor(Math.random() * userData.length)]._id as mongoose.Schema.Types.ObjectId);
    }
    console.log(`User ${x.username} has ${x.friends}`);

    // get a random number of thoughts (0 to 5)
    //const thoughtCount = Math.floor(Math.random() * 5);

    //const thoughtText = getRandomThoughts(thoughtCount);

    const thoughts: any[] = [{
      thoughtText: 'nothoughts',
      username: x.username,
    }];
  
    /*
    thoughtText.map(async ( thought ) => {
      const reactionCount = Math.floor(Math.random() * 5);

      for (let k = 0; k < reactionCount; k++) {
        const reactionObj = {
          reaction: getRandomReactions(1),
          username: userData[Math.floor(Math.random() * userData.length)].username
        };
        thought.reactions.push(reactionObj);
      }

      thoughts.push({
        username: x.username,
        thoughtText: thought,
      });
    });
*/
    console.log(thoughts);
    const thoughtData = await Thought.create(thoughts[0]);
    console.log(thoughtData);

    // x.thoughts = thoughtData.map((thought: any) => thought._id);

    // const updatedUser = await User.findByIdAndUpdate(x._id, x);
    // console.log(updatedUser);
    // await x.save();
  });

  // Log out the seed data to indicate what should appear in the database
  console.info('Seeding complete! 🌱');
  process.exit(0);
} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}

