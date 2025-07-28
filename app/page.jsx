"use client";
import Feed from "@components/Feed";
import { useSession } from "next-auth/react";
const Homepage = () => {
  const { data: session } = useSession();
  return (
 
    <div >
    <section className="w-full flex center flex-col ">
     <h1 className="text-4xl font-bold tracking-tight text-pretty text-gray-900 sm:text-5xl text-center py-10">
       <span className="orange_gradient">
        PromptShare
       </span>
      <br/>
      DISCOVER AND SHARE
      <br/>
      <span className="orange_gradient text-center" >
        AI-POWERED
         PROMPTS
      </span>
     </h1>
     {!session?.user?<h3 className="text-center text-orange-600 font-bold">Sigin to share or like prompts</h3>:""}
     <p className="text-center">PromptShare  is a open source Al prompting project where you can discover and share various useful AI prompts</p>
      <Feed/>
      
     
    </section>
    </div>
    )
}
  
  ;
;

export default Homepage;
