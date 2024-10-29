interface ButtonProps{
    label?:String;
    onClick?:()=>void;
    disabled?:boolean
    className?:String;
    type?:"submit" | "reset" | "button"|undefined
    children?:any
  

}

const Button:React.FC<ButtonProps>=({label,onClick,disabled=false,className='',type,children})=>{
return(
    <button onClick={onClick} disabled={disabled} type={type}
     className={`py-2 px-4 rounded bg-[#091E3A] text-white hover:bg-blue-600 disabled:bg-gray-400 font-serif font-normal text-sm ${className}`} >
        {label}
        {children}
        

    </button>
)
}

export default Button;
