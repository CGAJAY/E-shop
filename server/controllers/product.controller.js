// Import the Product model from the models directory
import Product from "../models/product.model";

// Function to add a new product to the database
export const addProduct = async (req, res) => {
	try {
		// Get the product details from the request body
		const { name, price, category, stock } = req.body;

		// Check if all required fields are provided
		// If any field is missing, respond with a 400 Bad Request error
		// If at least one of the operands evaluates to a truthy value, the expression returns that truthy value.
		if (
			!name ||
			!price ||
			!category ||
			stock === undefined // stock can be 0 which is a falsy value
		) {
			return res.status(400).json({
				message:
					"Please provide all required fields: name, price, category, and stock.",
			});
		}

		// Create a new instance of the Product model
		// This uses the product details provided in the request
		const newProduct = new Product({
			name, // Product name
			price, // Product price
			category, // Reference to the category of the product
			stock, // Amount of stock available for the product
		});

		// Save the new product instance to the database
		await newProduct.save();

		// If successful, respond with a 201 Created status and the new product data else  it throws an error
		res.status(201).json(newProduct);
	} catch (error) {
		// If there is an error, log it to the console for debugging
		console.error("Error adding product:", error);

		// Respond with a 500 Internal Server Error if something goes wrong
		res.status(500).json({ message: "Server error" });
	}
};

// Function to delete a product
export const deleteProduct = async (req, res) => {
	try {
		// Find the product by its ID from the request parameters
		const { id } = req.params;

		// Attempt to delete the product from the database
		// If the product is found, it will be deleted from database & returns the document of the deleted product else null
		const deletedProduct = await Product.findByIdAndDelete(
			id
		);

		// If no product was found, respond with a 404 (Not Found) status
		if (!deletedProduct) {
			return res
				.status(404)
				.json({ message: "Product not found" });
		}

		// Respond with a success message upon successful deletion
		res
			.status(200)
			.json({ message: "Product deleted successfully" });
	} catch (error) {
		// Catch any errors and respond with a 500 (Server Error) status
		console.error("Error deleting product:", error);
		res.status(500).json({ message: "Server error" });
	}
};
