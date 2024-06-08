// Import required models
import Company from "../models/Company.js";
import Alumni from "../models/Alumni.js";
import Answers from "../models/Answers.js";
import Queries from "../models/Queries.js";
/* READ */
//Working fine
export const getAlumni = async (req, res) => {
    try {
        const { id } = req.params;
        const alumni = await Alumni.findById(id);
        res.status(200).json(alumni);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
//Working fine
export const getCompany = async (req, res) => {
    try {
        const { id,companyId } = req.params;
        const alumni = await Alumni.findById(id);
        const company = await Company.findById(companyId);
        if(!alumni) {
            return res.status(404).json({ message: "Alumni not found." });
        }
        res.status(200).json(company);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
//Working fine
export const getAlumniAnswers = async (req, res) => {
    try {
        const { id } = req.params;
        const alumni = await Alumni.findById(id).populate('answers');
        res.status(200).json(alumni.answers);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
//Working fine
/* UPDATE */
export const removeAlumni = async (req, res) => {
    try {
        const { id } = req.params;
        const alumni = await Alumni.findById(id);
        if (!alumni) {
            return res.status(404).json({ message: "Alumni not found." });
        }
        
        // Remove student
        await Alumni.deleteOne({ _id: id });
        return res.status(200).json({ message: "Alumni removed successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//Working fine
export const removeAlumniAnswers = async (req, res) => {
    try {
        const { id, answerId } = req.params;
        
        // Find alumni by ID
        const alumni = await Alumni.findById(id);
        if (!alumni) {
            return res.status(404).json({ message: "Alumni not found." });
        }

        // Find the answer by ID
        const answer = await Answers.findById(answerId);
        if (!answer) {
            return res.status(404).json({ message: "Answer not found." });
        }
        const queryId = answer.queryId
        const query = await Queries.findById(queryId);
        if (!answer) {
            return res.status(404).json({ message: "Answer not found." });
        } 
        // Remove answer from Alumni document
        const index = alumni.answers.indexOf(answerId);
        if (index !== -1) {
            alumni.answers.splice(index, 1);
        }
        const index2 = query.answers.indexOf(answerId);
        if (index2 !== -1) {
            query.answers.splice(index2, 1);
        }

        // Remove answer from Answers collection
        await Answers.deleteOne({ _id: answerId });

        // Save changes
        await alumni.save();
        await query.save();
        return res.status(200).json({ message: "Answer removed successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const getAlumniQueries = async (req, res) => {
    try {
      const { alumId } = req.params;
      const alumni = await Alumni.findById(alumId);
      if (!alumni) {
        return res.status(404).json({ message: "Alumni not found." });
      }
  
      const companyName = alumni.companyName;
      const company = await Company.findOne({ companyName: companyName });
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
  
      const companyId = company._id.toString();
      const queries = await Queries.find({ companyId: companyId }).populate({
        path:'studentId',
        select: 'firstName lastName',
        model: 'Student'
      });
      if (!queries || queries.length === 0) {
        return res.status(404).json({ message: "No queries found for this company" });
      }
  
      const queriesWithStudentName = queries.map(query => ({
        queryText: query.queryText,
        studentName: `${query.studentId.firstName} ${query.studentId.lastName}`,
        _id: query._id
      }));
  
      res.status(200).json(queriesWithStudentName);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  export const addAlumniAnswers = async (req, res) => {
    try {
      const { alumId } = req.params;
      const alumni = await Alumni.findById(alumId);
      if (!alumni) {
        return res.status(404).json({ message: "Alumni not found." });
      }
  
      const { queryId, answerText } = req.body;
      const query = await Queries.findById(queryId);
      if (!query) {
        return res.status(404).json({ message: "Query not found." });
      }
  
      const newAnswer = new Answers({
        queryId,
        alumniId: alumId,
        answerText
      });
      const savedAnswer = await newAnswer.save();
      const answerId = savedAnswer._id;
      query.answers.push(answerId);
      await query.save();
      alumni.answers.push(answerId);
      await alumni.save();
  
      res.status(201).json({
        message: "Answer added successfully",
        newAnswer: savedAnswer
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };