const Agreement = require("../models/agreement");

async function setAgreement (req, res) {
    try{
        const { job_id, developer_id, price, contract } = req.body;

        const agreement = new Agreement({
            job_id: job_id,
            developer_id: developer_id,
            price: price,
            contract: contract,
            date_time: Date.now(),
            is_active: true
        });

        const savedAgreement = await agreement.save();
        if(savedAgreement) {
            res.status(201).json({ success: true, data: savedAgreement });
        } else {
            res.status(400).json({ success: false, message: 'Agreement error!' });
        }
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function getAgreement (req, res) {
    try{
        const agreement = await Agreement.find({ is_active: true });

        if(agreement) {
            res.status(200).json({ success: true, data: agreement })
        } else {
            res.status(404).json({ success: false, message: 'Agreement not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

async function getAgreementById (req, res) {
    try{
        const id = req.params.id;
        const agreement = await Agreement.findById(id);

        if(agreement && agreement.is_active === true){
            res.status(200).json({ success: true, data: agreement });
        } else {
            res.status(404).json({ success: false, error: 'Agreement not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

async function deleteAgreement (req, res) {
    try{
        const id = req.params.id;
        const agreement = await Agreement.findById(id);

        if(!agreement) {
            res.status(404).json({ success: false, message: 'Agreement not found!' });
        } else {
            await agreement.updateOne({ is_active: false });
            res.status(200).json({ success: true, message: 'Agreement deleted successfully.' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

module.exports = { setAgreement, getAgreement, getAgreementById, deleteAgreement }