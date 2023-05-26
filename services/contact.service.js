import mongoose from "mongoose";
import { Contact } from "../models/contact.model.js";

const getContact = async (data) => {
    try {
      const senderId = mongoose.Types.ObjectId(data.sender);
      const receiverId = mongoose.Types.ObjectId(data.receiver);
      const result = await Contact.find({ $and: [
        {sender: senderId},
        {receiver: receiverId}
      ]})
      return result;
    } catch (error) {
      throw error;
    }
  };

  const createContact = async (dataMessage) => {
    try {
        if(dataMessage.sender !== "" && dataMessage.receiver !== ""){
            const result = await Contact.create(dataMessage)
            return result
        }
        throw Error('Có gì đó không đúng ở đây')
    } catch (error) {
        throw error;
    }
  }
  export const ContactService = {getContact, createContact}