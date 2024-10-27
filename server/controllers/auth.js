import User from "../db/models/User.js";
// bcrypt for password hashing
import bcrypt from "bcryptjs";

import { generateJwtToken } from "../utils/generate-jwt-token.js";

// Controller function to handle user registration
export const registerUser = async (req, res) => {
	// Extract fields from the request body
	const {
		firstName,
		lastName,
		email,
		password,
		role,
		username,
	} = req.body;

	try {
		// Check if a user with the provided email already exists in the database
		const userExists = await User.findOne({ email });

		// If a user with the same email is found, return a 400 Bad Request response with an error message
		if (userExists) {
			return res
				.status(400)
				.json({ message: "User already exists" });
		}

		// Generate a salt for password hashing
		// Ensures hashed password are unique even if two users have same password
		const salt = bcrypt.genSaltSync(10);
		// Hashing the password using the generated salt
		const hashedPassword = bcrypt.hashSync(password, salt);

		// Create a new user in the database with the provided data
		const newUser = await User.create({
			username,
			firstName,
			lastName,
			email,
			// Store hashed password instead of plain password
			password: hashedPassword,
			// Default role to 'customer' if not provided
			role: role || "customer",
		});

		// Return success response with user details
		res.status(201).json({
			_id: newUser._id, // Return the user's unique ID
			username: newUser.username, // Return the registered username
			firstName: newUser.firstName, // Return the registered first name
			lastName: newUser.lastName, // Return the registered last name
			email: newUser.email, // Return the registered email
			role: newUser.role, // Return the user's role (either 'customer' or 'admin')
		});
	} catch (error) {
		// If an error occurs, return a 500 Internal Server Error response with the error message
		// Log the error for debugging
		console.error("Error registering user:", error);
		// Return generic server error message
		res.status(500).json({ message: "Server error" });
	}
};

// Define the loginUser function to handle login requests
export const loginUser = async (req, res) => {
	try {
		// Destructure the email and password from the request body
		const { username, password } = req.body;

		// Check if a user with this username exists in the database
		const user = await User.findOne({ username });

		// If no user is found, return a 400 status with an error message
		if (!user) {
			res.status(400).json({
				message: "Incorrect Credentials.",
			});
			return; // Exit if the user is not found
		}

		// Compare the provided password with the stored hashed password
		const isPasswordMatch = await bcrypt.compare(
			password,
			user.password
		);

		// If the password is incorrect, return a 400 status with an error message
		if (!isPasswordMatch) {
			res.status(400).json({
				message: "Incorrect credentials - password.",
			});
			return; // Exit if the password is incorrect
		}

		// Cookie in res object to store the cookie in the browser without encrypting it with a token
		// res.cookie(
		// 	process.env.AUTH_COOKIE_NAME, // Name of the cookie
		// 	// Value of cookie, which is the user object converted to JSON
		// 	JSON.stringify(user.toObject())
		// );

		// if login is okay create a token and include user id in the token payload
		// pass the res object to create a cookie containing the jwt
		generateJwtToken(res, { _id: user._id });

		// if login is okay send a message to say login is successful,
		res.json({
			message: "Login successful",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Controller to handle user deletion
// export const deleteUser = async (req, res) => {
// 	try {
// 		// Get the user ID from the request parameters
// 		const { id } = req.params;

// 		// Find the user by ID and delete them
// 		const user = await User.findByIdAndDelete(id);

// 		// Check if the user was found and deleted
// 		if (user) {
// 			return res
// 				.status(200)
// 				.json({ message: "User deleted successfully" }); // Successful deletion message
// 		} else {
// 			return res
// 				.status(404)
// 				.json({ message: "User not found" }); // User not found
// 		}
// 	} catch (error) {
// 		// Log the error for debugging
// 		console.error("Error deleting user:", error);
// 		// Return generic server error message
// 		res.status(500).json({ message: "Server error" });
// 	}
// };
