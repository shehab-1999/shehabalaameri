'use client'
import { useEffect, useState,createContext } from "react";

import { useCookies } from "react-cookie";
import Home from "../Dashboard/Home/page";
import { decrypt } from "../util/encryptons";


export const hashPermision = (requiredAction: string) => {
  const permissionStorage = sessionStorage.getItem("role");

  if (permissionStorage) {
    const decryptedPermission = decrypt(permissionStorage);
    return requiredAction.includes(decryptedPermission);
  }

  return false;
}


export const PermissionContext = createContext<string[] | null>(null);

interface FunProviderProps {
  children: React.ReactNode;
}

export default function FunProvider({ children }: FunProviderProps):React.JSX.Element {
  const [data, setData] = useState<string[]>([]);
  const [cookies] = useCookies(['permision']);

  // useEffect(() => {
  //   const hashString = cookies.permision;

  //   if (hashString) {
  //     const decryptedHash = decryptArray(hashString);
  //     setData(decryptedHash);
  //   } else {
  //     console.log('Hash is null, cannot decrypt.');
  //   }
  // }, [cookies]);

  return (
    <PermissionContext.Provider value={data}>
      {children}
    </PermissionContext.Provider>
  );
}