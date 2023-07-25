# Notebook
This is an immersive Notebook app that was designed to make you feel like you would when you open your notebook, and flip to each page as you document your everyday life. With a soothing color scheme and intuitive interface, this creates a no-nonsense experience to journaling.

# Frontend
The frontend of this app was built with React and TypeScript using Vite as a runtime environment. 
This project also utilized: 
- React Hook Form for all form components
- React Query/Axios to query data, cache data, and make API calls
- React Router for all client-side routing
- React-Spring to emulate turning pages with the Horizontal Parallax
  
Most of the styling was done using Tailwind CSS while the majority of the transitions and animations use pure CSS. 


# Backend 
A Notebook API was written in TypeScript and built to handle handle user authentication and note storage using:
- Express to build out the routes and handle business logic
- bcrypt to hash and salt passwords
- MongoDB as the database

The entire project is hosted on Heroku from the individual branches on this Github.


# Install
To run the project on your local environment clone the repository and use npm like below:
```console
git clone https://github.com/alewilliam789/notebook.git
npm install
```

And to preview run 
```console
npm run preview
```
