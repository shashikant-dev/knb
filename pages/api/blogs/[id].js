import Blog from '../../../models/mysql/Blog.js';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const blog = await Blog.findById(id);
        if (!blog) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: blog });
      } catch (error) {
        console.error('Blog GET error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'PUT':
      try {
        const blog = await Blog.update(id, req.body);
        if (!blog) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: blog });
      } catch (error) {
        console.error('Blog PUT error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'DELETE':
      try {
        const deleted = await Blog.delete(id);
        if (!deleted) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        console.error('Blog DELETE error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}