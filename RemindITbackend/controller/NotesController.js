const  Problem =require( "../models/Notesmodel");
const Usermodel= require("../models/Usermodel")
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
const { DateTime } = require("luxon");
const createProblem = async (req, res) => {
  try {
    const { title, link, notes, reminderAt, phoneNumber,repeat = "none",  user } = req.body;
      // console.log("server pe ----user id------",user)
    
      if (!user) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const userfound = await Usermodel.findById(user);
      if (!userfound) {
        return res.status(404).json({ message: "User not found" });
      }
      // console.log("userfound",userfound)
   

    const newProblem = new Problem({
      title,
      link,
      notes,
      reminderAt,
      phoneNumber,
      user,
    });
    // console.log("new problem",newProblem)
    const savedProblem = await newProblem.save();

    if (reminderAt && new Date(reminderAt) > new Date()) {

      let rule;
      
       const localTime = DateTime.fromISO(reminderAt, { zone: 'Asia/Kolkata' });

      const reminderDateUTC = localTime.toUTC().toJSDate();

      switch (repeat.toLowerCase()) {
        case "daily":
          rule = new schedule.RecurrenceRule();
          rule.tz = 'Asia/Kolkata';
          rule.hour = localTime.hour;
          rule.minute = localTime.minute;
          rule.second = 0;
          break;

        case "weekly":
          rule = new schedule.RecurrenceRule();
          rule.tz = 'Asia/Kolkata';
          rule.dayOfWeek = localTime.weekday % 7; 
          rule.hour = localTime.hour;
          rule.minute = localTime.minute;

          rule.second = 0;
          break;

        case "monthly":
          rule = new schedule.RecurrenceRule();
          rule.tz = 'Asia/Kolkata';
          rule.date = localTime.day;
          rule.hour = localTime.hour;
          rule.minute = localTime.minute;
          rule.second = 0;
          break;


        default:
          rule = reminderDateUTC; 
      }

      
      if (repeat === "none") {
        // If no repeat, just set the one-time reminder at reminderAt time
        schedule.scheduleJob(new Date(reminderAt), async () => {
          try {
            const msg = await client.messages.create({
              from: process.env.TWILIOPHNO,
              to: userfound.phoneNumber,
              body: `🔔 Reminder: Your task "${title}" is due!`,
            });
            
          } catch (err) {
            // console.error("Failed to send reminder SMS:", err);
          }
        });

      } else {
        // For repeat, schedule recurring job
        schedule.scheduleJob(rule, async () => {
          try {
            const msg = await client.messages.create({
              from: process.env.TWILIOPHNO,
              to:  userfound.phoneNumber,
              body: `🔔 Reminder: Your task "${title}" is due!`,
            });
            // console.log("Recurring SMS sent successfully:", msg.sid);
          } catch (err) {
            // console.error("Failed to send reminder SMS:", err);
          }
        });
      }
      // console.log("rem done for", new Date(reminderAt));
    }

    // console.log("saved problem yha pe",savedProblem)
    res.status(201).json(savedProblem);
  } catch (error) {
    res.status(500).json({ message: "Error creating problem", error });
  }
};



const getAllProblems = async (req, res) => {
  try {
    // console.log(req.user)
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user info" });
    }

    const userId = req.user.id;
    // console.log("UserID (getAllProblems):", userId);

    const problems = await Problem.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(problems);
  } catch (error) {
    // console.error("Error in getAllProblems:", error);
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

    // console.log("deleted", problem); 
    res.status(200).json({ message: "Problem deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting problem", error });
  }
};

module.exports ={createProblem,deleteProblem,updateProblem,getAllProblems}
