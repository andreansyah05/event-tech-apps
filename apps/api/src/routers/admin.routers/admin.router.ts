import { Router } from "express";
import { AdminController } from "../../controllers/admin.controllers/admin.event.controller";


const router = Router();
const adminController = new AdminController();

router.get("/events",
    adminController.getAllEvents.bind(adminController));

router.get("/events/:id",
    adminController.getEventById.bind(adminController));

router.post("/events", 
    adminController.createEvent.bind(adminController));
    
router.put("/events/:id", 
    adminController.updateEvent.bind(adminController));

router.delete("/events/:id", 
    adminController.deleteEvent.bind(adminController));


export default router;