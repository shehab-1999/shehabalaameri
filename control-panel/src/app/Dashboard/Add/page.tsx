
// import { GridColDef } from "@mui/x-data-grid";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { secondsInDay } from "date-fns/constants";
// import { da } from "date-fns/locale/da";
// import React, { useState } from "react";
// import DepartmentHome from "../Home/depratmentHome/page";
// import { stringify } from "querystring";
// import { format } from "date-fns";
// import moment from "moment";
// import { useAddDoctor } from "@/mutations/doctors/useAddDoctor";
// import { useGetDepartments } from "@/queries/department/useGetAllDepartment";
// type Props = {
//   slug: string;
//   column: GridColDef[];
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// };

// export default function Add(props: Props) {
//   const { data } = useGetDepartments();
//   const [selectedValues, setSelectedValues] = useState<any[]>([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [startTime, setStartTime] = useState(new Date());
//   const [endTime, setEndTime] = useState(new Date());
//   const [formData, setFormData] = useState({});
//   const queryClient = useQueryClient();

//   const handleCheckboxChange = (value: string) => {
//     if (selectedValues.map((item) => item.day).includes(value)) {
//       setSelectedValues(selectedValues.filter((item) => item.day !== value));
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         ["weekdays"]: selectedValues.filter((item) => item.day !== value),
//       }));
//     } else {
//       setSelectedValues([...selectedValues, { day: value, "endTime": endTime, "startTime": startTime }]);
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         ["weekdays"]: [...selectedValues, { day: value, "endTime": endTime, "startTime": startTime }],
//       }));
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };
 
//   const options = [
//     { value: "السبت", label: "السبت" },
//     { value: "الأحد", label: "الأحد" },
//     { value: "الإثنين", label: "الإثنين" },
//     { value: "الثلاثاء", label: "الثلاثاء" },
//     { value: "الأربعاء", label: "الأربعاء" },
//     { value: "الخميس", label: "الخميس" },
//     { value: "الجمعة", label: "الجمعة" },
//   ];

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

  

//   const mutation = useMutation({
//     mutationFn: (data: any) => {
//       return useAddDoctor(data);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [`all${props.slug}`] });
//       props.setOpen(false);
//     },
//   });
  

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     await mutation.mutateAsync(formData);
//   };
// console.log(formData)
// console.log(selectedValues)
//   const isInputFull = Object.values(formData).every((value) => value !== "");
 
//   return (
//     <div className="w-screen h-screen absolute top-0 left-0 bg-[rgba(0,0,0,0.724)] flex items-center justify-center">
//       <div className="p-[50px] rounded-[10px] bg-white  relative ">
//         <span
//           onClick={() => props.setOpen(false)}
//           className="cursor-pointer top-[10px] right-[10px] absolute hover:bg-red-700 p-[5px] rounded-[5px]"
//         >
//           X
//         </span>
//         <h1 className="mb-[40px] text-[20px] text-black font-bold font-serif">
//           {" "}
//           إضافة {props.slug} جديد{" "}
//         </h1>
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-wrap max-w-[500px] justify-between"
//         >
//           {props.column
//             .filter(
//               (item) =>
//                 item.field !== "serialNumber" &&
//                 item.field !== "id" &&
//                 item.field !== "img"
//             )
//             .map((item,index:number) => (
//               <div
//                 key={index}
//                 className="flex flex-col gap-[10px] mb-[20px] font-serif font-bold w-[40%]"
//               >
//                 <label className="text-[14px] text-black font-serif font-bold">
//                   {item.headerName}
//                 </label>
//                 {Days(item)}
//                 {item.field === "القسم" && (
//                   <select
//                     className="p-[10px] bg-transparent text-black font-serif font-bold outline-none border-solid border-[1px] border-slate-100 rounded-[3px]"
//                     name="department"
//                     onChange={(e) => {
//                       setFormData({
//                         ...formData,
//                         [e.target.name]: e.target.value,
//                       });
//                     }}
//                   >
//                     {data?.map((deparatment) => (
//                       <option value={deparatment.id}>
//                         {" "}
//                         {deparatment.depName}{" "}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//                 {item.field == "أوقات  الدوام" && (
//                   <div>
//                     <label htmlFor="">
//                       من:
//                       <input
//                         className="p-[10px] bg-transparent text-black font-serif font-bold outline-none border-solid border-[1px] border-slate-100 rounded-[3px]"
//                         type="time"
//                         value={moment(startTime).format("HH:mm")}
//                         onChange={(e) => {
//                           setStartTime(
//                             moment(e.target.value, "HH:mm").local().toDate()
//                           );
//                         }}
//                       />
//                     </label>

//                     <label htmlFor="">
//                       <div>
//                         إلى:
//                         <input
//                           className="p-[10px] bg-transparent text-black font-serif font-bold outline-none border-solid border-[1px] border-slate-100 rounded-[3px]"
//                           type="time"
//                           value={moment(endTime).format("HH:mm")}
//                           onChange={(e) => {
//                             setEndTime(
//                               moment(e.target.value, "HH:mm").local().toDate()
//                             );
//                           }}
//                         />
//                       </div>
//                     </label>
//                   </div>
//                 )}

//                 {item.field !== "القسم" &&
//                   item.field !== "weekwork" &&
//                   item.field !== "أوقات نهاية الدوام" &&
//                   item.field !== "أوقات  الدوام" && (
//                     <input
//                       type={item.type}
//                       name={item.field}
//                       placeholder={item.field}
//                       className="p-[10px] bg-transparent text-black font-serif font-bold outline-none border-solid border-[1px] border-slate-100 rounded-[3px]"
//                       onChange={handleChange}
//                     />
//                   )}
//               </div>
//             ))}
//           <button
//             type="submit"
//             className={`w-[100%] cursor-pointer p-[10px] text-black text-[16px] rounded-[5px] ${
//               isInputFull ? "bg-gray-200 hover:bg-slate-600" : "bg-black"
//             }`}
//             disabled={Object.values(formData).some((value) => value === "")}
//           >
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );

//   function Days(item: GridColDef): React.ReactNode {
//     return (
//       item.field == "weekwork" && (
//         <div className="p-[10px] bg-transparent relative text-black font-serif font-bold outline-none border-solid border-[1px] border-slate-100 rounded-[3px]">
//           <button
//             type="button"
//             className="flex items-center justify-between overflow-clip w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             onClick={toggleDropdown}
//           >
//             {selectedValues.length > 0
//               ? `${selectedValues.map((day) => day.day)}`
//               : ""}
//             <svg
//               className={`w-5 h-5 transition-transform ${
//                 isOpen ? "rotate-80" : ""
//               }`}
//               fill="currentColor"
//               viewBox="0 0 20 20"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </button>
//           {isOpen && (
//             <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
//               {options.map((option) => (
//                 <div key={option.value} className="px-4 py-2 hover:bg-gray-100">
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="dropdown-checkbox"
//                       checked={selectedValues
//                         .map((item) => item.day)
//                         .includes(option.value) }
//                       onChange={() => handleCheckboxChange(option.value)}
//                       className="mr-2"
//                     />
//                     {option.label}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )
//     );
//   }
// };


