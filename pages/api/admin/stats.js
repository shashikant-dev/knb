import Property from '../../../models/mysql/Property.js';
import Hotel from '../../../models/mysql/Hotel.js';
import Travel from '../../../models/mysql/Travel.js';
import Blog from '../../../models/mysql/Blog.js';
import Contact from '../../../models/mysql/Contact.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const [propertiesData, hotelsData, travelsData, blogsData, contactsData] = await Promise.all([
      Property.findAll(),
      Hotel.findAll(),
      Travel.findAll(),
      Blog.findAll(),
      Contact.findAll()
    ]);

    res.status(200).json({
      success: true,
      data: {
        properties: propertiesData.length,
        hotels: hotelsData.length,
        travels: travelsData.length,
        blogs: blogsData.length,
        contacts: contactsData.length
      }
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}