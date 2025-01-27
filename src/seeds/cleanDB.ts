import {Thought, User} from '../models/index.js';

const cleanDB = async (): Promise<void> => {
    try {
        await Thought.deleteMany({});
        console.log('Thoughts cleaned.');

        await User.deleteMany({});
        console.log('Users cleaned.');

        return;
    } catch (error: any) {
        console.error('Error cleaning collections:', error);
        process.exit(1);
    }
}

export default cleanDB;