import { Router } from "express";
import { createSocial, deleteSocial, getSocial, updateSocial } from "../controller/Social.controller.js";
import { Social } from "../models/Social.model.js";


const router = Router();

router.route('/').get(getSocial);
router.route('/getSocial').get(getSocial);
router.route('/create').post(createSocial);
router.route('/update/:id').patch(updateSocial);
router.route('/delete/:id').delete(deleteSocial);



router.get("/crud", async (req, res) => {
    const socials = await Social.find().sort({ createdAt: -1 });
    res.render("socialCrud", { socials });
});

router.post("/crud/add", async (req, res) => {
    await Social.create(req.body);
    res.redirect("/api/v1/socials/crud");
});

router.post("/crud/update/:id", async (req, res) => {
    try {
        await Social.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/api/v1/socials/crud");
    } catch (error) {
        res.status(500).send("Update failed: " + error.message);
    }
});

router.post("/crud/delete/:id", async (req, res) => {
    await Social.findByIdAndDelete(req.params.id);
    res.redirect("/api/v1/socials/crud");
});



export default router