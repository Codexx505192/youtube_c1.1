// 'use client'
// import { AddVideoScreen } from "@/screen/AddVideoScreen/AddVideoScreen";
import { AddVideoScreen} from "@/screen/AddVideoScreen/ui/AddVideoScreen";
import { Metadata } from "next";


export const metadata: Metadata  = {
  title: "Добавить видео",
};

export default  function AddVideoPage(){
    return(
        <section>
           <AddVideoScreen/>
        </section>
    )
}