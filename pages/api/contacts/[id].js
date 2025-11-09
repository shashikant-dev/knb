import Contact from '../../../models/mysql/Contact.js';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const updated = await Contact.update(id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Contact not found' });
      }
      res.status(200).json({ success: true, message: 'Contact updated successfully' });
    } catch (error) {
      console.error('Contact PUT error:', error);
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deleted = await Contact.delete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Contact not found' });
      }
      res.status(200).json({ success: true, message: 'Contact deleted successfully' });
    } catch (error) {
      console.error('Contact DELETE error:', error);
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}