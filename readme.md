# Uber  Project

This project is a full-stack Uber clone application that includes various features such as captain routes, user routes, map routes, and ride routes. It also utilizes sockets for real-time communication.

## Features

- **Captain Routes**: Manage captain-related operations such as registration, login, and ride management.
- **User Routes**: Handle user-related operations including registration, login, and ride requests.
- **Map Routes**: Integrate map functionalities for displaying routes and locations.
- **Ride Routes**: Manage ride operations such as creating, cancelling, confirming, and completing rides.

## Real-Time Communication

The application uses sockets to enable real-time communication between users and captains. This ensures that updates such as ride status and location are instantly reflected.

## Fare Calculation

The fare for each ride is calculated dynamically based on the distance and time. This ensures accurate and fair pricing for every ride.

## Live Location

The application uses live location tracking to provide accurate and real-time updates of the captain's and user's locations. This is crucial for the proper functioning of the map and ride management features.

## Map Integration

Maps are integrated into the application to display routes, track locations, and provide navigation assistance. This enhances the user experience by providing visual guidance and real-time updates.

## Ride Management

Users and captains can perform various ride-related actions such as:
- **Creating Rides**: Users can request new rides.
- **Cancelling Rides**: Users and captains can cancel rides if needed.
- **Confirming Rides**: Captains can confirm ride requests.
- **Completing Rides**: Captains can mark rides as completed once the destination is reached.

## Technologies Used

- **Frontend**: React, Redux
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Real-Time Communication**: Socket.io
- **Maps**: Tom Tom Api

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Set up the environment variables.
4. Run the development server using `npm start`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
## Examples

Here are some examples of how to use the Uber Clone application:

### User Registration

To register a new user, send a POST request to `/api/users/register` with the following JSON payload:
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
}
```

### Captain Registration

To register a new captain, send a POST request to `/api/captains/register` with the following JSON payload:
```json
{
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "password": "password123",
    "vehicle": "Toyota Prius"
}
```

### Requesting a Ride

To request a new ride, send a POST request to `/api/rides/request` with the following JSON payload:
```json
{
    "userId": "user123",
    "pickupLocation": "123 Main St",
    "dropoffLocation": "456 Elm St"
}
```

### Cancelling a Ride

To cancel a ride, send a POST request to `/api/rides/cancel` with the following JSON payload:
```json
{
    "rideId": "ride123",
    "userId": "user123"
}
```

