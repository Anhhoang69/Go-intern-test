import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      dashboard: "Dashboard",
      searchScores: "Search Scores",
      reports: "Reports",
      top10: "Top 10 Group A",
      registrationNumber: "Registration Number",
      search: "Search",
      searching: "Searching...",
      results: "Results - Registration Number",
      subject: "Subject",
      score: "Score",
      grade: "Grade",
      excellent: ">= 8 (Excellent)",
      good: "6-8 (Good)",
      average: "4-6 (Average)",
      weak: "< 4 (Weak)",
      absent: "Absent",
      placeholderSbd: "Enter 8 digits (e.g. 01000001)",
      errorDefault: "An error occurred. Please try again.",
      
      toan: 'Mathematics',
      ngu_van: 'Literature',
      ngoai_ngu: 'Foreign Language',
      vat_li: 'Physics',
      hoa_hoc: 'Chemistry',
      sinh_hoc: 'Biology',
      lich_su: 'History',
      dia_li: 'Geography',
      gdcd: 'Civic Education',

      subTitle: "High School Graduation Exam 2024 Score Portal",
      searchDesc: "Enter registration number to view detailed exam scores",
      reportsDesc: "Score distribution charts across 4 performance levels",
      top10Desc: "View the list of 10 students with the highest Group A total scores",
      underConstruction: "Configuration is in progress...",
    }
  },
  vi: {
    translation: {
      dashboard: "Dashboard",
      searchScores: "Tra cứu điểm",
      reports: "Thống kê",
      top10: "Top 10 Khối A",
      registrationNumber: "Số báo danh",
      search: "Tra cứu",
      searching: "Đang tìm...",
      results: "Kết quả - Số báo danh",
      subject: "Môn học",
      score: "Điểm",
      grade: "Xếp loại",
      excellent: ">= 8 (Giỏi)",
      good: "6-8 (Khá)",
      average: "4-6 (Trung bình)",
      weak: "< 4 (Yếu)",
      absent: "Vắng thi",
      placeholderSbd: "Nhập 8 chữ số (VD: 01000001)",
      errorDefault: "Có lỗi xảy ra. Vui lòng thử lại.",

      toan: 'Toán',
      ngu_van: 'Ngữ Văn',
      ngoai_ngu: 'Ngoại Ngữ',
      vat_li: 'Vật Lí',
      hoa_hoc: 'Hóa Học',
      sinh_hoc: 'Sinh Học',
      lich_su: 'Lịch Sử',
      dia_li: 'Địa Lí',
      gdcd: 'GDCD',

      subTitle: "Hệ thống tra cứu điểm thi THPT Quốc gia 2024",
      searchDesc: "Nhập số báo danh để xem điểm thi chi tiết",
      reportsDesc: "Biểu đồ phân bộ điểm theo 4 mức của từng môn",
      top10Desc: "Danh sách 10 thí sinh đạt tổng điểm khối A cao nhất",
      underConstruction: "Đang được xây dựng...",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
