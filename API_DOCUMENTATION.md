# API Documentation

This document provides comprehensive API documentation for the Scalable Web App backend.

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Response Format

### Success Response
```json
{
  "message": "Success message",
  "data": { ... }
}
```

### Error Response
```json
{
  "message": "Error message",
  "errors": [
    {
      "field": "fieldName",
      "message": "Field-specific error message"
    }
  ]
}
```

## Authentication Endpoints

### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### POST /auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isActive": true,
    "lastLogin": "2024-01-15T10:30:00.000Z"
  }
}
```

### GET /auth/me
Get current user information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isActive": true,
    "lastLogin": "2024-01-15T10:30:00.000Z"
  }
}
```

### POST /auth/logout
Logout user (client-side token removal).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Logout successful"
}
```

## Task Endpoints

### GET /tasks
Get user's tasks with optional filtering and pagination.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10, max: 100)
- `status` (string, optional): Filter by status (`pending`, `in-progress`, `completed`, `cancelled`)
- `priority` (string, optional): Filter by priority (`low`, `medium`, `high`, `urgent`)
- `search` (string, optional): Search in title and description

**Example Request:**
```
GET /tasks?page=1&limit=10&status=pending&priority=high&search=project
```

**Response:**
```json
{
  "tasks": [
    {
      "_id": "64a1b2c3d4e5f6789abcdef1",
      "title": "Complete project",
      "description": "Finish the web application",
      "status": "pending",
      "priority": "high",
      "dueDate": "2024-01-20T00:00:00.000Z",
      "tags": ["work", "urgent"],
      "user": "64a1b2c3d4e5f6789abcdef0",
      "isArchived": false,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "current": 1,
    "pages": 5,
    "total": 47,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### GET /tasks/:id
Get a specific task by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "task": {
    "_id": "64a1b2c3d4e5f6789abcdef1",
    "title": "Complete project",
    "description": "Finish the web application",
    "status": "pending",
    "priority": "high",
    "dueDate": "2024-01-20T00:00:00.000Z",
    "tags": ["work", "urgent"],
    "user": "64a1b2c3d4e5f6789abcdef0",
    "isArchived": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### POST /tasks
Create a new task.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Complete project",
  "description": "Finish the web application",
  "status": "pending",
  "priority": "high",
  "dueDate": "2024-01-20T00:00:00.000Z",
  "tags": ["work", "urgent"]
}
```

**Response:**
```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "64a1b2c3d4e5f6789abcdef1",
    "title": "Complete project",
    "description": "Finish the web application",
    "status": "pending",
    "priority": "high",
    "dueDate": "2024-01-20T00:00:00.000Z",
    "tags": ["work", "urgent"],
    "user": "64a1b2c3d4e5f6789abcdef0",
    "isArchived": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### PUT /tasks/:id
Update an existing task.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Updated task title",
  "status": "in-progress",
  "priority": "medium"
}
```

**Response:**
```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "64a1b2c3d4e5f6789abcdef1",
    "title": "Updated task title",
    "description": "Finish the web application",
    "status": "in-progress",
    "priority": "medium",
    "dueDate": "2024-01-20T00:00:00.000Z",
    "tags": ["work", "urgent"],
    "user": "64a1b2c3d4e5f6789abcdef0",
    "isArchived": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:45:00.000Z"
  }
}
```

### DELETE /tasks/:id
Delete a task (soft delete by archiving).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

### GET /tasks/stats/summary
Get task statistics for dashboard.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "stats": {
    "total": 25,
    "pending": 8,
    "inProgress": 5,
    "completed": 12,
    "highPriority": 3,
    "urgentPriority": 1
  }
}
```

## User Endpoints

### GET /users/profile
Get user profile information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "avatar": "https://example.com/avatar.jpg",
    "isActive": true,
    "lastLogin": "2024-01-15T10:30:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### PUT /users/profile
Update user profile information.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "username": "johnsmith",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

**Response:**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "username": "johnsmith",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Smith",
    "avatar": "https://example.com/new-avatar.jpg",
    "isActive": true,
    "lastLogin": "2024-01-15T10:30:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-15T11:45:00.000Z"
  }
}
```

### PUT /users/change-password
Change user password.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "message": "Password changed successfully"
}
```

### DELETE /users/account
Deactivate user account.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "password": "currentpassword123"
}
```

**Response:**
```json
{
  "message": "Account deactivated successfully"
}
```

## Health Check

### GET /health
Check API health status.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development"
}
```

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Validation errors |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

## Rate Limiting

- **Limit**: 100 requests per 15 minutes per IP
- **Headers**: Rate limit information included in response headers
- **Exceeded**: Returns 429 status code

## Validation Rules

### User Registration
- `username`: 3-30 characters, alphanumeric and underscores only
- `email`: Valid email format
- `password`: Minimum 6 characters
- `firstName`: 1-50 characters, required
- `lastName`: 1-50 characters, required

### Task Creation/Update
- `title`: 1-200 characters, required
- `description`: Maximum 1000 characters, optional
- `status`: One of: `pending`, `in-progress`, `completed`, `cancelled`
- `priority`: One of: `low`, `medium`, `high`, `urgent`
- `dueDate`: Valid ISO 8601 date format, optional
- `tags`: Array of strings, maximum 50 characters per tag

## Postman Collection

A Postman collection is available for testing all endpoints. Import the collection and set the following variables:

- `baseUrl`: `http://localhost:5000/api`
- `token`: Your JWT token (set after login)

## Examples

### Complete Authentication Flow

1. **Register User**
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "username": "johndoe",
       "email": "john@example.com",
       "password": "password123",
       "firstName": "John",
       "lastName": "Doe"
     }'
   ```

2. **Login**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "john@example.com",
       "password": "password123"
     }'
   ```

3. **Create Task**
   ```bash
   curl -X POST http://localhost:5000/api/tasks \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <your-token>" \
     -d '{
       "title": "Complete project",
       "description": "Finish the web application",
       "priority": "high",
       "tags": ["work", "urgent"]
     }'
   ```

4. **Get Tasks**
   ```bash
   curl -X GET http://localhost:5000/api/tasks \
     -H "Authorization: Bearer <your-token>"
   ```
