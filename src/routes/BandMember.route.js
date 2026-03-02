import { Router } from "express";
import { createBandMember, deleteBandMember, getBandMember, updateBandMember } from "../controller/BandMember.controller.js";
import { BandMember } from "../models/BandMember.model.js";



const router = Router();

router.route('/').get(getBandMember);
router.route('/getBandMember').get(getBandMember);
router.route('/create').post(createBandMember);
router.route('/update/:id').patch(updateBandMember);
router.route('/delete/:id').delete(deleteBandMember);


router.get("/crud", async (req, res) => {
    const bandMembers = await BandMember.find().sort({ createdAt: -1 });
    res.render("bandMemberCrud", { bandMembers });
});

router.post("/crud/add", async (req, res) => {
    await BandMember.create(req.body);
    res.redirect("/api/v1/bandMembers/crud");
});

router.post("/crud/update/:id", async (req, res) => {
    try {
        await BandMember.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/api/v1/bandMembers/crud");
    } catch (error) {
        res.status(500).send("Update failed: " + error.message);
    }
});

router.post("/crud/delete/:id", async (req, res) => {
    await BandMember.findByIdAndDelete(req.params.id);
    res.redirect("/api/v1/bandMembers/crud");
});



export default router 