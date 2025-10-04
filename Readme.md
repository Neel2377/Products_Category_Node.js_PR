# Products_&_Category_Node.js_PR

A Node.js/Express application for product, category, subcategory, and client management.

# Project Link

- Link: https://products-category-node-js-pr.onrender.com

## Project Structure

- `index.js` - Main entry point
- `controllers/` - Route controllers for admin, category, client, etc.
- `models/` - Mongoose schemas for various entities
- `routers/` - Express routers for API endpoints
- `middlewares/` - Custom middleware (e.g., file upload)
- `configs/` - Configuration files (database, cloudinary, etc.)
- `public/` - Static assets (CSS, JS, images)
- `views/` - EJS templates for server-side rendering
- `uploads/` - Uploaded files

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Configure environment:**
   - Set up your MongoDB connection in `configs/db.js`.
   - Configure Cloudinary in `configs/cloudinary.js` if used.
3. **Run the app:**
   ```sh
   node index.js
   ```
   Or use nodemon for development:
   ```sh
   npx nodemon index.js
   ```

## Features
- Category, subcategory, and product management
- Client-side and admin-side routes
- File uploads
- EJS templating
- Static asset management

## License

MIT License
