const User = require("../models/user");

async function login (req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid email or password.' });
        } else {
            if(password === user.password){
                res.status(201).json({ success: true, message: "Login is successfully!", user: user });
            }
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error.' });
    }
};

async function register (req, res) {
    const { role_id, name, surname, email, phone, password } = req.body;

    if (!role_id || !name || !surname || !email || !phone || !password) {
        return res.status(400).json({ success: false, error: 'All fields are required!' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ success: false, error: 'This email is already taken. Try again please!' });
    }

    await User.create({ role_id, name, surname, email, phone, adjective: "", features: [], password, is_active: true });
    res.status(200).json({ success: true, message: 'Account created successfully!'});
};

async function getUser (req, res) {
    try{
        const users = await User.find({ is_active: true });

        if(users) {
            res.status(200).json({ success: true, data: users })
        } else {
            res.status(404).json({ success: false, message: 'User not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

async function getUserById (req, res) {
    try{
        const id = req.params.id;
        const user = await User.findById(id);

        if(user && user.is_active === true){
            res.status(200).json({ success: true, data: user });
        } else {
            res.status(404).json({ success: false, error: 'User not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

async function deleteUser (req, res) {
    try{
        const id = req.params.id;
        const user = await User.findById(id);

        if(!user) {
            res.status(404).json({ success: false, message: 'User not found!' });
        } else {
            await user.updateOne({ is_active: false });
            res.status(200).json({ success: true, message: 'User deleted successfully.' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

async function updateRole (req, res) {
    try{
        const id = req.params.id;
        const { role_id } = req.body;

        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({ success: false, message: 'User role not found!' });
        }

        user.role_id = role_id;
        user.save();

        res.status(200).json({ success: true, message: 'User role updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function updateName (req, res) {
    try{
        const id = req.params.id;
        const { name } = req.body;

        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({ success: false, message: 'User name not found!' });
        }

        user.name = name;
        user.save();

        res.status(200).json({ success: true, message: 'User name updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function updateSurname (req, res) {
    try{
        const id = req.params.id;
        const { surname } = req.body;

        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({ success: false, message: 'User surname not found!' });
        }

        user.surname = surname;
        user.save();

        res.status(200).json({ success: true, message: 'User surname updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function updateEmail (req, res) {
    try{
        const id = req.params.id;
        const { email } = req.body;

        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({ success: false, message: 'User email not found!' });
        }

        user.email = email;
        user.save();

        res.status(200).json({ success: true, message: 'User email updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function updatePhone (req, res) {
    try{
        const id = req.params.id;
        const { phone } = req.body;

        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({ success: false, message: 'User phone not found!' });
        }

        user.phone = phone;
        user.save();

        res.status(200).json({ success: true, message: 'User phone updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function updateAdjective (req, res) {
    try{
        const id = req.params.id;
        const { adjective } = req.body;

        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({ success: false, message: 'User adjective not found!' });
        }

        user.adjective = adjective;
        user.save();

        res.status(200).json({ success: true, message: 'User adjective updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function updateFeatures (req, res) {
    try{
        const id = req.params.id;
        const { features } = req.body;

        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({ success: false, message: 'User features not found!' });
        }

        user.features = features;
        user.save();

        res.status(200).json({ success: true, message: 'User features updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function updatePassword (req, res) {
    try{
        const id = req.params.id;
        const { password } = req.body;

        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({ success: false, message: 'User password not found!' });
        }

        user.password = password;
        user.save();

        res.status(200).json({ success: true, message: 'User password updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
};

module.exports = { login, register, getUser, getUserById, deleteUser, updateRole, updateName, updateSurname, updateEmail, updatePhone, updateAdjective, updateFeatures, updatePassword }