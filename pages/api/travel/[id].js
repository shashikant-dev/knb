import Travel from '../../../models/mysql/Travel.js';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const travel = await Travel.findById(id);
        if (!travel) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: travel });
      } catch (error) {
        console.error('Travel GET error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'PUT':
      try {
        const travel = await Travel.update(id, req.body);
        if (!travel) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: travel });
      } catch (error) {
        console.error('Travel PUT error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'DELETE':
      try {
        if (!id || isNaN(parseInt(id))) {
          return res.status(400).json({ success: false, error: 'Invalid ID provided' });
        }
        
        const deleted = await Travel.delete(id);
        if (!deleted) {
          return res.status(404).json({ success: false, error: 'Travel package not found' });
        }
        
        res.status(200).json({ success: true, message: 'Travel package deleted successfully' });
      } catch (error) {
        console.error('Travel DELETE error:', error);
        res.status(500).json({ success: false, error: error.message || 'Internal server error' });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}