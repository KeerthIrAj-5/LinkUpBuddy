import Queries from "../models/Queries.js";
import Student from "../models/Student.js";
import Company from "../models/Company.js"; // Import Company model

/* CREATE */
export const getCompanyQueries = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findById(id).populate('queries');
        if (!company)
            return res.status(404).json({ message: "Company not found" });
        
        // const queryTexts = company.queries.map(query => query.queryText);
        // res.status(200).json(queryTexts);
        const queriesWithAnswers = company.queries.map(query => ({
            queryText: query.queryText,
            answers: query.answers
        }));
        res.status(200).json(queriesWithAnswers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* READ */
// export const getFeedQueries = async (req, res) => {
//     try {
//         const queries = await Queries.find();
//         res.status(200).json(queries);
//     } catch (err) {
//         res.status(404).json({ message: err.message });
//     }
// };

