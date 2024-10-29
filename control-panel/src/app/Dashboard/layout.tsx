import Home from "./Home/page";
import Menu from "../components/Menu/page";
import NavBar from "../components/navbar/page";
import FunProvider from "../permision/hashpermision";



export default function Layout({children}:Readonly<{children:React.ReactNode}>) {
  return (
    <div className="flex bg-white w-[100%] h-[100%]">
      <div
        className="font-sans shadow-lg bg-white text-black p-1 flex-flex4  "
        dir="rtl"
        style={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <NavBar />

        <div className=" pr-5 pl-5  mt-[10px] bg-slate-200 w-[100%] h-[650px]">
  <FunProvider>  {children}</FunProvider>
        </div>
      </div>
      <div className=" rounded-[10px] border-solid border-white border-[10px] bg-white  max-h-fit">
        <Menu />
      </div>
    </div>
  );
}
