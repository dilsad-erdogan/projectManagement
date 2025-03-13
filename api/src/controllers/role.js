const Role = require("../models/role");

async function setRole (req, res) {
    try{
        const { name } = req.body;

        const role = new Role({
            name: name,
            date_time: Date.now(),
            is_active: true
        });

        const savedRole = await role.save();
        if(savedRole) {
            res.status(201).json({ success: true, data: savedRole });
        } else {
            res.status(400).json({ success: false, message: 'Role error!' });
        }
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function getRole (req, res) {
    try{
        const role = await Role.find({ is_active: true });

        if(role) {
            res.status(200).json({ success: true, data: role })
        } else {
            res.status(404).json({ success: false, message: 'Role not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

async function getRoleById (req, res) {
    try{
        const id = req.params.id;
        const role = await Role.findById(id);

        if(role && role.is_active === true){
            res.status(200).json({ success: true, data: role });
        } else {
            res.status(404).json({ success: false, error: 'Role not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

module.exports = { setRole, getRole, getRoleById }