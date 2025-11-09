import Hotel from '../../../models/mysql/Hotel.js';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { category } = req.query;
        const filter = category ? { category } : {};
        const hotels = await Hotel.findAll(filter);
        res.status(200).json({ success: true, data: hotels });
      } catch (error) {
        console.error('Hotels GET error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'POST':
      try {
        const hotel = await Hotel.create(req.body);
        res.status(201).json({ success: true, data: hotel });
      } catch (error) {
        console.error('Hotels POST error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}