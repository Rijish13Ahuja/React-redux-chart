# Dynamic Table with Real-Time Chart

A web application featuring a dynamic CRUD-enabled table and a real-time chart implemented using React, Redux, and Chart.js. The app is styled with Tailwind CSS and provides a fully responsive user experience. It includes authentication functionality and is hosted on [Vercel](#deployment).

---

## Features

### 1. Dynamic Table (CRUD Operations)
- **Create:** Add new rows dynamically with validation (e.g., numeric fields like `pnl` and `margin`).
- **Read:** Displays data from a CSV file upon loading.
- **Update:** Inline row editing with real-time updates.
- **Delete:** Delete rows with a single click.

### 2. Authentication
- Login functionality with mock authentication.
- **Username:** `admin`  
- **Password:** `password`
- Displays error messages for invalid credentials.

### 3. Real-Time Line Chart
- Implements a real-time chart using Chart.js.
- Simulates data streaming and highlights the latest data points.
- Displays tooltips for better user insights.

### 4. Recovery Mechanism
- Reset the table to its initial state by reloading the original CSV data.
- Includes error handling for CSV reload failures.

### 5. Error Handling
- Validates inputs and shows clear error messages using React Toastify.
- Handles errors for invalid operations, recovery mechanism failures, and authentication.

### 6. UI Enhancements
- Fully responsive and styled with Tailwind CSS.
- Smooth transitions and hover effects for a polished user experience.

### 7. State Management
- Uses Redux for managing:
  - Table data state.
  - CRUD operation statuses.
  - Real-time chart data.

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository_url>
cd <repository_name>
```

### 2. Install Dependencies
Make sure you have Node.js installed, then run:
```bash
npm install
```

### 3. Environment Variables
If required, create a `.env` file in the root directory and add any environment variables, such as:
```plaintext
REACT_APP_BASE_URL=<your_backend_url>
```

### 4. Run the Application Locally
```bash
npm start
```
The app will run on `http://localhost:3000`.

---

## Deployment

The app is hosted on **Vercel/Netlify**. You can access it at:

**[Hosted App URL](#)**

---

## Project Structure

```
src/
├── assets/
│   ├── backend_table.csv
├── components/
│   ├── Chart/
│   │   ├── LineChart.jsx
│   ├── Table/
│   │   ├── DataTable.jsx
│   │   ├── rowValidations.js
├── features/
│   ├── authSlice.js
│   ├── dataSlice.js
├── pages/
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── ResetPassword.jsx
├── routes/
│   ├── AppRoutes.jsx
│   ├── ProtectedRoute.jsx
├── services/
│   ├── csvLoader.js
├── store/
│   ├── chartSlice.js
│   ├── tableSlice.js
│   ├── store.js
├── App.css
├── App.jsx
├── index.css
├── main.jsx
```

---

## How to Use

### 1. Login
- Navigate to the login page (`/`).
- Enter the following credentials:
  - **Username:** `admin`
  - **Password:** `password`
- If credentials are correct, you will be redirected to the dashboard.  
- If credentials are invalid, an error message will appear.

### 2. Dynamic Table
- Add a new row using the form at the top.
- Inline edit rows by clicking on the editable fields.
- Delete rows using the "Delete" button.

### 3. Reset Password
- Click the "Reset it here" link on the login page if you forget your password.
- You will be redirected to a placeholder page with a message stating that the feature is not implemented yet.

### 4. Real-Time Chart
- Observe the chart updating dynamically with simulated real-time data.

### 5. Reset Table
- Use the "Reset Table" button to restore the initial state.

---

## Technologies Used

- **Frontend Framework:** React
- **State Management:** Redux
- **UI Styling:** Tailwind CSS
- **Charting Library:** Chart.js
- **Notifications:** React Toastify
- **Routing:** React Router
- **Hosting:** Vercel/Netlify

---

## Roadmap

### Completed
- CRUD operations for the table.
- Real-time line chart.
- Reset mechanism with error handling.
- Authentication with mock login.
- Dark theme UI with responsive design.
- Redux integration for state management.
- Hosting on Vercel/Netlify.

### Future Enhancements
- Add persistent storage for table data.
- Enhance the chart with additional datasets.
- Implement a fully functional password reset feature.

---

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push the branch: `git push origin feature-branch-name`.
5. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

