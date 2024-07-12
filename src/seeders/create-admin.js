import bcrypt from 'bcrypt';
import { models } from '../models/index.js'; // Adjust the path according to your project structure

const saltRounds = 10;
const adminPassword = 'admin'; // Replace with a secure password

const createAdmin = async () => {
    try {
        const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);
        await models.UserModel.create({
            username: 'admin',
            password: hashedPassword,
            role: 'admin'
        });
        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};

createAdmin();
