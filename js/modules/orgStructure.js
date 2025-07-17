// Organization Structure Interactive Diagram Module
export class OrgStructure {
  constructor() {
    this.orgNodes = document.querySelectorAll(".org-node-interactive");
    this.orgInfoCard = document.getElementById("org-info-card");
    this.orgInfoTitle = document.getElementById("org-info-title");
    this.orgInfoDesc = document.getElementById("org-info-desc");
    this.orgData = this.getOrgData();
  }

  init() {
    this.setupNodeInteractions();
  }

  getOrgData() {
    return {
      op: {
        title: "Operating Concern Toàn cầu (GL00)",
        desc: 'Đây là cấp cao nhất trong CO, dùng để phân tích lợi nhuận (CO-PA). Nó hợp nhất kết quả từ nhiều Controlling Area để trả lời câu hỏi chiến lược: "Sản phẩm nào, bán ở khu vực nào đang tạo ra nhiều lợi nhuận nhất cho toàn tập đoàn?"',
      },
      ca: {
        title: "Vùng Quản trị Bắc Mỹ (NA00)",
        desc: "Là một đơn vị tổ chức khép kín trong CO dùng để quản lý chi phí. Tất cả các đối tượng trong một Controlling Area phải sử dụng cùng một Chart of Accounts. Nó cho phép so sánh hiệu quả chi phí và hoạt động giữa các công ty con như US00 và CA00.",
      },
      ca2: {
        title: "Vùng Quản trị Châu Âu (EU00)",
        desc: "Tương tự NA00, nhưng dành cho thị trường Châu Âu. Hợp nhất dữ liệu chi phí từ các công ty ở Đức (DE00) và Pháp (FR00) để phân tích hiệu suất chung của khu vực này.",
      },
      cc1: {
        title: "Công ty Hoa Kỳ (US00)",
        desc: "Là pháp nhân kế toán độc lập trong FI, chịu trách nhiệm báo cáo tài chính theo luật pháp Hoa Kỳ. Mỗi Company Code được gán cho một Controlling Area. Nó chứa các đơn vị cấp dưới như Profit Center và Cost Center để quản lý chi tiết doanh thu và chi phí.",
      },
      cc3: {
        title: "Công ty Đức (DE00)",
        desc: "Pháp nhân kế toán tại Đức, tuân thủ luật thương mại và thuế của Đức. Dữ liệu từ DE00 được tổng hợp tại Vùng Quản trị EU00.",
      },
      pc1: {
        title: "Profit Center (PC_US_BIKES)",
        desc: 'Định nghĩa: Một "công ty con trong công ty", chịu trách nhiệm về cả doanh thu và chi phí, nhằm mục đích đánh giá lợi nhuận. \n\nMối quan hệ: Profit Center được gán cho Controlling Area và hoạt động trên nhiều Company Code, giúp ban lãnh đạo có cái nhìn tổng thể về hiệu quả của một ngành hàng (ví dụ: xe đạp) trên toàn khu vực.',
      },
      ccen1: {
        title: "Cost Center (CC_US_IT)",
        desc: "Định nghĩa: Là một địa điểm hoặc bộ phận chỉ chịu trách nhiệm về chi phí phát sinh, không trực tiếp tạo ra doanh thu (ví dụ: phòng IT, phòng Nhân sự). \n\nMối quan hệ: Cost Center được tạo trong Controlling Area và được gán cho một Company Code. Đây là nơi chi phí được thu thập và sau đó phân bổ cho các đối tượng khác (như Profit Center hoặc lệnh sản xuất).",
      },
    };
  }

  setupNodeInteractions() {
    this.orgNodes.forEach((node) => {
      node.addEventListener("click", (event) => {
        // Ngăn sự kiện click lan ra các phần tử cha
        event.stopPropagation();

        const id = node.dataset.id;
        this.highlightNode(node);
        this.updateInfoCard(id);
      });
    });

    // Reset khi click ra ngoài
    document.querySelector("body").addEventListener("click", () => {
      this.resetHighlights();
    });
  }

  highlightNode(activeNode) {
    this.orgNodes.forEach((n) => {
      n.classList.remove("active");
      n.classList.add("dimmed");
    });
    activeNode.classList.add("active");
    activeNode.classList.remove("dimmed");
  }

  resetHighlights() {
    this.orgNodes.forEach((n) => {
      n.classList.remove("active", "dimmed");
    });
    this.orgInfoTitle.textContent = "Hãy chọn một khối";
    this.orgInfoDesc.textContent =
      "Nhấp vào một khối trong sơ đồ để xem giải thích chi tiết và mối quan hệ của nó.";
  }

  updateInfoCard(id) {
    if (this.orgData[id]) {
      this.orgInfoTitle.textContent = this.orgData[id].title;
      // Sử dụng white-space: pre-wrap để giữ lại các ký tự xuống dòng
      this.orgInfoDesc.style.whiteSpace = "pre-wrap";
      this.orgInfoDesc.textContent = this.orgData[id].desc;

      // Add animation
      this.orgInfoCard.classList.remove("animate-pulse");
      void this.orgInfoCard.offsetWidth; // Trigger reflow
      this.orgInfoCard.classList.add("animate-pulse");
      setTimeout(() => {
        this.orgInfoCard.classList.remove("animate-pulse");
      }, 500);
    }
  }
}
