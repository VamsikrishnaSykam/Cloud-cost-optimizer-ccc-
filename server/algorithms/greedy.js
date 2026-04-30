function runGreedyOptimization(instances, tasks) {
  // Sort by cost so we always try the cheapest valid instance first.
  const sortedInstances = [...instances].sort((a, b) => a.cost - b.cost);
  const allocation = [];
  let totalCost = 0;

  for (let i = 0; i < tasks.length; i += 1) {
    const taskCpu = tasks[i];
    const selected = sortedInstances.find((instance) => instance.cpu >= taskCpu);

    if (!selected) {
      return {
        allocation: [],
        totalCost: Infinity,
        failedTaskIndex: i,
      };
    }

    allocation.push({
      taskCpu,
      instance: selected.name,
      instanceCpu: selected.cpu,
      instanceCost: selected.cost,
    });
    totalCost += selected.cost;
  }

  return {
    allocation,
    totalCost,
    failedTaskIndex: -1,
  };
}

module.exports = {
  runGreedyOptimization,
};
