import express from 'express';
import { ContactsCollection } from '../models/contacts.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const contacts = await ContactsCollection.find();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
});

export default router;
