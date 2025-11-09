import dbConnect from '../../lib/mysql.js';

class Contact {
  static async findAll() {
    const connection = await dbConnect();
    const [rows] = await connection.execute('SELECT * FROM contacts ORDER BY created_at DESC');
    return rows.map(this.formatContact);
  }

  static async findById(id) {
    const connection = await dbConnect();
    const [rows] = await connection.execute('SELECT * FROM contacts WHERE id = ?', [id]);
    return rows.length > 0 ? this.formatContact(rows[0]) : null;
  }

  static async create(data) {
    const connection = await dbConnect();

    const [result] = await connection.execute(`
      INSERT INTO contacts (name, email, mobile, phone, service, subject, message, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      data.name || null, 
      data.email || null, 
      data.mobile || data.phone || null,
      data.phone || null,
      data.service || 'general',
      data.subject || 'Contact Inquiry',
      data.message || null,
      data.status || 'new'
    ]);

    return this.findById(result.insertId);
  }

  static async update(id, data) {
    const connection = await dbConnect();
    const [result] = await connection.execute(
      'UPDATE contacts SET status = ? WHERE id = ?',
      [data.status, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const connection = await dbConnect();
    const [result] = await connection.execute('DELETE FROM contacts WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static formatContact(row) {
    return {
      _id: row.id,
      id: row.id,
      name: row.name || '',
      email: row.email || '',
      mobile: row.mobile || row.phone || '',
      phone: row.phone || '',
      service: row.service || 'general',
      subject: row.subject || 'Contact Inquiry',
      message: row.message || '',
      status: row.status || 'new',
      createdAt: row.created_at
    };
  }
}

export default Contact;