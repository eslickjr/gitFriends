import { Router } from 'express';

const router = Router();

import {
    getAllUsers,
    getUserById,
    createUser,
    addFriend,
    updateUser,
    deleteUser,
    deleteFriend,
} from '../../controllers/userController.js';

// /api/user
router.route('/').get(getAllUsers).post(createUser);

// /api/user/:userId
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


// /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

export { router as userRouter };
  