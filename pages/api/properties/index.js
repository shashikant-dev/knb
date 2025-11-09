import Property from '../../../models/mysql/Property.js';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { type, category } = req.query;
        const filter = {};
        if (type) filter.type = type;
        if (category) filter.category = category;
        const properties = await Property.findAll(filter);
        res.status(200).json({ success: true, data: properties });
      } catch (error) {
        console.error('Properties GET error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'POST':
      try {
        const property = await Property.create(req.body);
        res.status(201).json({ success: true, data: property });
      } catch (error) {
        console.error('Properties POST error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}