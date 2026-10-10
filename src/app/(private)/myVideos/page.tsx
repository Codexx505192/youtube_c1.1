// import { AddVideoScreen } from "@/screen/AddVideoScreen";
import MyVideosScreen from "@/screen/MyVideosScreen/MyVideosScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Мои видео'
}

export default function MyVideosPage(){
const userId = '12345'

    return <MyVideosScreen />
}