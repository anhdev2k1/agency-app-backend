import { ContactService } from "../services/contact.service.js";

const getContact = async (req, res) => {
  try {
    const result = await ContactService.getContact(req.body);
    res.status(200).json({
      status: "Get Contact is successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
const createContact = async (req, res) => {
    try {
      const result = await ContactService.createContact(req.body);
      res.status(200).json({
        status: "Send contact is successfully!!",
        data: result,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  };
export const ContactController = {getContact, createContact}