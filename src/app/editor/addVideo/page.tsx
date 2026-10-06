// 'use client'
import { AddVideoScreen } from "@/screen/AddVideoScreen";
import { Metadata } from "next";


export const metadata: Metadata  = {
  title: "Добавить видео",
};

// https://www.youtube.com/watch?v=YqonofhqhTU

export default  function AddVideoPage(){
    return(
        <section>
           <AddVideoScreen/>
        </section>
    )
}