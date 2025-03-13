const Period = require("../models/period");

async function setPeriod (req, res) {
    try{
        const { job_id, developer_id, price, contract, revised, revised_state, approval_state } = req.body;

        const period = new Period({
            job_id: job_id,
            developer_id: developer_id,
            price: price,
            contract: contract,
            revised: revised,
            revised_state: revised_state,
            approval_state: approval_state,
            date_time: Date.now(),
            is_active: true
        });

        const savedPeriod = await period.save();
        if(savedPeriod) {
            res.status(201).json({ success: true, data: savedPeriod });
        } else {
            res.status(400).json({ success: false, message: 'Period error!' });
        }
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function getPeriod (req, res) {
    try{
        const period = await Period.find({ is_active: true });

        if(period) {
            res.status(200).json({ success: true, data: period })
        } else {
            res.status(404).json({ success: false, message: 'Period not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

async function getPeriodById (req, res) {
    try{
        const id = req.params.id;
        const period = await Period.findById(id);

        if(period && period.is_active === true){
            res.status(200).json({ success: true, data: period });
        } else {
            res.status(404).json({ success: false, error: 'Period not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

async function deletePeriod (req, res) {
    try{
        const id = req.params.id;
        const period = await Period.findById(id);

        if(!period) {
            res.status(404).json({ success: false, message: 'Period not found!' });
        } else {
            await period.updateOne({ is_active: false });
            res.status(200).json({ success: true, message: 'Period deleted successfully.' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

async function updateContract (req, res) {
    try{
        const id = req.params.id;
        const { contract } = req.body;

        const period = await Period.findById(id);
        if(!period) {
            return res.status(404).json({ success: false, message: 'Period not found!' });
        }

        period.contract = contract;
        period.save();

        res.status(200).json({ success: true, message: 'Period updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function updateRevised (req, res) {
    try{
        const id = req.params.id;
        const { revised } = req.body;

        const period = await Period.findById(id);
        if(!period) {
            return res.status(404).json({ success: false, message: 'Period not found!' });
        }

        period.revised = revised;
        period.save();

        res.status(200).json({ success: true, message: 'Period updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function updateRevisedState (req, res) {
    try{
        const id = req.params.id;
        const { revised_state } = req.body;

        const period = await Period.findById(id);
        if(!period) {
            return res.status(404).json({ success: false, message: 'Period not found!' });
        }

        period.revised_state = revised_state;
        period.save();

        res.status(200).json({ success: true, message: 'Period updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function updateApprovalState (req, res) {
    try{
        const id = req.params.id;
        const { approval_state } = req.body;

        const period = await Period.findById(id);
        if(!period) {
            return res.status(404).json({ success: false, message: 'Period not found!' });
        }

        period.approval_state = approval_state;
        period.save();

        res.status(200).json({ success: true, message: 'Period updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
};

module.exports = { setPeriod, getPeriod, getPeriodById, deletePeriod, updateContract, updateRevised, updateRevisedState, updateApprovalState }