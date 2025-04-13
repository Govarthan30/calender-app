# Calendar Application

A modern, interactive calendar application built with React, Redux, and FullCalendar. This application allows users to manage events and goals with a beautiful, responsive interface.

## Features

- 📅 Interactive calendar with week view
- 🎯 Goal management with color coding
- 📝 Task management within goals
- 🎨 Drag and drop functionality
- 📱 Responsive design for all devices
- 🔄 Real-time updates
- 🗑️ Easy deletion of events and goals
- 🎨 Customizable event colors
- 📊 Task tracking and organization

## Tech Stack

- **Frontend:**
  - React
  - Redux Toolkit
  - TypeScript
  - FullCalendar
  - CSS Modules
  - Axios

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Govarthan30/calendar-app.git
cd calendar-app
```

2. Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../calendar-frontend
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb+srv://gova:Gova%4012345@cluster0.jrzuz.mongodb.net/?retryWrites=true&w=majority
PORT=5000
```
```ALL data are stored in cluster in test collection```

4. Start the development servers:

```bash
# Start backend server
cd backend
npm start

# Start frontend server
cd ../calendar-frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Project Structure

```
calendar-app/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
└── calendar-frontend/
    ├── src/
    │   ├── app/
    │   ├── components/
    │   ├── features/
    │   │   ├── calendar/
    │   │   ├── events/
    │   │   └── goals/
    │   ├── styles/
    │   └── types/
    ├── package.json
    └── tsconfig.json
```

## Features in Detail

### Calendar View
- Week-based calendar view
- Drag and drop events
- Resizable events
- Color-coded events
- Event details modal

### Goals Management
- Create and manage goals
- Color-coded goals
- Task list within goals
- Drag tasks to calendar
- Delete goals with confirmation

### Event Management
- Create events
- Edit event details
- Delete events
- Drag and drop events
- Resize events
- Color customization

### Responsive Design
- Mobile-friendly interface
- Adaptive layout
- Touch-friendly interactions
- Responsive typography
- Smooth animations

## API Endpoints

### Events
- `GET /events` - Get all events
- `POST /events` - Create a new event
- `PUT /events/:id` - Update an event
- `DELETE /events/:id` - Delete an event

### Goals
- `GET /goals` - Get all goals
- `POST /goals` - Create a new goal
- `DELETE /goals/:id` - Delete a goal

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Developer

👨‍💻 **Govarthan**

- LinkedIn: [Govarthan](https://www.linkedin.com/in/govarthan-v)
- Portfolio: [govarthan.com](https://govarthan.netfily.app)

## Acknowledgments

- FullCalendar for the amazing calendar component
- Redux Toolkit for state management
- MongoDB for the database
- All contributors and supporters 