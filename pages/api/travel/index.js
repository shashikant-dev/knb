import Travel from '../../../models/mysql/Travel.js';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { category } = req.query;
        const filter = category ? { category } : {};
        const travels = await Travel.findAll(filter);
        res.status(200).json({ success: true, data: travels });
      } catch (error) {
        console.error('Travel GET error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'POST':
      try {
        const travel = await Travel.create(req.body);
        res.status(201).json({ success: true, data: travel });
      } catch (error) {
        console.error('Travel POST error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}