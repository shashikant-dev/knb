import Blog from '../../../../models/mysql/Blog.js';

export default async function handler(req, res) {
  const { method } = req;
  const { slug } = req.query;

  switch (method) {
    case 'GET':
      try {
        const blog = await Blog.findBySlug(slug);
        if (!blog || !blog.published) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: blog });
      } catch (error) {
        console.error('Blog slug GET error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}