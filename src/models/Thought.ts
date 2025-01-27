import { Schema, Types, model, type Document } from 'mongoose';

interface IThought extends Document {
    username: string,
    thoughtText: string,
    createdAt?: Schema.Types.Date,
    reactions?: [typeof reactionSchema],
}

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody: string,
    username: string,
    createdAt?: Schema.Types.Date,
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (timestamp: Date) => {
                return `${timestamp.toLocaleDateString()} at ${timestamp.toLocaleTimeString()}`;
            }
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true
    },
);

const thoughtSchema = new Schema<IThought>(
    {
        username: {
            type: String,
            required: true,
        },
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (timestamp: Date) => {
                return `${timestamp.toLocaleDateString()} at ${timestamp.toLocaleTimeString()}`;
            },
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
        timestamps: true,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions?.length || 0;
});


const Thought = model('Thought', thoughtSchema);

export default Thought;