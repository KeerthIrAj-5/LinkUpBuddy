// Import required models
import Student from "../models/Student.js";
import Company from "../models/Company.js";
import Queries from "../models/Queries.js";
/* READ */
export const getStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        res.status(200).json(student);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findById(id);
        res.status(200).json(company);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getStudentQueries = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id).populate('queries');
        res.status(200).json(student.queries);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getStudentBookmarks = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id).populate('bookmarks');
        res.status(200).json(student.bookmarks);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */
export const addRemoveBookmarks = async (req, res) => {
  try {
    const { id, companyId } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    // Check if the company ID is already in bookmarks
    const index = student.bookmarks.indexOf(companyId);
    if (index !== -1) {
      // Remove the company ID from bookmarks
      student.bookmarks.splice(index, 1);
      await student.save();
      res.status(200).json({ message: "Bookmark removed successfully." });
    } else {
      // Add the company ID to bookmarks
      student.bookmarks.push(companyId);
      await student.save();
      res.status(200).json({ message: "Bookmark added successfully." });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const removeStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }
        
        // Remove student
        await Student.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: "Student removed successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



export const removeStudentQueries = async (req, res) => {
  try {
      const { id, queryId } = req.params;
      const student = await Student.findById(id);
      if (!student) {
          return res.status(404).json({ message: "Student not found." });
      }

      if (student.queries.includes(queryId)) {
          student.queries = student.queries.filter((id) => id !== queryId);
          await student.save();
          res.status(200).json({ message: "Query removed successfully." });
      } else {
          res.status(404).json({ message: "Query not found." });
      }
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};
export const addStudentQueries = async (req, res) => {
    try {
        const { studId, companyId } = req.params;
        const { queryText } = req.body;
        const student = await Student.findById(studId);
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found." });
        }
        const newQuery = new Queries({
            companyId : companyId,
            studentId : studId,
            queryText : queryText,
          });
          const savedQuery = await newQuery.save();
          const queryId =savedQuery._id 
        
        company.queries.push(queryId);
        await student.save(); 
        student.queries.push(queryId);
        await student.save();
        res.status(201).json(savedQuery);
    } catch (err) {
        res.status(500).json({ error: err.message });
      }
  };
  export const getFeedCompanies = async (req, res) => {
    try {
        const { id } = req.params;
        const companies = await Company.find();
        const companyNames = companies.map(companies => companies.companyName);
        const companyIds = companies.map(companies => companies._id);

        res.status(200).json({companyNames,companyIds});
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
