const { runGreedyOptimization } = require("../algorithms/greedy");
const { runDynamicProgrammingOptimization } = require("../algorithms/dp");

function isValidInstance(instance) {
  return (
    instance &&
    typeof instance.name === "string" &&
    instance.name.trim().length > 0 &&
    typeof instance.cpu === "number" &&
    instance.cpu > 0 &&
    typeof instance.cost === "number" &&
    instance.cost > 0
  );
}

function optimizeCosts(req, res) {
  try {
    const { instances, tasks } = req.body;

    if (!Array.isArray(instances) || instances.length === 0) {
      return res.status(400).json({ message: "Instances must be a non-empty array." });
    }

    if (!Array.isArray(tasks) || tasks.length === 0) {
      return res.status(400).json({ message: "Tasks must be a non-empty array." });
    }

    const normalizedInstances = instances.map((instance) => ({
      name: String(instance.name || "").trim(),
      cpu: Number(instance.cpu),
      cost: Number(instance.cost),
    }));

    const normalizedTasks = tasks.map((task) => Number(task));

    const invalidInstance = normalizedInstances.some((instance) => !isValidInstance(instance));
    if (invalidInstance) {
      return res.status(400).json({
        message: "Each instance must include valid name, cpu (>0), and cost (>0).",
      });
    }

    const invalidTask = normalizedTasks.some((taskCpu) => Number.isNaN(taskCpu) || taskCpu <= 0);
    if (invalidTask) {
      return res.status(400).json({ message: "Tasks must contain positive CPU numbers only." });
    }

    const greedyResult = runGreedyOptimization(normalizedInstances, normalizedTasks);
    const dpCost = runDynamicProgrammingOptimization(normalizedInstances, normalizedTasks);

    if (!Number.isFinite(greedyResult.totalCost) || !Number.isFinite(dpCost)) {
      return res.status(400).json({
        message: "One or more tasks cannot be handled by available instances.",
      });
    }

    const message =
      dpCost < greedyResult.totalCost ? "DP found better solution" : "Greedy is optimal";

    return res.json({
      greedyAllocation: greedyResult.allocation,
      greedyCost: greedyResult.totalCost,
      dpCost,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while optimizing costs.",
      error: error.message,
    });
  }
}

module.exports = {
  optimizeCosts,
};
