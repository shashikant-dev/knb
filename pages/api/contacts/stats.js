import Contact from '../../../models/mysql/Contact.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const connection = await Contact.findAll();
    
    // Get stats for the last 7 days
    const now = new Date();
    const last7Days = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayContacts = connection.filter(contact => {
        const contactDate = new Date(contact.createdAt).toISOString().split('T')[0];
        return contactDate === dateStr;
      });
      
      last7Days.push({
        date: dateStr,
        count: dayContacts.length,
        label: date.toLocaleDateString('en-US', { weekday: 'short' })
      });
    }

    // Get counts by status for last 7 days only
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - 6);
    weekStart.setHours(0, 0, 0, 0);
    
    const weekContacts = connection.filter(contact => {
      const contactDate = new Date(contact.createdAt);
      return contactDate >= weekStart;
    });
    
    const statusCounts = {
      new: weekContacts.filter(c => c.status === 'new').length,
      contacted: weekContacts.filter(c => c.status === 'contacted').length,
      resolved: weekContacts.filter(c => c.status === 'resolved').length
    };

    res.status(200).json({ 
      success: true, 
      data: {
        last7Days,
        statusCounts,
        total: connection.length
      }
    });
  } catch (error) {
    console.error('Contact stats error:', error);
    res.status(400).json({ success: false, error: error.message });
  }
}