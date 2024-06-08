import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Alumni from "../models/Alumni.js";
import Student from "../models/Student.js";
import Admin from "../models/Admin.js";
import Company from "../models/Company.js"
//Working fine
/* REGISTER ALUMNI */
export const registerAlumni = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      companyName,
      picturePath,
      location,
      occupation,
      passoutYear,
    } = req.body;

    const company = await Company.findOne({ companyName });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newAlumni = new Alumni({
      firstName,
      lastName,
      email,
      password: passwordHash,
      companyName,
      picturePath,
      location,
      occupation,
      passoutYear,
    });
    const savedAlumni = await newAlumni.save();
    res.status(201).json(savedAlumni);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//Working fine

/* REGISTER STUDENT*/
export const registerStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      location, 
      passoutYear,
    } = req.body;

    const salt2 = await bcrypt.genSalt();
    const passwordHash2 = await bcrypt.hash(password, salt2);
    const newStudent = new Student({
      firstName,
      lastName,
      email,
      password: passwordHash2,
     // picturePath,
      location,
      passoutYear,
      
    });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
//Working fine
/*ADMIN LOGIN */
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });
    if (!admin) return res.status(400).json({ msg: "Admin does not exist. " });
       console.log(admin.password)

    if (!password===admin.password) return res.status(400).json({ msg: "Invalid credentials. " });
  

    const token3 = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    delete admin.password;
    res.status(200).json({ token3, admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//Working fine
export const loginAlumni = async (req, res) => {
  try {
    const { email, password } = req.body;
    const alumni = await Alumni.findOne({ email: email });
    if (!alumni) return res.status(400).json({ msg: "Alumni does not exist. " });

    const isMatch = await bcrypt.compare(password, alumni.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: alumni._id }, process.env.JWT_SECRET);
    delete alumni.password;
    res.status(200).json({ token, alumni });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//Working fine
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email: email });
    if (!student) return res.status(400).json({ msg: "Student does not exist. " });

    const isMatch2 = await bcrypt.compare(password, student.password);
    if (!isMatch2) return res.status(400).json({ msg: "Invalid credentials. " });

    const token2 = jwt.sign({ id: student._id }, process.env.JWT_SECRET);
    delete student.password;
    res.status(200).json({ token2, student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};