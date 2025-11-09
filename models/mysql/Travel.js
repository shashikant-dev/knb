import dbConnect from '../../lib/mysql.js';

class Travel {
  static async findAll(filters = {}) {
    const connection = await dbConnect();
    let query = 'SELECT * FROM travel';
    const params = [];

    if (filters.category) {
      query += ' WHERE category = ?';
      params.push(filters.category);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await connection.execute(query, params);
    return rows.map(this.formatTravel);
  }

  static async findById(id) {
    const connection = await dbConnect();
    const [rows] = await connection.execute('SELECT * FROM travel WHERE id = ?', [id]);
    return rows.length > 0 ? this.formatTravel(rows[0]) : null;
  }

  static async create(data) {
    const connection = await dbConnect();
    const images = data.images ? Buffer.from(JSON.stringify(data.images)) : null;

    const [result] = await connection.execute(`
      INSERT INTO travel (
        name, destination, images, price, duration, description,
        includes, category, max_guests, highlights, maps_url, video_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      data.name || null, data.destination || null, images, data.price || null,
      data.duration || null, data.description || null, JSON.stringify(data.includes || []),
      data.category || null, data.maxGuests || null, JSON.stringify(data.highlights || []),
      data.mapsUrl || null, data.videoUrl || null
    ]);

    return this.findById(result.insertId);
  }

  static async update(id, data) {
    const connection = await dbConnect();
    const images = data.images ? Buffer.from(JSON.stringify(data.images)) : null;

    await connection.execute(`
      UPDATE travel SET
        name = ?, destination = ?, images = ?, price = ?, duration = ?,
        description = ?, includes = ?, category = ?, max_guests = ?,
        highlights = ?, maps_url = ?, video_url = ?
      WHERE id = ?
    `, [
      data.name || null, data.destination || null, images, data.price || null,
      data.duration || null, data.description || null, JSON.stringify(data.includes || []),
      data.category || null, data.maxGuests || null, JSON.stringify(data.highlights || []),
      data.mapsUrl || null, data.videoUrl || null, id
    ]);

    return this.findById(id);
  }

  static async delete(id) {
    const connection = await dbConnect();
    
    try {
      // First check if the travel package exists
      const [existsResult] = await connection.execute('SELECT id FROM travel WHERE id = ?', [id]);
      if (existsResult.length === 0) {
        return false;
      }
      
      // Perform the delete
      const [result] = await connection.execute('DELETE FROM travel WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Travel delete error:', error);
      throw error;
    }
  }

  static formatTravel(row) {
    // Helper function to safely parse JSON
    const safeJsonParse = (jsonString, defaultValue = []) => {
      if (!jsonString) return defaultValue;
      try {
        return JSON.parse(jsonString);
      } catch (error) {
        console.warn('Failed to parse JSON:', jsonString, error.message);
        return defaultValue;
      }
    };

    return {
      _id: row.id,
      id: row.id,
      name: row.name,
      destination: row.destination,
      images: row.images ? safeJsonParse(row.images.toString(), []) : [],
      price: row.price,
      duration: row.duration,
      description: row.description,
      includes: safeJsonParse(row.includes, []),
      category: row.category,
      maxGuests: row.max_guests,
      highlights: safeJsonParse(row.highlights, []),
      mapsUrl: row.maps_url,
      videoUrl: row.video_url,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
}

export default Travel;