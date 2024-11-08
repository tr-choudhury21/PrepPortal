
# PrepPortal - A Study Management App 📚🖊️

PrepPortal is a MERN stack application that enables alumni and senior students of a college to share valuable resources, including notes and study materials, to help juniors prepare for semester exams and placements—all accessible for free!

## Features

- **Resource Sharing:** Allows alumni and seniors to upload preparation resources for semester exams and placements.

- **Free Access:** Resources are freely available, making quality materials accessible to all students.

- **User-friendly & Minimalistic UI:** Styled with Tailwind CSS and ShadCN components for a clean, responsive, and user-friendly experience.


## Tech Stack

**Client:** React, TailwindCSS, ShadCN components

**Server:** Node.js, Express.js 

**Database:** MongoDB

**Authentication:** JWT(Json Web Token)


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Installation

### Prerequisites

- **Nodejs** installed on your machine

- **MongoDB** setup and running

Clone the project

```bash
  git clone https://github.com/tr-choudhury21/PrepPortal.git
```
Go to the server directory & install dependencies for server

```bash
  cd backend
  npm install
```

Go to the client directory & install dependencies for client

```bash
  cd ../frontend
  npm install
```

Start the client & server

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGO_URL = <your-mongodb-connection-string>`

`CLIENT_URL`

`JWT_SECRET_KEY`

`JWT_EXPIRES`

`COOKIE_EXPIRE`

`CLOUDINARY_CLOUD_NAME = <your-cloudinary-cloud-name>`

`CLOUDINARY_API_SECRET = <your-cloudinary-api-secret>`

`CLOUDINARY_API_KEY = <your-cloudinary-api-key>`






## Running Tests

To run tests, run the following command

```bash
  npm run dev
```


## Contributing

Contributions are always welcome!

- Fork the project.
- Create a new branch
```bash
    git checkout -b feature/AmazingFeature
```
- Commit your changes
```bash
    git commit -m 'Add some new features'
```
- Push to the branch
```bash
    git push origin feature/AmazingFeature
```
- Open a pull request


Please adhere to this project's `code of conduct`.


## Feedback

If you have any feedback, please reach out to us at tituraychoudhury@gmail.com

