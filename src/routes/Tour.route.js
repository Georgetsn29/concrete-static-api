import { Router } from "express";
import { getTours, seedTours, updateTicketQuantity, deleteTour, updateTour } from "../controller/Tour.controller.js"
import { getBandMember } from "../controller/BandMember.controller.js";
import { Tour } from "../models/Tour.model.js";

const router = Router();

router.get("/", getTours);
router.get("/tours", getTours);
router.post("/seed", seedTours);
router.patch("/update/:id", updateTour);
router.patch("/updateTKT/:id", updateTicketQuantity)
router.delete("/delete/:id", deleteTour)
router.get("/members", getBandMember);


router.get("/crud", async (req, res) => {
    const tours = await Tour.find().sort({ createdAt: -1 });
    res.render("tourCrud", { tours });
});

router.post("/crud/add", async (req, res) => {
    await Tour.create(req.body);
    res.redirect("/api/v1/tours/crud");
});

router.post("/crud/update/:id", async (req, res) => {
    try {
        await Tour.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/api/v1/tours/crud");
    } catch (error) {
        res.status(500).send("Update failed: " + error.message);
    }
});

router.post("/crud/delete/:id", async (req, res) => {
    await Tour.findByIdAndDelete(req.params.id);
    res.redirect("/api/v1/tours/crud");
});

export default router;