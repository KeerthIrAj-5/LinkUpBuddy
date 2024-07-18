import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    picturePath: {
        type: String,
    },
    location: String,
 
    queries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Queries',
    }],
}, { timestamps: true });

const Company = mongoose.model("Company", CompanySchema);
export default Company;
