# Odd2Tips

Odd2Tips is a platform tailored for both seasoned tipsters and betting enthusiasts. It offers specialized rooms called 'Tipster Rooms' for community interaction and effective marketing of betting insights. Users can create, customize, download, and share betslips without registration and access up-to-the-minute football news. The platform features predictions from tipsters, providing daily insights for football enthusiasts and betting fans.

## Features

- **Tipster Rooms**: Engage with a community of tipsters and betting enthusiasts.
- **Betslip Creation**: Create, customize, and share betslips instantly without the need for registration.
- **Daily Predictions**: Access daily football predictions from five expert tipsters.
- **Up-to-date News**: Stay informed with the latest football news and updates.

## Getting Started

Follow these instructions to set up the project on your local machine.

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB**

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/odd2tips.git
   cd odd2tips
   ```

2. **Install backend dependencies:**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**

   ```bash
   cd ../frontend
   npm install
   ```

### Running the Project

1. **Set up environment variables:**

   Create a `.env` file in the root of both the `backend` and `frontend` directories and copy the contents from `.env.example`:

   **Backend `.env` file:**

   ```env
   SPORTMONKS_API_TOKEN=*******************
   MONGO_URI=************************
   JWT_SECRET_KEY=************************

   CLOUDINARY_CLOUD_NAME=***************
   CLOUDINARY_API_KEY=***************
   CLOUDINARY_API_SECRET=***************
   CLOUDINARY_URL=cloudinary://***********************

   GOOGLE_CLIENT_ID=***************
   GOOGLE_CLIENT_SECRET=***************
   GOOGLE_REFRESH_TOKEN=***************
   GOOGLE_ACCESS_TOKEN=***************
   USER_EMAIL=***************
   USER_PASSWORD=***************

   SMTP_HOST=***************
   SMTP_PORT=***************
   SMTP_USER=***************
   SMTP_PASS=***************

   REDIS_URL=***********************

   TWITTERAPPTOKEN=***********************
   TWITTERAPPSECRET=***********************
   TWITTERACCESSTOKEN=***********************
   TWITTERACCESSSECRET=***********************
   TWITTERBEARERTOKEN=***********************
   TWITTERCLIENTID=***********************
   TWITTERCLIENTSECRET=***********************
   CONSUMER_TOKEN=***********************
   CONSUMER_SECRET=***********************

   GENERATIVE_AI_API_KEY=***********************
   ```

   **Frontend `.env` file:**

   ```env
   NEXT_PUBLIC_API_BASE_URL=**************
   BASE_API_URL=**************
   ```

2. **Start the backend server:**

   ```bash
   cd backend
   npm run dev
   ```

   The backend server will run on `http://localhost:5555`.

3. **Start the frontend server:**

   ```bash
   cd ../frontend
   npm run dev
   ```

   The frontend server will run on `http://localhost:3000`.

## Project Structure

- **backend**: Contains the Express.js server, routes, and MongoDB models.
- **frontend**: Contains the Next.js application, pages, and components.

### Backend

The backend server is built using Express.js and connects to a MongoDB database. It handles user authentication and data management.

**Key Files and Directories:**

- `app.mjs`: Main entry point of the backend server.
- `models/`: Contains Mongoose models for MongoDB.
- `routes/`: Contains Express routes for different endpoints.
- `utils/`: Contains utility functions, such as database connection.

### Frontend

The frontend is built using Next.js and React. It provides a responsive and interactive user interface for the platform.

**Key Files and Directories:**

- `pages/`: Contains Next.js pages.
- `components/`: Contains reusable React components.
- `public/`: Contains static assets.

## Contributing

We welcome contributions to Odd2Tips! If you have any suggestions, bug reports, or feature requests, feel free to open an issue or submit a pull request.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors and supporters of this project.
- Special thanks to the developers and maintainers of the libraries and frameworks used in this project.
