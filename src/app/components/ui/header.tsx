interface HeaderProps{
    // label?:String;
    // onClick?:()=>void;
    // disabled?:boolean
    // className?:String;
    // type?:"submit" | "reset" | "button"|undefined
    children?:any
  

}

const Header:React.FC<HeaderProps>=({children})=>{
return(
    <div className="rounded-xl  border-solid mb-[10px] sticky top-0 z-[1]  bg-[#091e3a]">
        <h1 className="text-white text-center justify-items-center  rounded-sm font-serif font-bold text-[20px] items-center">
      {children}
        </h1>
      </div>
)
}

export default Header;
