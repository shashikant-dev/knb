import Property from '../../../models/mysql/Property.js';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const property = await Property.findById(id);
        if (!property) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: property });
      } catch (error) {
        console.error('Property GET error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'PUT':
      try {
        const property = await Property.update(id, req.body);
        if (!property) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: property });
      } catch (error) {
        console.error('Property PUT error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'DELETE':
      try {
        if (!id || isNaN(parseInt(id))) {
          return res.status(400).json({ success: false, error: 'Invalid ID provided' });
        }
        
        const deleted = await Property.delete(id);
        if (!deleted) {
          return res.status(404).json({ success: false, error: 'Property not found' });
        }
        
        res.status(200).json({ success: true, message: 'Property deleted successfully' });
      } catch (error) {
        console.error('Property DELETE error:', error);
        res.status(500).json({ success: false, error: error.message || 'Internal server error' });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}