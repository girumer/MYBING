const depositCheck = async (req, res) => {
    try {
        
        const userWallet = req.user.Wallet; 
        const usercoin=req.user.coin; 
        // Access the user object attached by middleware
        const walletBalance = parseInt(userWallet); // Convert wallet to integer
        const usercoinb=parseInt(usercoin);
        
        console.log("User balance:", walletBalance);
        console.log("coin balance:",usercoinb);
        return res.json({ balance: walletBalance,coin:usercoinb });
    } catch (error) {
        console.error("Error in depositCheck:", error);
        return res.status(500).json({ message: "Error checking deposit" });
    }
};

module.exports = { depositCheck };
