import React from "react";

function InstanceForm({ instances, setInstances }) {
  const updateInstance = (index, field, value) => {
    const next = instances.map((item, i) =>
      i === index ? { ...item, [field]: field === "name" ? value : value === "" ? "" : Number(value) } : item
    );
    setInstances(next);
  };

  const addInstance = () => {
    setInstances([...instances, { name: "", cpu: "", cost: "" }]);
  };

  const removeInstance = (index) => {
    if (instances.length === 1) return;
    setInstances(instances.filter((_, i) => i !== index));
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Instances</h3>
      <div style={styles.headerRow}>
        <span style={styles.headerLabel}>name</span>
        <span style={styles.headerLabel}>cpu</span>
        <span style={styles.headerLabel}>cost</span>
        <span style={styles.headerLabel}>action</span>
      </div>
      {instances.map((instance, index) => (
        <div key={`instance-${index}`} style={styles.row}>
          <input
            style={styles.input}
            type="text"
            placeholder="Name"
            value={instance.name}
            onChange={(e) => updateInstance(index, "name", e.target.value)}
          />
          <input
            style={styles.input}
            type="number"
            min="1"
            placeholder="CPU"
            value={instance.cpu}
            onChange={(e) => updateInstance(index, "cpu", e.target.value)}
          />
          <input
            style={styles.input}
            type="number"
            min="1"
            placeholder="Cost"
            value={instance.cost}
            onChange={(e) => updateInstance(index, "cost", e.target.value)}
          />
          <button type="button" style={styles.removeButton} onClick={() => removeInstance(index)}>
            Remove
          </button>
        </div>
      ))}

      <button type="button" style={styles.addButton} onClick={addInstance}>
        + Add Instance
      </button>
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
  row: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr 1fr auto",
    gap: "8px",
    marginBottom: "10px",
  },
  headerRow: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr 1fr auto",
    gap: "8px",
    marginBottom: "8px",
  },
  headerLabel: {
    color: "#9aa5c5",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontWeight: 600,
  },
  input: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #3f4a6b",
    background: "#0f1321",
    color: "#fff",
    outline: "none",
  },
  removeButton: {
    border: "none",
    borderRadius: "10px",
    padding: "10px 12px",
    background: "#d9534f",
    color: "#fff",
    cursor: "pointer",
  },
  addButton: {
    border: "none",
    borderRadius: "10px",
    padding: "10px 12px",
    background: "#2d6cff",
    color: "#fff",
    cursor: "pointer",
  },
};

export default InstanceForm;
