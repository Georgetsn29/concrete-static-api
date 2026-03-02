import { BandMember } from "../models/BandMember.model.js";

const createBandMember = async (req, res) => {
    try {
        const data = req.body;

        if (Array.isArray(data)) {
            for (const bendMember of data) {
                if (!bandMember.title || !bandMember.URL || !bandMember.description) {
                    return res.status(400).json({
                        message: "Each item must have name, imageURL, description"
                    });
                }
            }

            const bandMembers = await BandMember.insertMany(data);

            return res.status(201).json({
                message: "Band Member created successfully", bandMembers
            });
        }

        const { id, name, position, description, imagePattern, imageURL } = data;

        if (!id || !name || !position || !description || !imagePattern || !imageURL) {
            return res.status(400).json({
                message: "name position description imagePatter and imageURL are required fields."
            });
        }

        const bandMember = await BandMember.create({
            id,
            name,
            position,
            description,
            imagePattern,
            imageURL
        });

        res.status(201).json({
            message: "Band Member Created Successfully", bandMember
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error: error.message
        });
    }
};

const getBandMember = async (req, res) => {
    try {
        const bandMember = await BandMember.find().sort({ created_at: 1 });
        res.status(200).json(bandMember);
    } catch (error) {
        res.status(500).json({
            message: "internal Server Error", error: error.message
        });
    }
};

const updateBandMember = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "No data provided for update"
            });
        }

        const bandMember = await BandMember.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!bandMember) return res.status(404).json({
            message: "Band Member not found"
        });

        res.status(200).json({
            message: "Band Member Updated Successfully", bandMember
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error: error.message
        });
    }
};

const deleteBandMember = async (req, res) => {
    try {
        const deleted = await BandMember.findByIdAndDelete(req.params.id);

        if (!deleted) return res.status(404).json({
            message: "BandMember Not Found"
        });

        res.status(200).json({
            message: "BandMember Successfully Deleted"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error: error.message
        });
    }
};

export {
    createBandMember,
    getBandMember,
    updateBandMember,
    deleteBandMember
}