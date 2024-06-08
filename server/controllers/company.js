import Queries from "../models/Queries.js";
import Student from "../models/Student.js";
import Company from "../models/Company.js"; // Import Company model

/* CREATE */
// export const getCompanyQueries = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const company = await Company.findById(id).populate('queries');
//         if (!company)
//             return res.status(404).json({ message: "Company not found" });
        
//         // const queryTexts = company.queries.map(query => query.queryText);
//         // res.status(200).json(queryTexts);
//         const queriesWithAnswers = company.queries.map(query => ({
//             queryText: query.queryText,
//             answers: query.answers.answerText
//         }));
//         res.status(200).json(queriesWithAnswers);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };
export const getCompanyQueries = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findById(id).populate({
            path: 'queries',
            populate: {
                path: 'answers',
                select: 'answerText' // Only select the answerText field
            }
        });
        
        if (!company)
            return res.status(404).json({ message: "Company not found" });

        if (!company.queries || company.queries.length === 0)
            return res.status(404).json({ message: "No queries found for this company" });

        const queriesWithAnswers = company.queries.map(query => ({
            queryText: query.queryText,
            answers: query.answers.map(answer => answer.answerText)
        }));

        res.status(200).json(queriesWithAnswers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
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

