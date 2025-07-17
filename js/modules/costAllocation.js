// Cost Allocation Process Module
export class CostAllocation {
  constructor() {
    this.tabDistribution = document.getElementById("tab-distribution");
    this.tabAssessment = document.getElementById("tab-assessment");
    this.contentDistribution = document.getElementById("content-distribution");
    this.contentAssessment = document.getElementById("content-assessment");
    this.runAllocationBtn = document.getElementById("run-allocation-btn");
    this.resetAllocationBtn = document.getElementById("reset-allocation-btn");
    this.ctx = document.getElementById("costAllocationChart")?.getContext("2d");

    this.currentAllocationMode = "distribution";
    this.costChart = null;

    // Initial state: One person pays for all
    this.initialData = {
      sender: 12000000,
      receiver1: 0,
      receiver2: 0,
      receiver3: 0,
      receiver4: 0,
    };

    // Target state for Distribution (uneven costs)
    this.allocationTargetDistribution = {
      sender: 0,
      receiver1: 2950000, // Hữu An
      receiver2: 3250000, // Phú Khang
      receiver3: 3150000, // Hiểu Phi
      receiver4: 2650000, // Hải Nam
    };

    // Target state for Assessment (even split)
    this.allocationTargetAssessment = {
      sender: 0,
      receiver1: 3000000,
      receiver2: 3000000,
      receiver3: 3000000,
      receiver4: 3000000,
    };
  }

  init() {
    if (!this.ctx) return;

    this.setupTabs();
    this.setupButtons();
    this.resetChart();
  }

  setupTabs() {
    if (this.tabDistribution) {
      this.tabDistribution.addEventListener("click", () =>
        this.switchTab("distribution")
      );
    }

    if (this.tabAssessment) {
      this.tabAssessment.addEventListener("click", () =>
        this.switchTab("assessment")
      );
    }
  }

  setupButtons() {
    if (this.runAllocationBtn) {
      this.runAllocationBtn.addEventListener("click", () =>
        this.runAllocation()
      );
    }

    if (this.resetAllocationBtn) {
      this.resetAllocationBtn.addEventListener("click", () =>
        this.resetChart()
      );
    }
  }

  switchTab(mode) {
    this.currentAllocationMode = mode;

    if (mode === "distribution") {
      this.tabDistribution?.classList.add("active");
      this.tabAssessment?.classList.remove("active");
      this.contentDistribution?.classList.remove("hidden");
      this.contentAssessment?.classList.add("hidden");
    } else {
      this.tabDistribution?.classList.remove("active");
      this.tabAssessment?.classList.add("active");
      this.contentDistribution?.classList.add("hidden");
      this.contentAssessment?.classList.remove("hidden");
    }

    this.resetChart();
  }

  createChart(data) {
    if (this.costChart) this.costChart.destroy();

    this.costChart = new Chart(this.ctx, {
      type: "bar",
      data: {
        labels: ["Quỹ chung", "Hữu An", "Phú Khang", "Hiểu Phi", "Hải Nam"],
        datasets: [
          {
            label: "Chi phí",
            data: [
              data.sender,
              data.receiver1,
              data.receiver2,
              data.receiver3,
              data.receiver4,
            ],
            backgroundColor: [
              "rgba(239, 68, 68, 0.6)", // Red
              "rgba(52, 211, 153, 0.6)", // Green
              "rgba(96, 165, 250, 0.6)", // Blue
              "rgba(251, 191, 36, 0.6)", // Amber
              "rgba(168, 85, 247, 0.6)", // Purple
            ],
            borderColor: [
              "#ef4444",
              "#34d399",
              "#60a5fa",
              "#fbb_f24",
              "#a855f7",
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 13000000,
            ticks: {
              callback: (value) => new Intl.NumberFormat("vi-VN").format(value),
            },
          },
        },
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "Tình trạng chi phí trước khi chia tiền",
            font: { size: 16 },
          },
          tooltip: {
            callbacks: {
              label: (context) =>
                `${context.dataset.label}: ${new Intl.NumberFormat(
                  "vi-VN"
                ).format(context.raw)} VND`,
            },
          },
        },
      },
    });
  }

  resetChart() {
    this.createChart(this.initialData);
    this.costChart.options.plugins.title.text =
      "Tình trạng chi phí trước khi chia tiền";
    this.costChart.update();
    if (this.runAllocationBtn) {
      this.runAllocationBtn.disabled = false;
    }
  }

  runAllocation() {
    if (this.runAllocationBtn) {
      this.runAllocationBtn.disabled = true;
    }

    const targetData =
      this.currentAllocationMode === "distribution"
        ? this.allocationTargetDistribution
        : this.allocationTargetAssessment;

    this.costChart.data.datasets[0].data = [
      targetData.sender,
      targetData.receiver1,
      targetData.receiver2,
      targetData.receiver3,
      targetData.receiver4,
    ];

    this.costChart.options.plugins.title.text = `Kết quả sau khi chia tiền kiểu ${
      this.currentAllocationMode === "distribution"
        ? "Distribution (chi tiết)"
        : "Assessment (chia đều)"
    }`;

    this.costChart.update();
  }
}
