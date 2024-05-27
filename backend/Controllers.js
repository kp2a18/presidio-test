const Property = require('./property');

exports.addProperty = async (req, res) => {
    const {
        title,
        address,
        area,
        bedrooms,
        bathrooms,
        price,
        description,
        nearbyHospitals,
        nearbyColleges,
        contact
    } = req.body;

    try {
        const property = new Property({
            title,
            address,
            area,
            bedrooms,
            bathrooms,
            price,
            description,
            nearbyHospitals,
            nearbyColleges,
            contact,
            seller: req.user._id // Assign the logged-in seller's ID
        });

        await property.save();
        res.status(201).json(property);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getPropertiesBySeller = async (req, res) => {
    try {
        const properties = await Property.find({ seller: req.user._id });
        res.json(properties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateProperty = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        address,
        area,
        bedrooms,
        bathrooms,
        price,
        description,
        nearbyHospitals,
        nearbyColleges,
        contact
    } = req.body;

    try {
        const property = await Property.findByIdAndUpdate(id, {
            title,
            address,
            area,
            bedrooms,
            bathrooms,
            price,
            description,
            nearbyHospitals,
            nearbyColleges,
            contact
        }, { new: true });

        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        res.json(property);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteProperty = async (req, res) => {
    const { id } = req.params;

    try {
        const property = await Property.findByIdAndDelete(id);

        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
