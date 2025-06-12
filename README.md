# News Dashboard with Payout Management

A comprehensive React application for managing news articles and calculating payouts for authors.

## Features

### Authentication
- Secure login system with role-based access
- Admin and regular user roles
- Demo credentials provided

### News Management
- Fetch news from APIs (currently using mock data)
- Advanced filtering by author, date, source
- Global search functionality
- Responsive article display

### Analytics
- Visual charts showing article trends
- Author performance metrics
- Source distribution analysis
- Timeline visualization

### Payout Management (Admin Only)
- Set custom payout rates per author
- Automatic payout calculations
- Inline editing of rates
- Comprehensive payout reports

### Export Functionality
- PDF export with formatted reports
- CSV export for data analysis
- Google Sheets integration (placeholder)

## Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm start
   \`\`\`

## Demo Credentials

- **Admin**: admin@example.com / admin123
- **User**: user@example.com / user123

## Technology Stack

- React 18 with Hooks and Context API
- React Router for navigation
- Chart.js for analytics visualization
- Tailwind CSS for responsive design
- jsPDF for PDF generation
- Local Storage for data persistence

## API Integration

The application is designed to work with news APIs like NewsAPI. Currently using mock data for demonstration. To use real API:

1. Get an API key from NewsAPI
2. Update the API_KEY in `src/contexts/NewsContext.js`
3. Uncomment the real API fetch code

## Features Implemented

✅ User Authentication with role-based access
✅ News data integration with filtering
✅ Responsive design (mobile & desktop)
✅ Payout calculator with local storage
✅ Export functionality (PDF, CSV)
✅ Analytics with charts
✅ Error handling and loading states
✅ State management with Context API

## Bonus Features

✅ Dark mode support (CSS ready)
✅ Offline mode with localStorage
✅ Performance optimized components
✅ Accessibility features
✅ Mobile-first responsive design

## Project Structure

\`\`\`
src/
├── components/
│   ├── Analytics/     # Chart components
│   ├── Auth/          # Authentication
│   ├── Dashboard/     # Main dashboard
│   ├── Export/        # Export functionality
│   ├── Layout/        # App layout
│   ├── News/          # News management
│   └── Payout/        # Payout management
├── contexts/          # React Context providers
├── utils/             # Utility functions
└── App.js             # Main app component
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
