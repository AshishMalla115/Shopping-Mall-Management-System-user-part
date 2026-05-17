# User Management System

A focused Spring Boot backend application for user management operations including user registration, authentication, and profile management.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Development Team](#development-team)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Testing](#testing)

## Project Overview

The User Management System is a streamlined backend application that provides core functionality for managing user operations. It includes user registration, authentication, and profile management capabilities.

## Tech Stack

- **Backend Framework**: Spring Boot 3.3.0
- **Java Version**: Java 22
- **Build Tool**: Maven
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA + Hibernate
- **Testing**: JUnit 5 + Mockito
- **Utilities**: Lombok

## Features

### Core Modules
- **User Management**: User registration, authentication, and profile management

### Key Functionality
- RESTful API design
- Secure user authentication
- User profile management
- Exception handling

## Project Structure

```
src/main/java/com/shoppingmall/
|-- entity/                 # JPA Entities
|   |-- User.java
|-- repository/             # Data Access Layer
|   |-- IUserRepository.java
|-- service/                # Business Logic Layer
|   |-- IUserService.java
|   |-- impl/               # Service Implementations
|       |-- UserServiceImpl.java
|-- controller/             # REST Controllers
|   |-- UserController.java
|-- exception/              # Custom Exception Handling
|   |-- GlobalExceptionHandler.java
|   |-- UserNotFoundException.java
|-- config/                 # Configuration
|   |-- ApplicationConfig.java
|-- ShoppingMallManagementApplication.java  # Main Application Class
```

## Development Team

### Project Contributors

| Module | Developer | ID | Role |
|--------|----------|----|------|
| **User Management** | Malla Ashish | T140100337 | Backend Developer |

### Module Responsibilities

- **User Management Module**: User authentication, registration, profile management

## Getting Started

### Prerequisites

- Java 22 or higher
- PostgreSQL 12 or higher
- Maven 3.6+
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

### Database Setup

1. Install and start PostgreSQL
2. Create a database:
   ```sql
   CREATE DATABASE mall_db;
   ```
3. Update database credentials in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/mall_db
   spring.datasource.username=postgres
   spring.datasource.password=your_password
   ```

### Running the Application

#### Using Maven
```bash
mvn clean install
mvn spring-boot:run
```

#### Using IDE
1. Open the project in your IDE
2. Run `ShoppingMallManagementApplication.java`

The application will start on `http://localhost:8080`

## API Endpoints

### User Management
- `POST /api/users/signup` - User registration
- `POST /api/users/login` - User authentication
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID

## Database Schema

### Key Entities

- **User**: Base user entity with authentication details including name, type, and password

## Testing

The project includes unit tests for the user service layer using JUnit 5 and Mockito.

### Running Tests

```bash
# Using Maven
mvn test
```

### Test Coverage

- **UserServiceTest**: User authentication and management

The test class covers:
- CRUD operations (Create, Read, Update, Delete)
- Authentication scenarios (valid/invalid credentials)
- Error handling and edge cases


**User Management System** - Built with Spring Boot, Java 22, and PostgreSQL
