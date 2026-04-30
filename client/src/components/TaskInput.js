import React from "react";

function TaskInput({ taskText, setTaskText }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Tasks (CPU Requirements)</h3>
      <input
        style={styles.input}
        type="text"
        placeholder="Example: 2, 3, 6, 1"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <p style={styles.helper}>Use comma separated positive numbers.</p>
    </div>
  );
}

const styles = {
  card: {
    background: "rgba(20, 23, 36, 0.9)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "16px",
    padding: "16px",
    marginBottom: "16px",
  },
  title: {
    color: "#fff",
    marginTop: 0,
    marginBottom: "12px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #3f4a6b",
    background: "#0f1321",
    color: "#fff",
    outline: "none",
  },
  helper: {
    color: "#98a2c3",
    marginBottom: 0,
    fontSize: "13px",
  },
};

export default TaskInput;
