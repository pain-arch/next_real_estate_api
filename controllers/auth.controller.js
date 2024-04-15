import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Save user to database
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({ message: "User created successfully"});
    } catch (error) {
        res.status(500).json({ message: "Failed to create user" });
    }    
};



export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        
        // Check if the user exists
        const user = await prisma.user.findUnique({
            where:{username}
        })
        if (!user) res.status(401).json({ message: "Invalid credentials" });
        
        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) res.status(401).json({ message: "Invalid credentials" });

        //generate cookie token and send it to the user
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to login" });
    }
};

export const logout = (req, res) => {
    console.log("Logging out...");
};