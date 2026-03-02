import { Social } from "../models/Social.model.js";

const createSocial = async (req, res) => {
    try {
        const data = req.body;

        if (Array.isArray(data)) {
            for (const social of data) {
                if (!social.title || !social.URL || !social.description) {
                    return res.status(400).json({
                        message: "Each item must have title, URL, description"
                    });
                }
            }

            const socials = await Social.insertMany(data);

            return res.status(201).json({
                message: "Social created successfully", socials
            });
        }

        const { title, URL, description } = data;

        if (!title || !URL || !description) {
            return res.status(400).json({
                message: "Title, URL, Description are required fields."
            });
        }

        const social = await Social.create({
            title,
            URL,
            description
        });

        res.status(201).json({
            message: "Social created successfully", social
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error: error.message
        });
    }
};

const getSocial = async (req, res) => {
    try {
        const socials = await Social.find().sort({ created_at: -1 }); // -1 means Newest First
        res.status(200).json(socials);
    } catch (error) {
        res.status(500).json({
            message: "internal Server Error", error: error.message
        });
    }
};

const updateSocial = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "No data provided for update"
            });
        }

        const social = await Social.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!social) return res.status(404).json({
            message: "Social not found"
        });

        res.status(200).json({
            message: "Social Updated Successfully", social
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error: error.message
        });
    }
};

const deleteSocial = async (req, res) => {
    try {
        const deleted = await Social.findByIdAndDelete(req.params.id);

        if (!deleted) return res.status(404).json({
            message: "Social Not Found"
        });

        res.status(200).json({
            message: "Social Successfully Deleted"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error: error.message
        });
    }
};

export {
    createSocial,
    getSocial,
    updateSocial,
    deleteSocial
}