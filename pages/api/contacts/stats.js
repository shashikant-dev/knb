import Contact from '../../../models/mysql/Contact.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { period = '7d' } = req.query;
    const connection = await Contact.findAll();
    const now = new Date();

    let chartData = [];
    let periodContacts = [];

    if (period === '1y') {
      // Get monthly data for the last 12 months
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

        const monthContacts = connection.filter(contact => {
          const contactDate = new Date(contact.createdAt);
          return contactDate >= date && contactDate < nextMonth;
        });

        chartData.push({
          date: date.toISOString().split('T')[0],
          count: monthContacts.length,
          resolved: monthContacts.filter(c => c.status === 'resolved').length,
          label: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
        });
      }

      // Get all contacts from the last year for status counts
      const yearStart = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      periodContacts = connection.filter(contact => {
        const contactDate = new Date(contact.createdAt);
        return contactDate >= yearStart;
      });
    } else if (period === '30d') {
      // Get daily data for the last 30 days
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];

        const dayContacts = connection.filter(contact => {
          const contactDate = new Date(contact.createdAt).toISOString().split('T')[0];
          return contactDate === dateStr;
        });

        chartData.push({
          date: dateStr,
          count: dayContacts.length,
          resolved: dayContacts.filter(c => c.status === 'resolved').length,
          label: date.getDate().toString()
        });
      }

      const monthStart = new Date(now);
      monthStart.setDate(monthStart.getDate() - 29);
      monthStart.setHours(0, 0, 0, 0);

      periodContacts = connection.filter(contact => {
        const contactDate = new Date(contact.createdAt);
        return contactDate >= monthStart;
      });
    } else {
      // Default: Get daily data for the last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];

        const dayContacts = connection.filter(contact => {
          const contactDate = new Date(contact.createdAt).toISOString().split('T')[0];
          return contactDate === dateStr;
        });

        chartData.push({
          date: dateStr,
          count: dayContacts.length,
          resolved: dayContacts.filter(c => c.status === 'resolved').length,
          label: date.toLocaleDateString('en-US', { weekday: 'short' })
        });
      }

      const weekStart = new Date(now);
      weekStart.setDate(weekStart.getDate() - 6);
      weekStart.setHours(0, 0, 0, 0);

      periodContacts = connection.filter(contact => {
        const contactDate = new Date(contact.createdAt);
        return contactDate >= weekStart;
      });
    }

    const statusCounts = {
      new: periodContacts.filter(c => c.status === 'new').length,
      resolved: periodContacts.filter(c => c.status === 'resolved').length
    };

    res.status(200).json({
      success: true,
      data: {
        chartData,
        statusCounts,
        total: connection.length,
        period
      }
    });
  } catch (error) {
    console.error('Contact stats error:', error);
    res.status(400).json({ success: false, error: error.message });
  }
}