import { FiHome, FiBook, FiTarget } from 'react-icons/fi';
import { GiCrossedSwords } from 'react-icons/gi'; // ใช้ไอคอนดาบจาก react-icons/gi

// กำหนดลำดับหมวดหมู่
const categoryOrder = ['mh-wild', 'Weapons', 'Monsters']; // เพิ่มหมวดหมู่ตามต้องการ

// กำหนดลำดับไฟล์ในแต่ละหมวดหมู่
const fileOrder = {
  'mh-wild': ['index', 'สกิล', 'Monsters'], // ตัวที่กำหนด path 
  'Weapons': ['index', 'great-sword', 'dual-blades'],
  'Monsters': ['index', 'large-monsters', 'small-monsters']
};

// กำหนดชื่อที่แสดงในเมนูสำหรับแต่ละไฟล์
const displayNames = {
  'index': 'หน้าแรก',
  'สกิล': 'ฐานข้อมูลสกิลทั้งหมด',
  'Monsters': 'มอนสเตอร์ทั้งหมด',
  'great-sword': 'ดาบใหญ่',
  'dual-blades': 'ดาบคู่'
};

// กำหนดไอคอนสำหรับแต่ละไฟล์
const iconMap = {
  'index': <FiHome />,
  'สกิล': <GiCrossedSwords />,
  'Monsters': <FiTarget />,
  'great-sword': <GiCrossedSwords />,
  'dual-blades': <GiCrossedSwords />
};

// กำหนดคำอธิบายสำหรับแต่ละไฟล์
const descriptionMap = {
  'index': 'หน้าแรกของคู่มือ',
  'สกิล': 'คู่มือเกี่ยวกับสกิลทั้งหมดในเกม',
  'Monsters': 'รายละเอียดของมอนสเตอร์ทั้งหมด',
  'great-sword': 'วิธีการใช้ดาบใหญ่',
  'dual-blades': 'วิธีการใช้ดาบคู่'
};

export const menuItems = [];

// รายการไฟล์ MDX
const docFiles = import.meta.glob('/docs/**/*.mdx');

// สร้างโครงสร้างข้อมูลสำหรับหมวดหมู่
const menuMap = {};

Object.keys(docFiles).forEach((filePath) => {
  const parts = filePath.replace('/docs/', '').replace('.mdx', '').split('/');
  
  if (parts.length < 2) return;
  
  const category = parts[0];
  const fileName = parts[1];
  
  if (!fileName) return;
  
  if (!menuMap[category]) {
    menuMap[category] = {
      title: category,
      items: [],
    };
  }
  
  menuMap[category].items.push({
    originalName: fileName,
    name: displayNames[fileName] || fileName.replace('-', ' '),
    path: `/docs/${category}/${fileName}`,
    icon: iconMap[fileName] || <FiBook />,
    description: descriptionMap[fileName] || `อ่านเอกสารเกี่ยวกับ ${fileName}`,
  });
});

// เรียงลำดับหมวดหมู่ตามที่กำหนด
categoryOrder.forEach(category => {
  if (menuMap[category]) {
    // เรียงลำดับไฟล์ในแต่ละหมวดหมู่ตามที่กำหนด
    if (fileOrder[category]) {
      menuMap[category].items.sort((a, b) => {
        const indexA = fileOrder[category].indexOf(a.originalName);
        const indexB = fileOrder[category].indexOf(b.originalName);
        
        // ถ้าไม่พบในการกำหนดลำดับ ให้ไปต่อท้าย
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        
        return indexA - indexB;
      });
    }
    
    menuItems.push(menuMap[category]);
  }
});

// เพิ่มหมวดหมู่ที่ไม่ได้อยู่ใน categoryOrder
Object.keys(menuMap).forEach(category => {
  if (!categoryOrder.includes(category)) {
    menuItems.push(menuMap[category]);
  }
});