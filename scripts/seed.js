import Property from '../models/mysql/Property.js';
import Hotel from '../models/mysql/Hotel.js';
import Travel from '../models/mysql/Travel.js';
import initDatabase from './init-mysql.js';

const sampleProperties = [
  {
    name: 'Exotica Pool Villa',
    location: 'Pattaya, Thailand',
    images: ['data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='],
    price: '$1,500,000',
    beds: 4,
    baths: 5,
    parking: 2,
    area: '4,500 sqft',
    description: 'A stunning masterpiece of modern design, this exclusive pool villa offers unparalleled luxury and privacy.',
    amenities: ['Infinity Pool', 'Private Gym', 'Home Theatre', 'Smart Home Automation'],
    type: 'residential',
    category: 'outright',
    agent: null,
    mapCoordinates: null,
    mapsUrl: null,
    videoUrl: null,
    features: [],
    size: null,
    icon: null
  },
  {
    name: 'KNB Tower - Grade A Office',
    location: 'Bangkok CBD',
    images: ['data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='],
    price: 'For Lease',
    beds: null,
    baths: null,
    parking: null,
    area: null,
    description: 'Prestigious Grade A office space in the heart of Bangkok\'s Central Business District.',
    amenities: [],
    type: 'commercial',
    category: 'rent',
    agent: null,
    mapCoordinates: null,
    mapsUrl: null,
    videoUrl: null,
    features: ['LEED Gold Certified', 'Direct BTS Access', '24/7 Security'],
    size: '5,000 sqft',
    icon: null
  }
];

const sampleHotels = [
  {
    name: 'Luxury Beach Resort',
    location: 'Phuket, Thailand',
    images: ['data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='],
    price: '$300/night',
    rating: 5,
    description: 'Beachfront luxury resort with world-class amenities and stunning ocean views.',
    amenities: ['Private Beach', 'Spa', 'Multiple Restaurants', 'Infinity Pool'],
    rooms: 150,
    category: 'luxury',
    mapCoordinates: null,
    mapsUrl: null,
    videoUrl: null
  }
];

const sampleTravel = [
  {
    name: 'Thailand Adventure Package',
    destination: 'Bangkok & Phuket',
    images: ['data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='],
    price: '$1,200/person',
    duration: '7 days',
    description: 'Experience the best of Thailand with this comprehensive adventure package.',
    includes: ['Flights', 'Hotels', 'Tours', 'Meals'],
    category: 'adventure',
    maxGuests: 8,
    highlights: ['Temple Tours', 'Island Hopping', 'Cultural Experiences'],
    mapsUrl: null,
    videoUrl: null
  }
];

async function seedDatabase() {
  try {
    // Initialize database and tables
    await initDatabase();
    console.log('Database initialized');

    // Insert sample data
    for (const property of sampleProperties) {
      await Property.create(property);
    }
    
    for (const hotel of sampleHotels) {
      await Hotel.create(hotel);
    }
    
    for (const travel of sampleTravel) {
      await Travel.create(travel);
    }

    console.log('Sample data inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();