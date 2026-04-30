function runDynamicProgrammingOptimization(instances, tasks) {
  const n = tasks.length;
  const dp = new Array(n + 1).fill(Infinity);
  dp[0] = 0;

  // dp[i] = minimum total cost to complete first i tasks.
  // We allow grouping consecutive tasks on one instance when total CPU fits.
  for (let i = 1; i <= n; i += 1) {
    let cpuSum = 0;

    for (let j = i; j >= 1; j -= 1) {
      cpuSum += tasks[j - 1];

      for (const instance of instances) {
        if (instance.cpu >= cpuSum) {
          const candidateCost = dp[j - 1] + instance.cost;
          if (candidateCost < dp[i]) {
            dp[i] = candidateCost;
          }
        }
      }
    }
  }

  return dp[n];
}

module.exports = {
  runDynamicProgrammingOptimization,
};
