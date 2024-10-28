// colorUtils.js

// Bảng mã màu với tên tiếng Việt
export const colorMap = {
    '#FFFFFF': 'Trắng',
    '#000000': 'Đen',
    '#808080': 'Xám',
    '#D3D3D3': 'Xám Nhạt',
    '#FF0000': 'Đỏ',
    '#000080': 'Xanh Navy',
    '#87CEEB': 'Xanh Da Trời',
    '#008000': 'Xanh Lá Cây',
    '#90EE90': 'Xanh Lục Nhạt',
    '#FFFF00': 'Vàng',
    '#8B4513': 'Nâu',
    '#F5F5DC': 'Kem (Beige)',
    '#FFA500': 'Cam',
    '#FFC0CB': 'Hồng',
    '#800080': 'Tím',
    '#4682B4': 'Xanh Thép',
    '#00FFFF': 'Xanh Ngọc',
    '#F0E68C': 'Kaki',
    '#FFD700': 'Vàng Kim',
    '#DC143C': 'Đỏ Thắm',
    // Thêm bất kỳ mã màu nào khác nếu cần
  };
  
  // Hàm chuyển mã màu sang tên tiếng Việt
  export const getColorNameInVietnamese = (colorCode) => {
    return colorMap[colorCode] || colorCode; // Trả về mã gốc nếu không tìm thấy tên
  };
  