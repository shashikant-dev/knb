import dbConnect from '../../lib/mysql.js';

class Property {
  static async findAll(filters = {}) {
    const connection = await dbConnect();
    let query = 'SELECT * FROM properties';
    const params = [];

    if (Object.keys(filters).length > 0) {
      const conditions = [];
      if (filters.type) {
        conditions.push('type = ?');
        params.push(filters.type);
      }
      if (filters.category) {
        conditions.push('category = ?');
        params.push(filters.category);
      }
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await connection.execute(query, params);
    return rows.map(this.formatProperty);
  }

  static async findById(id) {
    const connection = await dbConnect();
    const [rows] = await connection.execute('SELECT * FROM properties WHERE id = ?', [id]);
    return rows.length > 0 ? this.formatProperty(rows[0]) : null;
  }

  static async create(data) {
    const connection = await dbConnect();
    const images = data.images ? Buffer.from(JSON.stringify(data.images)) : null;
    const agentImage = data.agent?.image ? Buffer.from(data.agent.image, 'base64') : null;

    const [result] = await connection.execute(`
      INSERT INTO properties (
        name, location, images, price, beds, baths, parking, area, description,
        amenities, type, category, agent_name, agent_image, agent_specialty,
        map_lat, map_lng, maps_url, video_url, features, size, icon
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      data.name || null, data.location || null, images, data.price || null,
      data.beds || null, data.baths || null, data.parking || null, data.area || null,
      data.description || null, JSON.stringify(data.amenities || []),
      data.type || null, data.category || null, data.agent?.name || null, agentImage,
      data.agent?.specialty || null, data.mapCoordinates?.lat || null,
      data.mapCoordinates?.lng || null, data.mapsUrl || null, data.videoUrl || null,
      JSON.stringify(data.features || []), data.size || null, data.icon || null
    ]);

    return this.findById(result.insertId);
  }

  static async update(id, data) {
    const connection = await dbConnect();
    const images = data.images ? Buffer.from(JSON.stringify(data.images)) : null;
    const agentImage = data.agent?.image ? Buffer.from(data.agent.image, 'base64') : null;

    await connection.execute(`
      UPDATE properties SET
        name = ?, location = ?, images = ?, price = ?, beds = ?, baths = ?,
        parking = ?, area = ?, description = ?, amenities = ?, type = ?,
        category = ?, agent_name = ?, agent_image = ?, agent_specialty = ?,
        map_lat = ?, map_lng = ?, maps_url = ?, video_url = ?, features = ?,
        size = ?, icon = ?
      WHERE id = ?
    `, [
      data.name || null, data.location || null, images, data.price || null,
      data.beds || null, data.baths || null, data.parking || null, data.area || null,
      data.description || null, JSON.stringify(data.amenities || []),
      data.type || null, data.category || null, data.agent?.name || null, agentImage,
      data.agent?.specialty || null, data.mapCoordinates?.lat || null,
      data.mapCoordinates?.lng || null, data.mapsUrl || null, data.videoUrl || null,
      JSON.stringify(data.features || []), data.size || null, data.icon || null, id
    ]);

    return this.findById(id);
  }

  static async delete(id) {
    const connection = await dbConnect();
    
    try {
      // First check if the property exists
      const [existsResult] = await connection.execute('SELECT id FROM properties WHERE id = ?', [id]);
      if (existsResult.length === 0) {
        return false;
      }
      
      // Perform the delete
      const [result] = await connection.execute('DELETE FROM properties WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Property delete error:', error);
      throw error;
    }
  }

  static formatProperty(row) {
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
      beds: row.beds,
      baths: row.baths,
      parking: row.parking,
      area: row.area,
      description: row.description,
      amenities: safeJsonParse(row.amenities, []),
      type: row.type,
      category: row.category,
      agent: {
        name: row.agent_name,
        image: row.agent_image ? `data:image/jpeg;base64,${row.agent_image.toString('base64')}` : null,
        specialty: row.agent_specialty
      },
      mapCoordinates: {
        lat: row.map_lat,
        lng: row.map_lng
      },
      mapsUrl: row.maps_url,
      videoUrl: row.video_url,
      features: safeJsonParse(row.features, []),
      size: row.size,
      icon: row.icon,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
}

export default Property;