import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Thought, User } from '../models/index.js';

// Aggregate function to get number of reactions

export const totalReactionss = async (thoughtId: string) => {
  const numberOfReactions = await Thought.aggregate([
      { $match: { _id: new ObjectId(thoughtId) } },
      { $project: { reactions: { $size: '$reactions' } } },
  ]);
  return numberOfReactions;
}

/**
 * Get all Thoughts /api//thoughts
 * @returns multiple Thought objects
 */
export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    return res.json(thoughts);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    });
  }
}

/**
 * GET Thoughts based on thoughtId api/thoughts/:thoughtId
 * @param string thoughtId
 * @returns a single Thought object
*/
export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
      const thought = await Thought.findOne( { _id: thoughtId } );
      if(thought) {
        return res.json(thought);
      } else {
        return res.status(404).json({
          message: 'Thought not found'
        });
      }
    } catch (error: any) {
      return res.status(500).json({
        message: error.message
      });
    }
  };

  /**
 * POST Thought /api/thoughts
 * @param object thought
 * @returns a single Thought object
*/
export const createThought = async (req: Request, res: Response) => {
    const thought = req.body;
    try {
      const newThought = await Thought.create(
        thought,
    );

      const userUpdate = await User.findByIdAndUpdate( { _id: thought.userId }, { $push: { thoughts: newThought._id } }, { new: true } );

      if (userUpdate) {
        return res.status(201).json(newThought);
      } else {
        return res.status(404).json({
          message: 'No user with this ID!'
        });
      }
    } catch (error: any) {
      return res.status(400).json({
        message: error.message
      });
    }
  };

/**
 * PUT Thought based on id /thoughts/:thoughtId
 * @param object Thought, thoughtId
 * @returns a single Thought object
*/
export const updateThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this ID!' });
      }

      return res.json(thought)
    } catch (error: any) {
      return res.status(400).json({
        message: error.message
      });
    }
  };

  /**
 * DELETE Thought based on id /thought/:thoughtId
 * @param string Thought
 * @returns string 
*/
export const deleteThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      
      if(!thought) {
        return res.status(404).json({
          message: 'No thought with that ID'
        });
      }

    return res.json({ message: 'Thought deleted!' });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message
      });
    }
  };

  /**
 * POST Thought reaction /api/thoughts/:thoughtId/reactions
 * @param object Thought, reaction
 * @returns a single Thought object
*/
export const createReaction = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this ID!' });
    }
    return res.json(thought);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
  }
}

/**
 * DELETE reaction based on thoughtId and reactionId /api/thoughts/:thoughtId/reactions/:reactionId
 * @param string thoughtId, reactionId
 * @returns string
 */
export const deleteReaction = async (req: Request, res: Response) => {
  const { thoughtId, reactionId } = req.params;
  try {
      const thought = await Thought.findByIdAndUpdate(
          thoughtId,
          { $pull: { reactions: { reactionId: reactionId } } },
          { runValidators: true, new: true }
      );
      if (thought) {
          return res.json(thought);
      } else {
          return res.status(404).json({
              message: 'No thought with this ID!'
          });
      }
  }
  catch (error: any) {
      return res.status(500).json({
          message: error.message
      });
  }
}
