import Hotel from '../../../models/mysql/Hotel.js';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const hotel = await Hotel.findById(id);
        if (!hotel) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: hotel });
      } catch (error) {
        console.error('Hotel GET error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'PUT':
      try {
        const hotel = await Hotel.update(id, req.body);
        if (!hotel) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: hotel });
      } catch (error) {
        console.error('Hotel PUT error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'DELETE':
      try {
        if (!id || isNaN(parseInt(id))) {
          return res.status(400).json({ success: false, error: 'Invalid ID provided' });
        }
        
        const deleted = await Hotel.delete(id);
        if (!deleted) {
          return res.status(404).json({ success: false, error: 'Hotel not found' });
        }
        
        res.status(200).json({ success: true, message: 'Hotel deleted successfully' });
      } catch (error) {
        console.error('Hotel DELETE error:', error);
        res.status(500).json({ success: false, error: error.message || 'Internal server error' });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}