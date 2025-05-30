import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Generate random 10-digit account number
const generateAccountNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString(); 

};

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Please enter a valid email'] },
    password: { type: String, required: true, minLenght: [6, 'Password must not be less than 6 characters'] },
    accountNumber: { type: String, unique: true },
    currency: { type: String, default: 'EUR' },
    balance: { type: Number, default: 0 },
    isSuspended: { type: Boolean, default: false },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
}, { timestamps: true });

// Hash password before save
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Auto-generate account number
userSchema.pre('save', async function (next) {
    if (!this.accountNumber) {
        let unique = false;
        while (!unique) {
            const accNum = generateAccountNumber();
            const existing = await mongoose.models.User.findOne({ accountNumber: accNum });
            if (!existing) {
                this.accountNumber = accNum;
                unique = true;
            }
        }
    }
    next();
});

// Compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
