interface CardProps{
    label?:String;
    onClick?:()=>void;
    disabled?:boolean
    className?:String;
    height?:any;
    width?:any
    type?:"submit" | "reset" | "button"|undefined
    children?:any
  

}

const Card:React.FC<CardProps>=({label,onClick,disabled=false,height,width,className='',type,children})=>{
return(
    <div  className={`w-[${width}%] rounded-full h-[${height}]text-center overflow-hidden bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
    >

{children}
    </div>
)
}

export default Card;
