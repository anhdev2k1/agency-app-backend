import express from 'express';
import { ContactController } from '../controllers/contact.controller.js';
const router = express.Router();

router.route('/contacts').post(ContactController.getContact);
router.route('/contact').post(ContactController.createContact);
export const contactRoute = router;
