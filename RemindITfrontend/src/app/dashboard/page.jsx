"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const userData = useSelector((state) => state.userstate); // <-- Redux user
  const [showForm, setShowForm] = useState(false);
  const [problems, setProblems] = useState([]);
  const [showReminderPicker, setShowReminderPicker] = useState(false);
  const [newProblem, setNewProblem] = useState({
    title: "",
    link: "",
    notes: "",
    reminderAt: null,
    repeat: "none",
  });
  const [editingProblem, setEditingProblem] = useState(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get("http://localhost:3010/api/notes/", {
          withCredentials:true
        });

        const data =res.data
        // Filter only problems for the logged-in user (just in case backend doesn't)
        const userProblems = data.filter(
          (problem) => problem.user === userData.user._id
        );
        setProblems(userProblems);
      } catch (err) {
        console.error("Failed to fetch problems:", err);
      }
    };

    if (userData?.user?._id) {
      fetchProblems();
    }
  }, [userData]);
  // console.log("userdata dekht pehle",userData)
  // console.log("-----------user id dekh ----",userData.user._id);

  const handleSave = async () => {
    if (!userData || !userData.user._id) {
      alert("User not logged in");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3010/api/notes/add", {
       
          title: newProblem.title,
          link: newProblem.link,
          notes: newProblem.notes,
          reminderAt: newProblem.reminderAt,
          phoneNumber: userData.phoneNumber,
          user: userData.user._id, 
          repeat: newProblem.repeat || "none",
      });
      // console.log("response------",response)
      if (response.statusText!="Created"      ) throw new Error("Failed to save problem1");

      const savedProblem = await response.data;
      setProblems((prev) => [...prev, savedProblem]);
      setNewProblem({ title: "", link: "", notes: "", reminderAt: null });
      setShowForm(false);
      setShowReminderPicker(false);
    } catch (err) {
      // console.error("Error saving problem:", err);
      alert("Failed to save problem2");
    }
  };

  const handleDiscard = () => {
    setNewProblem({ title: "", link: "", notes: "", reminderAt: null });
    setShowForm(false);
    setShowReminderPicker(false);
  };


 const handleEdit = (problem) => {
    setEditingProblem(problem);
    setNewProblem({
      title: problem.title,
      link: problem.link,
      notes: problem.notes,
      reminderAt: problem.reminderAt,
      repeat: newProblem.repeat || "none",
    });
    setShowForm(true);
  };

  const handleUpdate = async () => {
    if (!userData || !userData.user._id) {
      alert("User not logged in");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3010/api/notes/${editingProblem._id}`,
        {
          title: newProblem.title,
          link: newProblem.link,
          notes: newProblem.notes,
          reminderAt: newProblem.reminderAt,
          phoneNumber: userData.phoneNumber,
          user: userData.user._id,
          repeat: newProblem.repeat || "none",
        }
      );
      if (response.statusText !== "OK") throw new Error("Failed to update problem");

      const updatedProblem = await response.data;
      setProblems((prev) =>
        prev.map((p) => (p._id === updatedProblem._id ? updatedProblem : p))
      );
      setEditingProblem(null);
      setNewProblem({ title: "", link: "", notes: "", reminderAt: null });
      setShowForm(false);
      setShowReminderPicker(false);
    } catch (err) {
      // console.error("Error updating problem:", err);
      alert("Failed to update problem");
    }
  };
  const deleteProblem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3010/api/notes/${id}`, {
        withCredentials:true
      });
      // console.log("dekh response",res)
      if (res.status!=200) throw new Error("Delete failed");

      setProblems(problems.filter((p) => p._id !== id));
    } catch (err) {
      // console.error("Error deleting problem:", err);
      alert("Failed to delete problem");
    }
  };

  return (
    <div className="min-h-screen bg-[#000033]  p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          RemindIT Dashboard
        </h1>

        {!showForm && (
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 rounded-md bg-pink-600 text-white font-semibold shadow-md hover:bg-pink-700 transition"
            >
              Add a New Problem
            </button>
          </div>
        )}

        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow-lg mb-10 space-y-4">
            <input
              type="text"
              placeholder="Problem Title"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={newProblem.title}
              onChange={(e) =>
                setNewProblem({ ...newProblem, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="LeetCode / Other Link"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={newProblem.link}
              onChange={(e) =>
                setNewProblem({ ...newProblem, link: e.target.value })
              }
            />
            <textarea
              placeholder="Important Notes"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              rows="3"
              value={newProblem.notes}
              onChange={(e) =>
                setNewProblem({ ...newProblem, notes: e.target.value })
              }
            />
              {/* New select dropdown for repeat interval */}
  <div className="flex justify-between items-center">
    <label htmlFor="repeat" className="text-sm font-medium text-gray-700">
      Repeat Interval:
    </label>
    <select
      id="repeat"
      className="p-2 border rounded-md"
      value={newProblem.repeat || "none"}
      onChange={(e) =>
        setNewProblem({ ...newProblem, repeat: e.target.value })
      }
    >
      <option value="none">One-time</option>

      <option value="daily">Every Day</option>
      <option value="weekly">Every Week</option>
      <option value="monthly">Every Month</option>
    </select>
  </div>

<div className="flex justify-end items-center gap-4">
              {showReminderPicker && (
                <input
                  type="datetime-local"
                  className="p-2 border rounded-md"
                  value={newProblem.reminderAt || ""}
                  onChange={(e) =>
                    setNewProblem({
                      ...newProblem,
                      reminderAt: e.target.value,
                    })
                  }
                />
              )}

              <button
                onClick={() =>
                  setShowReminderPicker((prev) => !prev)
                }
                className="px-4 py-2 rounded-md bg-pink-600 text-white font-semibold shadow-md hover:bg-pink-700 transition"
              >
                {showReminderPicker ? "Cancel Reminder" : "Set Reminder"}
              </button>
            </div>

            <div className="flex justify-center gap-4 pt-4">
                {editingProblem ? (
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 rounded-md bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-md bg-pink-600 text-white font-semibold shadow-md hover:bg-pink-700 transition"
                >
                  Save
                </button>
              )}
              <button
                onClick={handleDiscard}
                className="px-4 py-2 rounded-md bg-gray-300 text-black font-semibold shadow-md hover:bg-gray-400 transition"
              >
                Discard
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-full">
        <div className="flex flex-wrap gap-6 justify-start">
          {problems.map((problem) => (
            <div
              key={problem._id}
              className="bg-white p-6 w-80 rounded-lg shadow-md hover:shadow-xl transition-all duration-200"
            >
              <div className="mb-3 space-y-1">
                <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
                  {problem.title}
                </h2>
                <a
                  href={problem.link}
                  className="text-pink-600 hover:underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {problem.link}
                </a>
              </div>

              <div className="bg-white border border-gray-200 rounded-md p-4 mb-4">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {problem.notes}
                </p>
              </div>
              {problem.reminderAt && (
                <p className="text-xs text-pink-600 font-semibold mt-2">
                  Reminder set for:{" "}
                  {new Date(problem.reminderAt).toLocaleString()}
                </p>
              )}

              <div className="flex justify-between gap-3 pt-2 border-t border-gray-100 pt-4">
                <button
                  onClick={() => handleEdit(problem)}
                  className="px-4 py-2 bg-pink-600 text-white rounded-md shadow hover:bg-pink-700 transition text-sm"
                >
                  Edit Note
                </button>
               
                <button
                  onClick={() => deleteProblem(problem._id)}
                  className="px-4 py-2 bg-pink-600 text-white rounded-md shadow hover:bg-pink-700 transition text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {problems.length === 0 && (
            <p className="text-center text-gray-500 italic">
              No problems added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
