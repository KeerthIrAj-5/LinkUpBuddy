// Import required models
import Student from "../models/Student.js";
import Company from "../models/Company.js";
import Admin from "../models/Admin.js";
import Alumni from "../models/Alumni.js";
import Answers from "../models/Answers.js";
import Queries from "../models/Queries.js";

/* READ */
//Working fine
export const getAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findById(id);
        res.status(200).json(admin);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
//Working fine
export const getAlumni = async (req, res) => {
    try {
        const { alumId } = req.params;
        const alumni = await Alumni.findById(alumId);
        res.status(200).json(alumni);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
// Working fine
export const getStudent = async (req, res) => {
    try {
        const { studId } = req.params;
        const student = await Student.findById(studId);
        res.status(200).json(student);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
// Working fine
export const getStudentQueries = async (req, res) => {
    try {
        const { studId } = req.params;
        const student = await Student.findById(studId);
        const studentqueries = student.populate('queries');
        res.status(200).json(student.studentqueries);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
//Working fine
export const getAlumniAnswers = async (req, res) => {
    try {
        const { alumId } = req.params;
        const alumni = await Alumni.findById(alumId).populate('answers');
        res.status(200).json(alumni.answers);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
//Working fine
/* UPDATE */
export const removeStudent = async (req, res) => {
    try {
        const {id,studId} = req.params
        const admin = await Admin.findById(id);
        if(!admin){
            return res.status(404).json({ message: "Unauthorized access"})
        }
        const student = await Student.findById(studId);
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }
        
        // Remove student
        await Student.deleteOne({ _id: studId });
    
        return res.status(200).json({ message: "Student removed successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Working fine
export const removeAlumni = async (req, res) => {
    try {
        const {id,alumId} = req.params
        const admin = await Admin.findById(id);
        if(!admin){
            return res.status(404).json({ message: "Unauthorized access"})
        } 
        const alumni = await Alumni.findById(alumId);
        if (!alumni) {
            return res.status(404).json({ message: "Alumni not found." });
        }
        
        // Remove student
        await Alumni.deleteOne({_id: alumId});
        return res.status(200).json({ message: "Alumni removed successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//Working fine
export const addCompany = async (req, res) => {
    try {
        // const { id } = req.params;
        
      const { companyName,location } = req.body;   //picturePath pending

      const  newCompany = new Company( { 
        companyName : companyName, 
        // picturePath : picturePath,
        location : location,
     }); 
     const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }    
  };
  //Working fine
export const removeCompany = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id)
        if(!admin)
        res.status(500).json({ message : "Unauthorized access"});
        const company = await Company.findById(req.params.companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found." });
        }
        
        // Remove student
        await Company.deleteOne({ _id: req.params.companyId });
        return res.status(200).json({ message: "Company removed successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//Working fine
export const removeAnswers = async (req, res) => {
    try {
        const { id, answerId } = req.params;
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ message: "Unauthorized access." });
        }

        // Find the answer by ID
        const answer = await Answers.findById(answerId);
        if (!answer) {
            return res.status(404).json({ message: "Answer not found." });
        }
        const alumniId = answer.alumniId
        // Find alumni by ID
        const alumni = await Alumni.findById(alumniId);
        if (!alumni) {
            return res.status(404).json({ message: "Alumni not found." });
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
        
        // Remove student

        return res.status(200).json({ message: "Answer removed successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//Working fine
export const removeQueries = async (req, res) => {

    try {
        const { id, queryId } = req.params;
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ message: "Unauthorized access." });
        }

        // Find the answer by ID
        const query = await Queries.findById(queryId);
        if (!query) {
            return res.status(404).json({ message: "Query not found." });
        }
        const studentId = query.studentId
        // Find alumni by ID
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }
        const companyId = query.companyId
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found." });
        } 
        // Remove answer from Alumni document
        const index = company.queries.indexOf(queryId);
        if (index !== -1) {
            company.queries.splice(index, 1);
        }
        const index2 = student.queries.indexOf(queryId);
        if (index2 !== -1) {
            student.queries.splice(index2, 1);
        }

        // Remove answer from Answers collection
        await Queries.deleteOne({ _id: queryId });

        // Save changes
        await student.save();
        await company.save();
        
        // Remove student

        return res.status(200).json({ message: "Query removed successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllQueries = async (req, res) => {
    try {
        const queries = await Queries.find();
        res.status(200).json(queries);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getAllAnswers = async (req, res) => {
    try {
        const answers = await Answers.find();
        res.status(200).json(answers);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};