import courtService from '../services/courtService.js';

const getAllCourts = async (req, res) => {
    try {
        const courts = await courtService.getAllCourts();
        res.json(courts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCourtById = async (req, res) => {
    const { id } = req.params;

    try {
        const court = await courtService.getCourtById(id);
        if (!court) return res.status(404).json({ message: 'Court not found' });
        res.json(court);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addCourt = async (req, res) => {
    const { name, symbol, currentPrice, description, imageUrl } = req.body;

    try {
        console.log('Request body:', req.body);
        console.log('User ID:', req.userId);
        
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        
        const newCourt = await courtService.addCourt(name, symbol, currentPrice, description, imageUrl, userId);
        res.status(201).json(newCourt);
    } catch (error) {
        console.error('Error adding court:', error);
        res.status(400).json({ message: error.message });
    }
};

const updateCourt = async (req, res) => {
    const { id } = req.params;
    const { name, symbol, currentPrice, description, imageUrl } = req.body;

    try {
        const court = await courtService.getCourtById(id);

        if (!court || court.owner?._id.toString() !== req.userId) {
            return res.status(403).json({ message: 'Unauthorized to update this court' });
        }

        const updatedCourt = await courtService.updateCourt(id, name, symbol, currentPrice, description, imageUrl);
        res.json(updatedCourt);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCourt = async (req, res) => {
    const { id } = req.params;

    try {
        const court = await courtService.getCourtById(id);   

        if (!court || court.owner?._id.toString() !== req.userId) {
            return res.status(403).json({ message: 'Unauthorized to delete this court' });
        }

        await courtService.deleteCourt(id);
        res.json({ message: 'Court deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchCourts = async (req, res) => {
    const { name, symbol } = req.query;

    try {
        const courts = await courtService.searchCourts(name, symbol);
        res.json(courts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

    const addComment = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    try {
        const userId = req.userId;
        const comment = await courtService.addComment(id, userId, text);
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateComment = async (req, res) => {
    const { id, commentId } = req.params;
    const { text } = req.body;

    try {
        const userId = req.userId;
        const updatedComment = await courtService.updateComment(id, commentId, userId, text);
        res.json(updatedComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteComment = async (req, res) => {
    const { id, commentId } = req.params;

    try {
        const userId = req.userId;
        const response = await courtService.deleteComment(id, commentId, userId);
        res.json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    getAllCourts,
    getCourtById,
    addCourt,
    updateCourt,
    deleteCourt,
    searchCourts,
    addComment,
    updateComment,
    deleteComment,
};
