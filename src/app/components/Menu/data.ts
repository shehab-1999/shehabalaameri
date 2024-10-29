import { permission } from "process";

export const menu = [
  {
   
        id: 1,
        title: "الرئيسية",
        url: "/Dashboard",
        icon: "home.svg",
        permissionPage:""
      },
  
 

      {
        id: 2,
        title: "المستخدمين",
        url: "/Dashboard/user",
     
      },
      {
        id: 3,
        title: "الأخبار ",
        url: "/Dashboard/news",
        permissionPage:"News"
      },
      {
        id: 4,
        title: "الدكاترة",
        url: "/Dashboard/doctor",
        permissionPage:"Doctors"
       
      },
      {
        id: 5,
        title: "الأقسام",
        url: "/Dashboard/department",
        permissionPage:"Departments"
       
      },
      {
        id: 6,
        title: "الأمراض",
        url: "/Dashboard/patients",
        permissionPage:"Patients"
       
      },
      {
        id: 7,
        title: "العاملين",
        url: "/Dashboard/",
        
      },
 
  
    
      {
        id: 8,
        title: "التحليلات",
        url: "/Dashboard/statistics",
        icon: "element.svg",
      },
      {
        id: 8,
        title: "الإعدادات",
        url: "/Dashboard/setting",
        icon: "note.svg",
      },
 
  

];

