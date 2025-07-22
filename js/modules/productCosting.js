// Product Costing Steps Module
export class ProductCosting {
  constructor() {
    this.stepsContainer = document.getElementById(
      "product-costing-steps-container"
    );
    this.stepTitle = document.getElementById("step-title");
    this.stepDesc = document.getElementById("step-desc");
    this.stepExtra = document.getElementById("step-extra-info");
    this.stepData = this.getStepData();
    this.stepItems = null;
  }

  init() {
    if (!this.stepsContainer) return;

    this.renderSteps();
    this.setupStepInteractions();
    this.setupKeyboardNavigation();
    this.updateStepDetails(1);
  }

  getStepData() {
    return [
      {
        id: 1,
        title: "Cost Estimate",
        desc: "Ước tính giá thành Kế hoạch",
        tcode: "CK11N/CK40N",
        detail:
          "Trước khi sản xuất, hệ thống tính toán chi phí kế hoạch (Standard Cost) cho sản phẩm dựa trên BOM (Bill of Materials) và Routing. Kết quả này là thước đo để so sánh với chi phí thực tế sau này.",
        impact:
          "Chưa có bút toán FI/CO. Kết quả được lưu dưới dạng một Cost Estimate, sau khi release sẽ cập nhật vào Standard Price của vật tư.",
      },
      {
        id: 2,
        title: "Order Creation",
        desc: "Tạo Lệnh Sản xuất",
        tcode: "CO01",
        detail:
          "Một Production Order được tạo ra để yêu cầu sản xuất một số lượng sản phẩm cụ thể. Lệnh này sao chép thông tin từ BOM và Routing, trở thành đối tượng chính để tập hợp chi phí thực tế.",
        impact:
          "Chưa có bút toán FI/CO. Lệnh sản xuất ở trạng thái CRTD (Created).",
      },
      {
        id: 3,
        title: "Goods Issue",
        desc: "Xuất kho NVL cho Lệnh",
        tcode: "MIGO/MB1A",
        detail:
          "Kho xuất nguyên vật liệu (NVL) cần thiết cho lệnh sản xuất. Đây là chi phí thực tế đầu tiên được ghi nhận vào lệnh, dựa trên số lượng thực tế và giá NVL.",
        impact:
          "Ghi Nợ tài khoản chi phí NVL (gắn với Lệnh SX), ghi Có tài khoản tồn kho NVL. Chi phí được cập nhật vào Lệnh sản xuất.",
      },
      {
        id: 4,
        title: "Confirmation",
        desc: "Xác nhận Hoạt động",
        tcode: "CO11N",
        detail:
          "Công nhân xác nhận số giờ lao động, số giờ máy đã sử dụng. Hệ thống phân bổ chi phí hoạt động vào lệnh sản xuất dựa trên số lượng thực tế và Activity Rate đã tính ở bước kế hoạch.",
        impact:
          "Ghi Nợ chi phí vào Lệnh SX, ghi Có cho Cost Center cung cấp hoạt động (ví dụ: Cost Center của phân xưởng sản xuất).",
      },
      {
        id: 5,
        title: "Overhead",
        desc: "Phân bổ Chi phí chung",
        tcode: "KGI2/CO43",
        detail:
          "Cuối kỳ, các chi phí gián tiếp (chi phí quản lý phân xưởng,...) được phân bổ vào lệnh sản xuất thông qua một công thức trong Costing Sheet.",
        impact:
          "Ghi Nợ chi phí vào Lệnh SX, ghi Có cho một đối tượng bù trừ (ví dụ: Internal Order hoặc Cost Center).",
      },
      {
        id: 6,
        title: "Goods Receipt",
        desc: "Nhập kho Thành phẩm",
        tcode: "MIGO/MB31",
        detail:
          "Thành phẩm hoàn thành được nhập kho. Lệnh sản xuất được ghi Có (Credit) một khoản đúng bằng giá trị thành phẩm nhập kho (tính theo giá Standard Cost đã tính ở bước 1).",
        impact:
          "Ghi Nợ tài khoản tồn kho thành phẩm, ghi Có cho Lệnh sản xuất.",
      },
      {
        id: 7,
        title: "WIP Calc.",
        desc: "Tính Dở dang (WIP)",
        tcode: "KKAX/KKAO",
        detail:
          "Đối với các lệnh chưa hoàn thành vào cuối kỳ, hệ thống tính toán giá trị sản phẩm dở dang (Work In Progress - WIP). WIP = Tổng Nợ (chi phí đã vào) - Tổng Có (thành phẩm đã nhập).",
        impact:
          "Ghi Nợ tài khoản WIP trên bảng cân đối kế toán, ghi Có tài khoản bù trừ WIP trên P&L.",
      },
      {
        id: 8,
        title: "Variance Calc.",
        desc: "Tính Chênh lệch (Variance)",
        tcode: "KKS2/KKS1",
        detail:
          "Đối với các lệnh đã hoàn thành, hệ thống so sánh tổng chi phí thực tế đã ghi nhận vào lệnh với chi phí kế hoạch (Standard Cost) của lượng thành phẩm đã sản xuất để tính ra chênh lệch (Variance).",
        impact:
          "Chưa có bút toán. Kết quả chênh lệch được lưu trên lệnh sản xuất để chuẩn bị cho bước quyết toán.",
      },
      {
        id: 9,
        title: "Settlement",
        desc: "Quyết toán Lệnh",
        tcode: "KO88/CO88",
        detail:
          "Đây là bước cuối cùng. Toàn bộ chênh lệch (Variance) hoặc giá trị WIP được quyết toán (settle) từ Lệnh sản xuất đến các đối tượng nhận cuối cùng (ví dụ: FI, CO-PA).",
        impact:
          "Ghi Nợ/Có cho Lệnh SX để số dư về 0. Ghi Nợ/Có cho các đối tượng nhận (tài khoản chênh lệch giá, tài khoản giá vốn,...).",
      },
    ];
  }

  renderSteps() {
    let htmlSteps = "";
    this.stepData.forEach((step, index) => {
      htmlSteps += `<div class="step-item flex-shrink-0 flex items-center p-3 mx-1 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors" data-step="${step.id}">
        <span class="step-number font-bold text-sm bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center mr-3 flex-shrink-0">${step.id}</span>
        <span class="font-semibold text-xs md:text-sm">${step.desc}</span>
      </div>`;

      if (index < this.stepData.length - 1) {
        htmlSteps += '<div class="step-connector flex-shrink-0"></div>';
      }
    });

    this.stepsContainer.innerHTML = htmlSteps;
    this.stepItems = document.querySelectorAll(".step-item");
  }

  setupStepInteractions() {
    this.stepItems.forEach((item) => {
      item.addEventListener("click", () => {
        this.updateStepDetails(parseInt(item.dataset.step));
      });
    });
  }

  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      const activeStep = document.querySelector(".step-item.active");
      if (!activeStep) return;

      const currentStepId = parseInt(activeStep.dataset.step);
      let newStepId = currentStepId;

      if (e.key === "ArrowLeft" && currentStepId > 1) {
        newStepId = currentStepId - 1;
      } else if (
        e.key === "ArrowRight" &&
        currentStepId < this.stepData.length
      ) {
        newStepId = currentStepId + 1;
      }

      if (newStepId !== currentStepId) {
        e.preventDefault();
        this.updateStepDetails(newStepId);
      }
    });
  }

  updateStepDetails(stepId) {
    const currentStep = this.stepData.find((s) => s.id === parseInt(stepId));
    if (!currentStep) return;

    // Update active state
    this.stepItems.forEach((item) => item.classList.remove("active"));
    const activeStepElement = document.querySelector(
      `.step-item[data-step="${stepId}"]`
    );
    activeStepElement?.classList.add("active");

    // Scroll to active step
    this.scrollToActiveStep(activeStepElement);

    // Update content
    this.stepTitle.textContent = `Bước ${currentStep.id}: ${currentStep.desc} (${currentStep.title})`;
    this.stepDesc.textContent = currentStep.detail;
    this.stepExtra.innerHTML = `<span class="font-semibold text-gray-700">T-Code:</span> <span class="font-mono bg-gray-200 px-2 py-1 rounded text-blue-700">${currentStep.tcode}</span><p class="mt-2"><span class="font-semibold text-gray-700">Tác động:</span> ${currentStep.impact}</p>`;
  }

  scrollToActiveStep(stepElement) {
    if (!stepElement) return;

    const container = stepElement.closest(".steps-scroll-container");
    const containerRect = container.getBoundingClientRect();
    const stepRect = stepElement.getBoundingClientRect();

    if (
      stepRect.left < containerRect.left ||
      stepRect.right > containerRect.right
    ) {
      stepElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }
}
