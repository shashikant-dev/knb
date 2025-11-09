import dbConnect from '../../lib/mysql.js';

class Blog {
  static async findAll(filters = {}) {
    const connection = await dbConnect();
    let query = 'SELECT * FROM blogs';
    const params = [];

    if (filters.category) {
      query += ' WHERE category = ?';
      params.push(filters.category);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await connection.execute(query, params);
    return rows.map(this.formatBlog);
  }

  static async findById(id) {
    const connection = await dbConnect();
    const [rows] = await connection.execute('SELECT * FROM blogs WHERE id = ?', [id]);
    return rows.length > 0 ? this.formatBlog(rows[0]) : null;
  }

  static async findBySlug(slug) {
    const connection = await dbConnect();
    const [rows] = await connection.execute('SELECT * FROM blogs WHERE slug = ?', [slug]);
    return rows.length > 0 ? this.formatBlog(rows[0]) : null;
  }

  static async create(data) {
    const connection = await dbConnect();
    const image = data.image ? Buffer.from(data.image, 'base64') : null;

    const [result] = await connection.execute(`
      INSERT INTO blogs (
        title, slug, content, excerpt, category, image, author_name, published
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      data.title || null, data.slug || null, data.content || null, data.excerpt || null,
      data.category || null, image, data.author?.name || null, data.published || false
    ]);

    return this.findById(result.insertId);
  }

  static async update(id, data) {
    const connection = await dbConnect();
    const image = data.image ? Buffer.from(data.image, 'base64') : null;

    await connection.execute(`
      UPDATE blogs SET
        title = ?, slug = ?, content = ?, excerpt = ?, category = ?,
        image = ?, author_name = ?, published = ?
      WHERE id = ?
    `, [
      data.title || null, data.slug || null, data.content || null, data.excerpt || null,
      data.category || null, image, data.author?.name || null, data.published || false, id
    ]);

    return this.findById(id);
  }

  static async delete(id) {
    const connection = await dbConnect();
    const [result] = await connection.execute('DELETE FROM blogs WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static formatBlog(row) {
    return {
      _id: row.id,
      id: row.id,
      title: row.title,
      slug: row.slug,
      content: row.content,
      excerpt: row.excerpt,
      category: row.category,
      image: row.image ? `data:image/jpeg;base64,${row.image.toString('base64')}` : null,
      author: {
        name: row.author_name
      },
      published: row.published,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
}

export default Blog;