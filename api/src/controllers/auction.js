const Auction = require("../models/auction");

async function setAuction (req, res) {
    try{
        const { job_id, developer_id, price, approval_state } = req.body;

        const auction = new Auction({
            name: name,
            description: description,
            image: image,
            date_time: Date.now(),
            is_active: true
        });

        const savedAuction = await auction.save();
        if(savedAuction) {
            res.status(201).json({ success: true, data: savedAuction });
        } else {
            res.status(400).json({ success: false, message: 'Auction error!' });
        }
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function getAuction (req, res) {
    try{
        const auction = await Auction.find({ is_active: true });

        if(auction) {
            res.status(200).json({ success: true, data: auction })
        } else {
            res.status(404).json({ success: false, message: 'Auction not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

async function getAuctionById (req, res) {
    try{
        const id = req.params.id;
        const auction = await Auction.findById(id);

        if(auction && auction.is_active === true){
            res.status(200).json({ success: true, data: auction });
        } else {
            res.status(404).json({ success: false, error: 'Auction not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

async function deleteAuction (req, res) {
    try{
        const id = req.params.id;
        const auction = await Auction.findById(id);

        if(!auction) {
            res.status(404).json({ success: false, message: 'Auction not found!' });
        } else {
            await auction.updateOne({ is_active: false });
            res.status(200).json({ success: true, message: 'Auction deleted successfully.' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

async function updateApproval (req, res) {
    try{
        const id = req.params.id;
        const { approval_state } = req.body;

        const auction = await Auction.findById(id);
        if(!auction) {
            return res.status(404).json({ success: false, message: 'Auction not found!' });
        }

        auction.approval_state = approval_state;
        auction.save();

        res.status(200).json({ success: true, message: 'Auction updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
};

module.exports = { setAuction, getAuction, getAuctionById, deleteAuction, updateApproval }