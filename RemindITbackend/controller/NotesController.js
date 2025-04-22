const  Problem =require( "../models/Notesmodel");

const jwt=require("jsonwebtoken")

const util= require("util");
const promisify=util.promisify;
const promisedjwtsign=promisify(jwt.sign)
const promisedjwtverify=promisify(jwt.verify)

const schedule = require("node-schedule");
const dotenv = require("dotenv");
dotenv.config();
const twilio = require("twilio");

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);
// CREATE a new problem
const createProblem = async (req, res) => {
  try {
    const { title, link, notes, reminderAt, phoneNumber, user } = req.body;
      console.log("server pe ----user id------",user)
    if (!user) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const newProblem = new Problem({
      title,
      link,
      notes,
      reminderAt,
      phoneNumber,
      user,
    });
    console.log("new problem",newProblem)
    const savedProblem = await newProblem.save();

    if (reminderAt && new Date(reminderAt) > new Date()) {
      schedule.scheduleJob(new Date(reminderAt), async () => {
        try {
          const msg = await client.messages.create({
            from: process.env.TWILIOPHNO,
            to: "+919310501448",
            body: `🔔 Reminder: Your task "${title}" is due!`,
          });
          console.log("SMS sent successfully:", msg.sid);
        } catch (err) {
          console.error("Failed to send reminder SMS:", err);
        }
      });

      console.log("Reminder scheduled for", new Date(reminderAt));
    }
    












    console.log("saved problem yha pe",savedProblem)
    res.status(201).json(savedProblem);
  } catch (error) {
    res.status(500).json({ message: "Error creating problem", error });
  }
};





// GET all problems
const getAllProblems = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userid dekh get all me",userId)
    const problems = await Problem.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching problems", error });
  }
};

const updateProblem = async (req, res) => {
  try {
    const updated = await Problem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// DELETE a problem
 const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const problem=await Problem.findByIdAndDelete(id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    console.log("deleted", problem); 
    res.status(200).json({ message: "Problem deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting problem", error });
  }
};

module.exports ={createProblem,deleteProblem,updateProblem,getAllProblems}