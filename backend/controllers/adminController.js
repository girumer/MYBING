
const bcrypt = require('bcryptjs');
const BingoBord = require('../Models/BingoBord'); // Replace with your actual User model

// Reset Customer Password
exports.resetCustomerPassword = async (req, res) => {
    const { customerId, newPassword } = req.body;
       const username=customerId;
       
    if (!customerId || !newPassword) {
        return res.status(400).json({ message: "Customer ID and new password are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password

        const customer = await User.findByIdAndUpdate(
            username,
            { password: hashedPassword },
            { new: true }
        );

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        return res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
