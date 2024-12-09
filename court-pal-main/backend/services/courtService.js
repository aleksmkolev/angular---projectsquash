import Court from '../models/Court.js';

const getAllCourts = async () => {
    return await Court.find();
};

const addCourt = async (name, symbol, currentPrice, description, imageUrl, owner) => {
    return await Court.create({ name, symbol, currentPrice, description, imageUrl, owner });
};

const updateCourt = async (id, name, symbol, currentPrice, description, imageUrl) => {
    const updatedCourt = await Court.findByIdAndUpdate(
        id,
        { name, symbol, currentPrice, description, imageUrl },
        { new: true, runValidators: true }
    );

    if (!updatedCourt) throw new Error('Courtcurrency not found');
    return updatedCourt;
};

const deleteCourt = async (id) => {
    const deletedCourt = await Court.findByIdAndDelete(id);
    if (!deletedCourt) throw new Error('Courtcurrency not found');
    return deletedCourt;
};

const searchCourts = async (name, symbol) => {
    let query = {};

    if (name) {
        query.name = new RegExp(name, 'i');
    }

    if (symbol) {
        query.symbol = new RegExp(symbol, 'i');
    }

    return await Court.find(query);
};

const getCourtById = async (id) => {
    const court = await Court.findById(id)
        .populate('owner', 'username email')
        .populate({
            path: 'comments.user',
            select: 'username email',
        });
        
    if (!court) throw new Error('Court not found');
    return court;
};

const addComment = async (courtId, userId, text) => {
    const court = await Court.findById(courtId);
    if (!court) throw new Error('Courtcurrency not found');

    const comment = { user: userId, text, createdAt: new Date() };

    court.comments.push(comment);
    await court.save();

    await court.populate({
        path: 'comments.user',
        select: 'username email',
    });

    const populatedComment = court.comments[court.comments.length - 1];
    return populatedComment;
};

const updateComment = async (courtId, commentId, userId, text) => {
    const court = await Court.findById(courtId);
    if (!court) throw new Error('Courtcurrency not found');

    const comment = court.comments.id(commentId);
    if (!comment) throw new Error('Comment not found');

    if (comment.user.toString() !== userId) {
        throw new Error('Unauthorized to update this comment');
    }

    comment.text = text;
    await court.save();
    return comment;
};

const deleteComment = async (courtId, commentId, userId) => {
    const court = await Court.findById(courtId);
    if (!court) throw new Error('Courtcurrency not found');

    const comment = court.comments.id(commentId);
    if (!comment) throw new Error('Comment not found');

    if (comment.user.toString() !== userId) {
        throw new Error('Unauthorized to delete this comment');
    }

    comment.remove();
    await court.save();
    return { message: 'Comment deleted successfully' };
};

export default {
    getAllCourts,
    addCourt,
    updateCourt,
    deleteCourt,
    searchCourts,
    getCourtById,
    addComment,
    updateComment,
    deleteComment
};
