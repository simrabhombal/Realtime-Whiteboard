# **Realtime-Whiteboard**

## **Project Overview**
The Real-Time Collaborative Whiteboard is a sophisticated web-based application engineered using HTML, CSS, and Vanilla JavaScript. Designed to facilitate real-time collaboration, this tool offers a seamless experience for drawing, erasing, adding sticky notes, uploading images, and more. It serves as an ideal solution for remote teams, educators, and any setting where visual collaboration is essential.

## **Key Features**
1. Drawing and Erasing
   Users can draw on the whiteboard using a mouse or touch input, with support for various colors and brush sizes.
2. Eraser Tool
   The precise eraser tool allows users to remove unwanted drawings, ensuring a tidy workspace.
3. Sticky Notes
4. Users can place sticky notes on the whiteboard, useful for brainstorming, reminders, and annotations.
5. Image Integration
   Users can upload images directly onto the whiteboard, enhancing the collaborative experience.
6. Undo and Redo
   Undo/Redo Actions: The application supports robust undo and redo functionalities, enabling users to correct mistakes and     iterate on ideas effortlessly.
7. Download Whiteboard
   Users can download the entire whiteboard as an image file, making it easy to save and share their collaborative efforts.


## **Technical Details**

Frontend - 
Technologies Used: The frontend is developed with HTML for structure, CSS for styling, and Vanilla JavaScript for dynamic functionality.


Backend - 
Node.js and Express: The backend server is implemented using Node.js and Express, providing a robust and scalable foundation for handling client requests and serving static files.
Socket.io for Real-Time Communication: Utilizes Socket.io to enable real-time, bidirectional communication between clients and the server, ensuring all users receive updates instantaneously.

Real-Time Collaboration
WebSockets: Real-time collaboration is facilitated through WebSockets, allowing multiple users to interact with the whiteboard simultaneously with minimal latency.

## **Usage Scenarios**

Remote Work: Enhances productivity and communication among remote teams by providing a dynamic collaborative space.

Education: Serves as a valuable tool for teachers and students, enabling interactive lessons and group projects.

Creative Sessions: Ideal for brainstorming, mind mapping, and other creative processes that benefit from a visual medium.

## Installation Guide
### Prerequisites

Before you begin, ensure you have the following installed on your machine:

Node.js (version 12 or higher)
npm (Node Package Manager, comes with Node.js)

### Setup Instructions

Follow these steps to set up and run the Real-Time Collaborative Whiteboard on your local machine:

1. Clone the Repository

   First, clone the repository from GitHub to your local machine. Open your terminal and run the following command:
   
   git clone https://github.com/simrabhombal/Realtime-Whiteboard.git

2. Navigate to the Project Directory

   Change into the project directory:

   cd your-repository

3. Install Dependencies

   Install the required dependencies using npm:

   npm install

4. Run the Server

   Start the server by running the following command:

   node server.js
   You should see output indicating that the server is running, such as:
   Server running on port 3000
   
5. Access the Application

   Open your web browser and navigate to http://localhost:3000 to access the Real-Time Whiteboard.

## Demo Video
   https://streamable.com/tf96yx
