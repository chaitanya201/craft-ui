import { redirect, type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "React Components" },
    
  ];
};

export const loader = async () =>{
  return redirect('/login')
}

export default function Index() {
  
  return null
}
