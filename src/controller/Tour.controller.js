import { Tour } from "../models/Tour.model.js";

export const getTours = async (req, res) => {
    try {
        const tours = await Tour.find().sort({ date: 1 });
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const processedTours = tours.map(tour => {
            const eventDate = new Date(tour.date);
            
            if (eventDate < today) {
                return {
                    ...tour._doc,
                    quantity: 0,
                    status: 'EXPIRED'
                };
            }
            return tour;
        });

        res.status(200).json(processedTours);
    } catch (error) {
        res.status(500).json({ message: "Transmission Error", error: error.message });
    }
};

export const seedTours = async (req, res) => {
    try {
        const tours = await Tour.insertMany(req.body);
        res.status(201).json({ message: "Database Seeded", count: tours.length });
    } catch (error) {
        res.status(400).json({ message: "Seeding Failed", error: error.message });
    }
};

export const updateTicketQuantity = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const updatedTour = await Tour.findOneAndUpdate({ id }, { quantity }, { new: true });
        res.status(200).json(updatedTour);
    } catch (error) {
        res.status(400).json({ message: "Update Failed" });
    }
};

export const deleteTour = async (req, res) => {
    try {
        const deleted = await Tour.findByIdAndDelete(req.params.id);

        if (!deleted) return res.status(404).json({
            message: "Tour Not Found"
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


export const closeOldShows = async () => {
    try {
        const todayStr = new Date().toISOString().split('T')[0];
        
        const result = await Tour.updateMany(
            { date: { $lt: todayStr }, quantity: { $ne: 0 } }, 
            { $set: { quantity: 0 } }
        );
        
        if (result.modifiedCount > 0) {
            console.log(`SYSTEM_UPDATE // ${result.modifiedCount} PAST_SHOWS_SET_TO_SOLD_OUT`);
        }
    } catch (error) {
        console.error("CRON_ERROR // FAILED_TO_UPDATE_OLD_SHOWS", error);
    }
};

export const updateTour = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "No data provided for update"
            });
        }

        const tour = await Tour.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!tour) return res.status(404).json({
            message: "Band Member not found"
        });

        res.status(200).json({
            message: "Band Member Updated Successfully", tour
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error: error.message
        });
    }
};