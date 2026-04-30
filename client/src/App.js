import React, { useMemo, useState } from "react";
import InstanceForm from "./components/InstanceForm";
import TaskInput from "./components/TaskInput";
import Results from "./components/Results";
import ComparisonChart from "./components/ComparisonChart";
import { optimizeCosts } from "./services/api";
import "./App.css";

function App() {
  const [instances, setInstances] = useState([{ name: "", cpu: "", cost: "" }]);
  const [taskText, setTaskText] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const parsedTasks = useMemo(
    () =>
      taskText
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
    [taskText]
  );

  const validate = () => {
    const hasInvalidInstance = instances.some(
      (instance) =>
        !instance.name.trim() ||
        Number(instance.cpu) <= 0 ||
        Number(instance.cost) <= 0 ||
        Number.isNaN(Number(instance.cpu)) ||
        Number.isNaN(Number(instance.cost))
    );

    if (hasInvalidInstance) {
      return "Please provide valid instance name, CPU, and cost.";
    }

    if (parsedTasks.length === 0) {
      return "Please enter at least one task CPU requirement.";
    }

    const hasInvalidTask = parsedTasks.some((task) => Number(task) <= 0 || Number.isNaN(Number(task)));
    if (hasInvalidTask) {
      return "Tasks must be positive numbers only.";
    }

    return "";
  };

  const handleOptimize = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setResults(null);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const payload = {
        instances: instances.map((instance) => ({
          name: instance.name.trim(),
          cpu: Number(instance.cpu),
          cost: Number(instance.cost),
        })),
        tasks: parsedTasks.map(Number),
      };

      const { data } = await optimizeCosts(payload);
      setResults(data);
    } catch (requestError) {
      const message =
        requestError.response?.data?.message || "Failed to optimize. Check server connection.";
      setError(message);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const loadSampleData = () => {
    setInstances([
      { name: "t2.small", cpu: 2, cost: 4 },
      { name: "t2.medium", cpu: 4, cost: 7 },
      { name: "t2.large", cpu: 8, cost: 10 },
    ]);
    setTaskText("2, 1, 3, 2, 2");
    setResults(null);
    setError("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <h1 style={styles.heading}>Cloud Cost Optimizer (Greedy vs DP)</h1>
        <div style={styles.mainGrid} className="main-grid">
          <div className="panel-hover">
            <InstanceForm instances={instances} setInstances={setInstances} />
            <TaskInput taskText={taskText} setTaskText={setTaskText} />
            <div style={styles.buttonRow}>
              <button
                type="button"
                style={styles.primaryButton}
                className="action-btn primary-btn"
                onClick={handleOptimize}
                disabled={loading}
              >
                {loading ? "Optimizing..." : "Optimize Costs"}
              </button>
              <button
                type="button"
                style={styles.secondaryButton}
                className="action-btn secondary-btn"
                onClick={loadSampleData}
                disabled={loading}
              >
                Load Sample Data
              </button>
            </div>
            {loading && <p style={styles.spinner}>Running algorithms...</p>}
            {error && <p style={styles.error}>{error}</p>}
          </div>

          <div className="panel-hover">
            <Results results={results} />
          </div>
        </div>

        <ComparisonChart results={results} />
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0b1020 0%, #1b2653 50%, #0d1632 100%)",
    fontFamily: "Segoe UI, sans-serif",
    color: "#fff",
    padding: "24px",
    boxSizing: "border-box",
  },
  overlay: {
    maxWidth: "1150px",
    margin: "0 auto",
  },
  heading: {
    marginTop: 0,
    marginBottom: "20px",
    letterSpacing: "0.4px",
  },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  buttonRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  primaryButton: {
    border: "none",
    borderRadius: "12px",
    padding: "11px 16px",
    background: "#2d6cff",
    color: "#fff",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  secondaryButton: {
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: "12px",
    padding: "11px 16px",
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  spinner: {
    color: "#8eb4ff",
    marginBottom: "8px",
  },
  error: {
    color: "#ff8585",
    marginBottom: 0,
  },
};

export default App;
