# KNB Group - Next.js Full Stack Application

A comprehensive Next.js application with MySQL backend for managing properties, hotels, and travel packages.

## Features

- **Dynamic Content Management**: Properties, Hotels, and Travel packages with full CRUD operations
- **Admin Portal**: Complete admin interface for managing all content
- **MySQL Integration**: Persistent data storage with MySQL database
- **BLOB Image Storage**: Images stored directly in database as BLOBs
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **API Routes**: RESTful API endpoints for all entities

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- MySQL 8.0+ (local or remote instance)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create `.env.local` with your MySQL connection details:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=knb_group
   ADMIN_SECRET=your-admin-secret-key
   ```

3. **Start MySQL:**
   Make sure MySQL is running on your system

4. **Initialize and seed the database:**
   ```bash
   npm run init-db
   npm run seed
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to `http://localhost:3000`

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin portal pages
│   ├── properties/        # Properties pages
│   ├── hotels/           # Hotels pages
│   └── travel/           # Travel packages pages
├── pages/api/            # API routes
├── models/               # MySQL models
├── lib/                  # Utilities (MySQL connection)
├── scripts/              # Database seeding scripts
└── components/           # Reusable components
```

## API Endpoints

### Properties
- `GET /api/properties` - Get all properties (with optional type filter)
- `POST /api/properties` - Create new property
- `GET /api/properties/[id]` - Get specific property
- `PUT /api/properties/[id]` - Update property
- `DELETE /api/properties/[id]` - Delete property

### Hotels
- `GET /api/hotels` - Get all hotels (with optional category filter)
- `POST /api/hotels` - Create new hotel
- `GET /api/hotels/[id]` - Get specific hotel
- `PUT /api/hotels/[id]` - Update hotel
- `DELETE /api/hotels/[id]` - Delete hotel

### Travel
- `GET /api/travel` - Get all travel packages (with optional category filter)
- `POST /api/travel` - Create new travel package
- `GET /api/travel/[id]` - Get specific travel package
- `PUT /api/travel/[id]` - Update travel package
- `DELETE /api/travel/[id]` - Delete travel package

## Admin Portal

Access the admin portal at `/v1` to:
- Manage properties (residential and commercial)
- Manage hotel listings
- Manage travel packages
- Add, edit, and delete content dynamically

## Key Pages

- `/` - Homepage with navigation to all sections
- `/properties` - Dynamic properties listing with filtering
- `/hotels` - Dynamic hotels listing with category filtering
- `/travel` - Dynamic travel packages with category filtering
- `/v1` - Admin dashboard for content management

## Technologies Used

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes, MySQL, mysql2
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom utilities
- **Image Storage**: BLOB storage in MySQL database

## Development

The application uses Next.js App Router for modern React development with:
- Server-side rendering (SSR)
- Static site generation (SSG) where appropriate
- API routes for backend functionality
- Dynamic routing for individual item pages

## Deployment

For production deployment:

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

Make sure to update the MySQL connection environment variables for your production MySQL instance.

## cPanel Deployment Notes

- Ensure your cPanel hosting supports Node.js applications
- Create a MySQL database through cPanel
- Update environment variables with your cPanel MySQL credentials
- Images are stored as BLOBs in the database, eliminating file storage requirements
- Run `npm run init-db` once to create the database tables# knb
