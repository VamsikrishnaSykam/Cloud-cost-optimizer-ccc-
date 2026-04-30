import React from "react";

function Results({ results }) {
  if (!results) {
    return (
      <div style={styles.card}>
        <h3 style={styles.title}>Results</h3>
        <p style={styles.placeholder}>Run optimization to see allocation and costs.</p>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Results</h3>
      <div style={styles.block}>
        <strong style={styles.label}>Greedy Allocation</strong>
        {results.greedyAllocation.map((item, index) => (
          <p key={`alloc-${index}`} style={styles.line}>
            Task {index + 1} (CPU {item.taskCpu}) → {item.instance} (CPU {item.instanceCpu}, Cost {item.instanceCost})
          </p>
        ))}
      </div>
      <div style={styles.block}>
        <p style={styles.line}>
          <strong style={styles.label}>Greedy Cost:</strong> {results.greedyCost}
        </p>
        <p style={styles.line}>
          <strong style={styles.label}>DP Cost:</strong> {results.dpCost}
        </p>
        <p style={styles.message}>{results.message}</p>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "rgba(20, 23, 36, 0.9)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "16px",
    padding: "16px",
    minHeight: "220px",
  },
  title: {
    color: "#fff",
    marginTop: 0,
  },
  placeholder: {
    color: "#9aa5c5",
  },
  block: {
    marginBottom: "14px",
  },
  label: {
    color: "#fff",
  },
  line: {
    color: "#c7d2ff",
    margin: "7px 0",
  },
  message: {
    color: "#66e6a8",
    fontWeight: 600,
    marginBottom: 0,
  },
};

export default Results;
