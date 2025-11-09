import Blog from '../../../models/mysql/Blog.js';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { category, limit } = req.query;
        const filter = category && category !== 'All' ? { category } : {};
        const blogs = await Blog.findAll(filter);
        
        let filteredBlogs = blogs.filter(blog => blog.published);
        
        if (limit) {
          filteredBlogs = filteredBlogs.slice(0, parseInt(limit));
        }
        
        res.status(200).json({ success: true, data: filteredBlogs });
      } catch (error) {
        console.error('Blogs GET error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'POST':
      try {
        const blog = await Blog.create(req.body);
        res.status(201).json({ success: true, data: blog });
      } catch (error) {
        console.error('Blogs POST error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}