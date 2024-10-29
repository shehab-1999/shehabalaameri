import { useState } from "react";
import { useGetDoctor } from "@/queries/doctors/getAllDoctors";



export default function DepartmentHome() {
  const [show, setShow] = useState(true);
  const [depName, setDepName] = useState("الأقسام");
  const [showdoctor, setShowDoctor] = useState("");
  const { isLoading, error, data } = useGetDoctor();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="text-black w-[100%] items-center justify-start">
      <div
        style={{ position: "sticky", zIndex: 1, top: 0 }}
        className="rounded-xl mb-[10px] border-solid  bg-[#091e3a]"
      >
        <h1 className="text-white text-center justify-between rounded-sm flex  font-serif font-bold text-[20px] px-4 items-center">
          <div style={{paddingRight:!show?"":"110px"}} >{depName} </div>
          {!show && <button
            onClick={() => {
              setShow(true);
              setDepName("الأقسام");
            }}
            className="text-red-700 "
          >
            رجوع
          </button>}
        </h1>
      </div>
      {show ? showAllDoctor() : showDoctorByDepartment(showdoctor)}
    </div>
  );

  function showAllDoctor() {
    return data?.map((data:any,index:number) => (
      <div key={index}>
        <div className="hover:shadow-2xl hover:shadow-current pr-[10px] pl-[10px] flex flex-row rounded-sm items-center justify-between mb-[20px] w-[100%]">
        {data.img!==null&&  <div className="h-[50px] w-[50px] rounded-full bg-[#bf9ec5d0] flex justify-center items-center">
            <img
              src={`/images/${data.img}`}
              alt={`avatar`}
              width={30}
              height={30}
              className="rounded-full bg-black"
            />
         
          </div>}
          {data.img==null&&"لا توجد صورة"
          
        }
          <div>
            <h2 className="opacity-70 text-center">
              {data.department.depName}
            </h2>
            <h2>د. {data.doctorName}</h2>
          </div>

          <div className="opacity-70 text-center">
            <button
              onClick={() => {
                setShowDoctor(data.department.depName);
                setShow(false);
                setDepName("قسم " + data.department.depName);
              }}
              className="flex transform "
            >
              <h1 className="font-serif  hover:bg-gray-200">عرض الكل </h1>
            </button>
          </div>
        </div>
      </div>
    ));
  }
  function showDoctorByDepartment(depNumber: string) {
    return data?.map((data:any,index:number) => (
      <div key={index}>
        {data.department.depName === depNumber && (
          <div className="hover:shadow-2xl hover:shadow-current pr-[10px] pl-[10px] flex flex-row rounded-sm items-center justify-between mb-[20px] w-[100%] hover:bg-gray-200">
            <div className="h-[50px] w-[50px] rounded-full bg-[#bf9ec5d0] flex justify-center items-center">
              <img
                src={"/images/doctor.jpg"}
                alt={`'s avatar`}
                width={30}
                height={30}
                className="rounded-full bg-black"
              />
            </div>

            <div >
              <h2 className="opacity-70 text-center">
                {data.department.depName}
              </h2>
              <h2>د. {data.doctorName}</h2>
            </div>

          </div>
        )}
      </div>
    ));
  }
}
