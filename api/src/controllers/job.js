const Job = require("../models/job");

async function setJob (req, res) {
    try{
        const { customer_id, title, short_description, long_description, min_price, max_price, duration, difficulty_state } = req.body;

        const job = new Job({
            customer_id: customer_id,
            title: title,
            short_description: short_description,
            long_description: long_description,
            min_price: min_price,
            max_price: max_price,
            duration: duration,
            difficulty_state: difficulty_state,
            date_time: Date.now(),
            is_active: true
        });

        const savedJob = await job.save();
        if(savedJob) {
            res.status(201).json({ success: true, data: savedJob });
        } else {
            res.status(400).json({ success: false, message: 'Job error!' });
        }
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function getJob (req, res) {
    try{
        const job = await Job.find({ is_active: true });

        if(job) {
            res.status(200).json({ success: true, data: job })
        } else {
            res.status(404).json({ success: false, message: 'Job not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

async function getJobById (req, res) {
    try{
        const id = req.params.id;
        const job = await Job.findById(id);

        if(job && job.is_active === true){
            res.status(200).json({ success: true, data: job });
        } else {
            res.status(404).json({ success: false, error: 'Job not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

async function deleteJob (req, res) {
    try{
        const id = req.params.id;
        const job = await Job.findById(id);

        if(!job) {
            res.status(404).json({ success: false, message: 'Job not found!' });
        } else {
            await job.updateOne({ is_active: false });
            res.status(200).json({ success: true, message: 'Job deleted successfully.' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

async function updateStartingState (req, res) {
    try{
        const id = req.params.id;
        const { starting_state } = req.body;

        const job = await Job.findById(id);
        if(!job) {
            return res.status(404).json({ success: false, message: 'Job not found!' });
        }

        job.starting_state = starting_state;
        job.save();

        res.status(200).json({ success: true, message: 'Job updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function updateCompletionState (req, res) {
    try{
        const id = req.params.id;
        const { completion_state } = req.body;

        const job = await Job.findById(id);
        if(!job) {
            return res.status(404).json({ success: false, message: 'Job not found!' });
        }

        job.completion_state = completion_state;
        job.save();

        res.status(200).json({ success: true, message: 'Job updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
};

module.exports = { setJob, getJob, getJobById, deleteJob, updateStartingState, updateCompletionState }