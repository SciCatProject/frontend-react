# SciCat Frontend React

This project serves as a proof of concept for SciCat frontend built using the React framework. It is designed as a data catalog web application with advanced filtering and customization features for datasets.

## Installation
Before running the application, make sure you have the following prerequisites:

Backend: Ensure that the backend server ([scicat-backend-next](https://github.com/SciCatProject/scicat-backend-next)) is running locally. <br>
Docker: Docker should be installed on your machine.

Follow these steps to set up and run the application:

### 1. Clone the Repository
Clone the project repository to your local machine: <br>
`git clone https://github.com/SciCatProject/frontend-react.git`

### 2. Navigate to the Project Directory
Move into the project directory: <br>
`cd frontend-react`

### 3. Install Dependencies
Install the required dependencies using npm: <br>
`npm install`

### 4. Configure Backend Token
Obtain token from the backend server swagger and configure a 'tokenObj' within the project.

### 5. Run the Application
Start the development server to run the application: <br>
`npm run dev`

### 6. Access the Application
Once the server is running, open your web browser and go to: <br>
`localhost:8888`

## Features
### Searchable Interface
The application provides users with a search interface to explore datasets within the catalog. Users can enter keywords to search for specific datasets, making it easier to find relevant information.

### Advanced Filtering
Users can apply various filters to refine their search results. Filters include options such as type, creation location, and owner group, allowing users to narrow down their selections based on specific criteria.

### Customizable Data Table
The data table component offers extensive customization options for users. They can drag and drop columns to rearrange their order, resize columns for better visibility, and hide/show columns based on their preferences.

## Future Enhancements
While this proof of concept demonstrates the core functionalities of the data catalog web application, there are several areas for future improvement:

**User Authentication:** Implement user authentication and login functionality. <br>
**Enhanced Dataset Information:** Provide additional details and metadata about selected datasets, enhancing the user experience and understanding of the data.

## Technologies Used
The project leverages the following technologies and libraries:

**React:** A JavaScript library for building user interfaces. <br>
**Typescript:** A statically typed superset of JavaScript that enhances code quality and developer productivity. <br>
**Material-UI (MUI):** A popular React UI framework that provides pre-designed components and styles for building modern web applications. <br>
**mui-datatables:** A customizable data table component for React applications, offering advanced features for displaying and managing tabular data.

## Credits
This project is made by Signe Lindström with great assistance from Junjie Quan.
