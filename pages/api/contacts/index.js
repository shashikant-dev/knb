import Contact from '../../../models/mysql/Contact.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const contacts = await Contact.findAll();
      res.status(200).json({ success: true, data: contacts });
    } catch (error) {
      console.error('Contacts GET error:', error);
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const contact = await Contact.create(req.body);
      res.status(201).json({ success: true, data: contact });
    } catch (error) {
      console.error('Contacts POST error:', error);
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}