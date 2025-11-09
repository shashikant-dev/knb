import mysql from 'mysql2/promise';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'knb_group';

async function initDatabase() {
  let connection;
  
  try {
    // Connect without database first
    connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      charset: 'utf8mb4'
    });

    // Create database if it doesn't exist
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    
    // Close connection and reconnect to the specific database
    await connection.end();
    connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      charset: 'utf8mb4'
    });

    // Create properties table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS properties (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        images LONGBLOB,
        price VARCHAR(100) NOT NULL,
        beds INT,
        baths INT,
        parking INT,
        area VARCHAR(100),
        description TEXT NOT NULL,
        amenities JSON,
        type ENUM('residential', 'commercial') NOT NULL,
        category ENUM('rent', 'outright') NOT NULL,
        agent_name VARCHAR(255),
        agent_image LONGBLOB,
        agent_specialty VARCHAR(255),
        map_lat DECIMAL(10, 8),
        map_lng DECIMAL(11, 8),
        maps_url TEXT,
        video_url TEXT,
        features JSON,
        size VARCHAR(100),
        icon VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create hotels table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS hotels (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        images LONGBLOB,
        price VARCHAR(100) NOT NULL,
        rating INT CHECK (rating >= 1 AND rating <= 5),
        description TEXT NOT NULL,
        amenities JSON,
        rooms INT,
        category ENUM('luxury', 'business', 'budget') NOT NULL,
        map_lat DECIMAL(10, 8),
        map_lng DECIMAL(11, 8),
        maps_url TEXT,
        video_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create travel table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS travel (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        destination VARCHAR(255) NOT NULL,
        images LONGBLOB,
        price VARCHAR(100) NOT NULL,
        duration VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        includes JSON,
        category ENUM('adventure', 'luxury', 'cultural', 'beach') NOT NULL,
        max_guests INT,
        highlights JSON,
        maps_url TEXT,
        video_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create blogs table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        content LONGTEXT NOT NULL,
        excerpt TEXT NOT NULL,
        category ENUM('KNB Wealth', 'KNB Properties', 'Encore Hotels & Villas', 'KNB Travel & DMC', 'Business Services') NOT NULL,
        image LONGBLOB NOT NULL,
        author_name VARCHAR(255) NOT NULL,
        published BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create contacts table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        mobile VARCHAR(50),
        phone VARCHAR(50),
        service VARCHAR(100) DEFAULT 'general',
        subject VARCHAR(255) DEFAULT 'Contact Inquiry',
        message TEXT NOT NULL,
        status ENUM('new', 'in-progress', 'resolved') DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database and tables created successfully!');
    
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initDatabase().catch(console.error);
}

export default initDatabase;