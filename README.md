# Moje Repertorium Online

A basic implemention of a platform for translators to work more efficiently. Built with React, ASP.NET Core and MySQL.
Interesting features of the application: email verification, password hashing, list pagination and many more.
## Features

### User Authentication & Authorization
- User registration with email verification
- JWT-based authentication
- Role-based access control with the following user types:
  - **Administrator** (full system access)
  - **Guest** (information page and register/login possibilities)
  - **Translator** (working with translates and languages)

### Content Management

#### Translates 
- Create new translates (**Translator**)
- Edit translates (**Translator**)
- Delete translates (**Translator**)
- Show all translates with pagination of the list (**Translator**)

#### Languages  
- Assign one of the available languages to a translator(**Translator**)
- Edit a language assigned to a translator(**Translator**)
- Delete a language from the languages assigned to a translator(**Translator**)
- Show all the languages assigned to a translator with list pagination(**Translator**, **Admin**)
- Add a new language to the system (**Admin**)
- Delete a language from the system (**Admin**)
- Edit a language in the system (**Admin**)


### Administrative Features regarding users (Admin Only)
- Show all translators with list pagination
- Change translator information
- Delete a translator from the system

#### Translators and their work 
- View all translates of a translator with list pagination
- Add a new translate record
- Delete a translate record
- Edit the details of a translate record

---

## Inside the App

### Home page
![image](https://github.com/user-attachments/assets/40b8bd31-6c27-4ec2-bc4d-15440c98b59f)
### Info page
![image](https://github.com/user-attachments/assets/bf3a9158-fa5a-4ecb-aa83-7a710fd3c57b)
### Register panel
#### Validation during registration process happens both in the frontend and backend of the app.
![image](https://github.com/user-attachments/assets/7167c6b6-0869-4da6-b576-fe563150d7de)
### Admin Languages Panel 
![image](https://github.com/user-attachments/assets/78b94b62-4092-466d-850c-c1cddbf6af48)
### Admin Users Panel
![image](https://github.com/user-attachments/assets/494e2931-18fc-4685-a3b8-3a85a5085839)
### User Translates Panel
![image](https://github.com/user-attachments/assets/5e37ccfa-3655-422f-8993-aaef46d8db38)
#### Showing the details of a translate record 
![image](https://github.com/user-attachments/assets/fa7725e8-4083-42d8-ac63-b2181f5a3b43)
#### Editing a translate record 
![image](https://github.com/user-attachments/assets/6b4120b0-f42c-44b8-aa44-62906e680bb3)
### User credentials & languages panel
![image](https://github.com/user-attachments/assets/556baaba-6be5-4404-ae4b-501221242dfb)
#### User panel during editing
![image](https://github.com/user-attachments/assets/b47cf1a6-9d55-44c4-b76f-66a4abf397ab)

---

## Technologies

### Frontend
- React.js
- React Router for navigation
- Axios for API communication
- CSS for styling

### Backend
- ASP.NET Core
- EntityFrameworkCore&LINQ for database communication
- JSON Web Tokens (JWT) for authentication
- System.Net.Mail for email handling during registration
- Bcrypt for password hashing

### Database
- MySQL

## Database Schema
![image](https://github.com/user-attachments/assets/9877735c-a10d-4ea8-a414-bf54196c74e6)

## API Documentation

### Admin
- **GET** `/MojeRep/admin/Languages`
- **POST** `/MojeRep/admin/Languages`
- **DELETE** `/MojeRep/admin/Languages/{languageId}`
- **PUT** `/MojeRep/admin/Languages/{languageId}`

### AdminUsers
- **GET** `/MojeRep/admin/users/{startIndex}/{amountToShow}`
- **GET** `/MojeRep/admin/users/amount`
- **PUT** `/MojeRep/admin/users/{userId}`
- **DELETE** `/MojeRep/admin/users/{userId}`

### Login
- **PUT** `/MojeRep/login`
- **POST** `/MojeRep/login`
- **GET** `/MojeRep/login/{userId}`

### Tlumacz
- **GET** `/MojeRep/tlumacz/{userId}/Credentials`
- **PUT** `/MojeRep/tlumacz/{userId}/Credentials`
- **GET** `/MojeRep/tlumacz/{userId}/Languages/amount`
- **GET** `/MojeRep/tlumacz/{userId}/Languages/{startIndex}/{amountToShow}`
- **DELETE** `/MojeRep/tlumacz/{userId}/Languages/{languageId}`
- **POST** `/MojeRep/tlumacz/{userId}/Languages`
- **PUT** `/MojeRep/tlumacz/{userId}/Languages`

### Tlumaczenia 
- **POST** `/MojeRep/tlumacz/{userId}/tlumaczenia`
- **PUT** `/MojeRep/tlumacz/{userId}/tlumaczenia/{translateId}`
- **DELETE** `/MojeRep/tlumacz/{userId}/tlumaczenia/{translateId}`
- **GET** `/MojeRep/tlumacz/{userId}/tlumaczenia/{translateId}`
- **GET** `/MojeRep/tlumacz/{userId}/tlumaczenia/Ilosc`
- **GET** `/MojeRep/tlumacz/{userId}/tlumaczenia/{startIndex}/{amountToShow}`


