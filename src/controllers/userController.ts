import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { User } from '../models/index.js';


// Aggregate function to get number of users overall

export const totalUsers = async () => {
    const numberOfUsers = await User.aggregate()
        .count('userCount');
    return numberOfUsers;
}

// Aggregate function to get number of friends

export const totalFriends = async (userId: string) => {
    const numberOfFriends = await User.aggregate([
        { $match: { _id: new ObjectId(userId) } },
        { $project: { friends: { $size: '$friends' } } },
    ]);
    return numberOfFriends;
}

/**
 * GET All Users /user
 * @returns an array of Users
*/
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();

        const userObj = {
            users,
            totalUsers: await totalUsers(),
        }

        return res.json(userObj);
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
}

/**
 * GET All friends based on userId /user/friend/:userId
 * @param string userId
 * @returns an array of Users
 */
/*
export const getFriends = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        
        if (user) {
            if (user.friends.length > 0) {
                const friends = user.friends;
                return res.json(friends);
            } else {
                return res.status(404).json({
                    message: 'No friends found'
                });
            }        
        } else {
            return res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
}
*/
/**
 * GET User based on id /user/:userId
 * @param string UserId
 * @returns a single User object
*/
export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById({_id: userId})
            .populate('friends')
            .populate('thoughts');
        if (user) {
            return res.json({
                user
            });
        } else {
            return res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
};

/**
 * POST User /user
 * @param object user
 * @returns a single user object
*/

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}

/**
 * Post Friend /user/friend/:userId
 * @param string userId
 * @returns a single user object
 */

export const addFriend = async (req: Request, res: Response) => {
    const { userId, friendId } = req.params;
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { friends: friendId } },
            { new: true }
        );
        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
}

/**
 * PUT User based on id /user/:userId
 * @param string id
 * @returns a single user object
*/
  
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }

        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}

/**
 * PUT Friend based on userId and friendId /user/friend/:userId/:friendId
 * @param string userId, friendId
 * @returns a single user object
 */
/*
export const updateFriend = async (req: Request, res: Response) => {
    const { userId, friendId } = req.params;
    try {
        const user = await User.findByIdAndUpdate(
            { _id: userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
}
*/

/**
 * DELETE User based on id /user/:userId
 * @param string id
 * @returns string 
*/

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }

        return res.json({ message: 'User successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

/**
 * DELETE Friend based on userId and friendId /user/friend/:userId/:friendId
 * @param string userId, friendId
 * @returns string
 */
export const deleteFriend = async (req: Request, res: Response) => {
    const { userId, friendId } = req.params;
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: friendId } },
            { new: true }
        );
        if (user) {
            return res.json({
                message: 'Friend successfully deleted'
            });
        } else {
            return res.status(404).json({
                message: 'User not found'
            });
        }
    }
    catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
}

/**
 * POST Assignment based on /students/:studentId/assignments
 * @param string id
 * @param object assignment
 * @returns object student 
*/
/*
export const addThought = async (req: Request, res: Response) => {
    console.log('You are adding a thought');
    console.log(req.body);
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { thoughts: req.body } },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }

        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}
*/
/**
 * DELETE Assignment based on /students/:studentId/assignments
 * @param string assignmentId
 * @param string studentId
 * @returns object student 
*/
/*
export const removeThought = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { thoughts: { thoughtId: req.params.thoughtId } } },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }

        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}
*/