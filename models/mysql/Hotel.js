import dbConnect from '../../lib/mysql.js';

class Hotel {
  static async findAll(filters = {}) {
    const connection = await dbConnect();
    let query = 'SELECT * FROM hotels';
    const params = [];

    if (filters.category) {
      query += ' WHERE category = ?';
      params.push(filters.category);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await connection.execute(query, params);
    return rows.map(this.formatHotel);
  }

  static async findById(id) {
    const connection = await dbConnect();
    const [rows] = await connection.execute('SELECT * FROM hotels WHERE id = ?', [id]);
    return rows.length > 0 ? this.formatHotel(rows[0]) : null;
  }

  static async create(data) {
    const connection = await dbConnect();
    const images = data.images ? Buffer.from(JSON.stringify(data.images)) : null;

    const [result] = await connection.execute(`
      INSERT INTO hotels (
        name, location, images, price, rating, description, amenities,
        rooms, category, map_lat, map_lng, maps_url, video_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      data.name || null, data.location || null, images, data.price || null,
      data.rating || null, data.description || null, JSON.stringify(data.amenities || []),
      data.rooms || null, data.category || null, data.mapCoordinates?.lat || null,
      data.mapCoordinates?.lng || null, data.mapsUrl || null, data.videoUrl || null
    ]);

    return this.findById(result.insertId);
  }

  static async update(id, data) {
    const connection = await dbConnect();
    const images = data.images ? Buffer.from(JSON.stringify(data.images)) : null;

    await connection.execute(`
      UPDATE hotels SET
        name = ?, location = ?, images = ?, price = ?, rating = ?,
        description = ?, amenities = ?, rooms = ?, category = ?,
        map_lat = ?, map_lng = ?, maps_url = ?, video_url = ?
      WHERE id = ?
    `, [
      data.name || null, data.location || null, images, data.price || null,
      data.rating || null, data.description || null, JSON.stringify(data.amenities || []),
      data.rooms || null, data.category || null, data.mapCoordinates?.lat || null,
      data.mapCoordinates?.lng || null, data.mapsUrl || null, data.videoUrl || null, id
    ]);

    return this.findById(id);
  }

  static async delete(id) {
    const connection = await dbConnect();
    
    try {
      // First check if the hotel exists
      const [existsResult] = await connection.execute('SELECT id FROM hotels WHERE id = ?', [id]);
      if (existsResult.length === 0) {
        return false;
      }
      
      // Perform the delete
      const [result] = await connection.execute('DELETE FROM hotels WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Hotel delete error:', error);
      throw error;
    }
  }

  static formatHotel(row) {
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
      location: row.location,
      images: row.images ? safeJsonParse(row.images.toString(), []) : [],
      price: row.price,
      rating: row.rating,
      description: row.description,
      amenities: safeJsonParse(row.amenities, []),
      rooms: row.rooms,
      category: row.category,
      mapCoordinates: {
        lat: row.map_lat,
        lng: row.map_lng
      },
      mapsUrl: row.maps_url,
      videoUrl: row.video_url,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
}

export default Hotel;