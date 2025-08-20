# UK ERP System - Frontend

This is the frontend application for the UK ERP System, a comprehensive Enterprise Resource Planning solution for construction businesses.

## Features

The UK ERP System includes the following modules:

1. **User/Employee Management**
   - User registration and profile management
   - Role-based access control

2. **Site Management**
   - Site creation and tracking
   - Site status monitoring

3. **Work Order Management**
   - Work order creation and assignment
   - Status tracking and updates

4. **Role & Permission System**
   - 9 predefined roles (Site I/c, Department Technical I/c, etc.)
   - Granular permissions for each module

5. **Tools/Machinery/Equipment Management**
   - Inventory tracking
   - Equipment status management

6. **Checklist (Quality Aspects)**
   - Quality checklists creation
   - Compliance tracking

7. **Measurement Details (DPR)**
   - Daily progress reporting
   - Work measurement tracking

8. **Procurement Order Management**
   - Purchase order creation
   - Supplier management

9. **Attendance Management**
   - Employee attendance tracking
   - Time reporting

10. **Payment & Expense Sheet**
    - Payment processing
    - Expense tracking and approval

## Tech Stack

- **Frontend**: React.js with React Router
- **UI Framework**: React Bootstrap
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Notifications**: React Toastify

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Project Structure

```
src/
├── common/          # Shared components and utilities
├── components/      # Reusable UI components
├── pages/           # Page components for each module
├── services/        # API service layer
├── utils/           # Utility functions
├── interceptors/    # Axios interceptors
├── App.js          # Main application component
├── index.js        # Entry point
└── ...
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

## Backend Integration

This frontend connects to a backend API that provides all the ERP functionality. The backend is built with Node.js and MongoDB and includes:

- Complete RESTful API endpoints for all modules
- JWT-based authentication
- Role-based access control
- Comprehensive data validation

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).