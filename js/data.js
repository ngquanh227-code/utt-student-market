/**
 * UTT Student Market - Data Store
 * Sàn thương mại & trao đổi đồ dùng sinh viên Trường ĐH Công nghệ Giao thông Vận tải
 */

const UTTData = {
  campuses: [
    { id: 'all', name: 'Tất cả cơ sở UTT' },
    { id: 'hanoi', name: 'Cơ sở Hà Nội (54 Triều Khúc, Thanh Xuân)' },
    { id: 'vinhyen', name: 'Cơ sở Vĩnh Yên (Vĩnh Phúc)' },
    { id: 'thainguyen', name: 'Cơ sở Thái Nguyên' }
  ],

  categories: [
    { id: 'all', name: 'Tất cả sản phẩm', icon: '🛍️' },
    { id: 'books', name: 'Sách & Giáo trình UTT', icon: '📚' },
    { id: 'tools', name: 'Dụng cụ & Máy tính kỹ thuật', icon: '📐' },
    { id: 'tech', name: 'Thiết bị điện tử', icon: '💻' },
    { id: 'dorm', name: 'Đồ phòng trọ & Gia dụng', icon: '🛏️' },
    { id: 'fashion', name: 'Quần áo & Đồng phục UTT', icon: '👕' },
    { id: 'free', name: 'Đồ 0đ (Cho / Tặng / Trao đổi)', icon: '🎁' }
  ],

  products: [
    {
      id: 'utt-1',
      title: 'Bộ combo giáo trình Cơ học kỹ thuật, Sức bền vật liệu & Thủy lực UTT',
      category: 'books',
      campus: 'hanoi',
      price: 65000,
      originalPrice: 160000,
      condition: 'Mới 90% (Đã bọc bìa kính)',
      author: 'Nguyễn Văn Tuấn (K72 - Khoa Cầu Đường)',
      avatar: '👨‍🎓',
      image: 'assets/giao_trinh_utt.jpg',
      badge: 'Thanh lý',
      verified: true,
      time: '15 phút trước',
      desc: 'Mình hoàn thành xong môn kỳ trước, sách còn rất mới có ghi chú công thức quan trọng thi học kỳ. Giao trực tiếp tại sảnh giảng đường A1 cơ sở Triều Khúc.'
    },
    {
      id: 'utt-2',
      title: 'Máy tính khoa học Casio FX-580VN X chính hãng Bitex còn tem bảo hành',
      category: 'tools',
      campus: 'hanoi',
      price: 390000,
      originalPrice: 680000,
      condition: 'Mới 98% (Đủ nắp trượt)',
      author: 'Trần Thu Hà (K73 - Khoa CNTT)',
      avatar: '👩‍🎓',
      image: 'assets/casio_fx580.jpg',
      badge: 'Bán nhanh',
      verified: true,
      time: '1 giờ trước',
      desc: 'Máy tính hoạt động hoàn hảo, phím nảy tốt, hỗ trợ giải hệ phương trình và ma trận cho dân kỹ thuật. Hẹn nhận máy tại thư viện UTT.'
    },
    {
      id: 'utt-3',
      title: 'Bàn phím cơ gõ êm học đêm ký túc xá, kết nối không dây bluetooth RGB',
      category: 'tech',
      campus: 'hanoi',
      price: 450000,
      originalPrice: 850000,
      condition: 'Mới 95% (Linear switch êm)',
      author: 'Lê Hoàng Nam (K71 - Khoa Điện tử)',
      avatar: '👨‍🎓',
      image: 'assets/product_keyboard.jpg',
      badge: 'Đồ điện tử',
      verified: true,
      time: '3 giờ trước',
      desc: 'Switch đã lube mượt mà không gây ồn ảnh hưởng bạn cùng phòng ký túc xá. Tặng kèm dây cáp type-C và keypuller.'
    },
    {
      id: 'utt-4',
      title: '[TẶNG 0Đ] Giáo trình Toán cao cấp A1 + Bài tập Giải tích UTT cho tân sinh viên K75',
      category: 'free',
      campus: 'hanoi',
      price: 0,
      originalPrice: 90000,
      condition: 'Còn dùng tốt (Có highlight)',
      author: 'Phạm Minh Đức (K72 - Logistics UTT)',
      avatar: '👨‍🎓',
      image: 'assets/giao_trinh_utt.jpg',
      badge: 'Cho - Tặng 0đ',
      verified: true,
      time: 'Vừa xong',
      desc: 'Tặng lại miễn phí 100% cho bạn nào mới vào trường cần tiết kiệm chi phí mua sách. Ưu tiên các bạn sinh viên tân khóa có hoàn cảnh khó khăn.'
    },
    {
      id: 'utt-5',
      title: 'Tai nghe Bluetooth True Wireless chống ồn học tiếng Anh, pin trâu 35h',
      category: 'tech',
      campus: 'vinhyen',
      price: 220000,
      originalPrice: 490000,
      condition: 'Mới 95% (Đủ dock sạc)',
      author: 'Hoàng Anh Dũng (K73 - Ô tô Vĩnh Yên)',
      avatar: '👨‍🎓',
      image: 'assets/product_earbuds.jpg',
      badge: 'Thanh lý',
      verified: true,
      time: '5 giờ trước',
      desc: 'Nghe giảng bài và học online tiện lợi, âm bass rõ ràng. Giao lưu trực tiếp cổng trường UTT Vĩnh Yên.'
    },
    {
      id: 'utt-6',
      title: 'Áo khoác gió đồng phục UTT size L còn mới tinh chưa mặc lần nào',
      category: 'fashion',
      campus: 'hanoi',
      price: 110000,
      originalPrice: 220000,
      condition: 'Mới 99% (Nguyên tag)',
      author: 'Đỗ Thùy Trang (K74 - Kinh tế Vận tải)',
      avatar: '👩‍🎓',
      image: 'assets/utt_market_banner.jpg',
      badge: 'Đồng phục',
      verified: true,
      time: '6 giờ trước',
      desc: 'Mua nhầm size nên muốn pass lại cho bạn nào cần áo khoác đồng phục mùa đông, form đẹp chuẩn trường UTT.'
    }
  ],

  // 11 Steps from Report & Diagram
  steps11: [
    { num: 'Bước 1', name: 'Đăng Ký Tài Khoản', desc: 'Sử dụng Email sinh viên UTT hoặc SĐT để hoàn thiện hồ sơ.' },
    { num: 'Bước 2', name: 'Xác Minh Sinh Viên', desc: 'Kiểm tra thẻ sinh viên/email trường để đảm bảo độ tin cậy 100%.' },
    { num: 'Bước 3', name: 'Hệ Thống Kiểm Duyệt', desc: 'Kiểm duyệt tự động & thủ công: nội dung, ảnh thực tế, cấm hàng lậu.' },
    { num: 'Bước 4', name: 'Sản Phẩm Được Đăng', desc: 'Hiển thị công khai trên nền tảng theo đúng phân loại và cơ sở.' },
    { num: 'Bước 5', name: 'Tìm Kiếm & Liên Hệ', desc: 'Người mua lọc sản phẩm, trò chuyện qua chat hoặc hẹn gặp mặt.' },
    { num: 'Bước 6', name: 'Xác Nhận Đơn Hàng', desc: 'Thống nhất giá cả, thời gian và địa điểm giao nhận an toàn.' },
    { num: 'Bước 7', name: 'Thanh Toán An Toàn', desc: 'Trực tiếp tại trường hoặc chuyển khoản giữ tiền qua hệ thống.' },
    { num: 'Bước 8', name: 'Giao Hàng / Gặp Mặt', desc: 'Giao trực tiếp tại sân trường UTT, thư viện, hoặc cổng KTX.' },
    { num: 'Bước 9', name: 'Nhận & Kiểm Tra Hàng', desc: 'Người mua kiểm tra đúng tình trạng mô tả trước khi xác nhận.' },
    { num: 'Bước 10', name: 'Xác Nhận Hoàn Tất', desc: 'Đóng giao dịch trên hệ thống, giải phóng tiền cho người bán.' },
    { num: 'Bước 11', name: 'Đánh Giá & Uy Tín', desc: 'Hai bên chấm sao và nhận xét để xây dựng điểm uy tín cộng đồng.' }
  ],

  // 6 Implementation Stages
  roadmap: [
    { phase: 'Giai đoạn 1', title: 'Khảo sát nhu cầu', desc: 'Thu thập mong muốn, vấn đề của SV các khoa tại 3 cơ sở UTT.' },
    { phase: 'Giai đoạn 2', title: 'Thiết kế mô hình', desc: 'Hoàn thiện BMC, quy trình mua bán, chính sách bảo vệ SV.' },
    { phase: 'Giai đoạn 3', title: 'Xây dựng MVP', desc: 'Ra mắt web tối thiểu gồm đăng tin, tìm kiếm, chat, đánh giá.' },
    { phase: 'Giai đoạn 4', title: 'Thử nghiệm nội bộ', desc: 'Thử nghiệm nhóm nhỏ K72-K74, đo lường tỷ lệ chốt đơn.' },
    { phase: 'Giai đoạn 5', title: 'Mở rộng quy mô', desc: 'Mở rộng 3 cơ sở UTT, bổ sung tính năng giao nhận liên cơ sở.' },
    { phase: 'Giai đoạn 6', title: 'Tối ưu doanh thu', desc: 'Triển khai tin nổi bật, gian hàng sinh viên và quảng cáo dịch vụ.' }
  ]
};
