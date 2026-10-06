import { VideoScreen } from "@/screen/VideoScreen/VideoScreen";
import { Metadata } from "next";

type VideoPageProps = {
params: Promise<{videoId: string}>
}

export const metadata: Metadata = {
  title: "Видео: ...",
};

export default async function VideoPage({params}: VideoPageProps){
const data = await params
const videoId = data.videoId


    return(
        <section>
            <VideoScreen videoId={videoId}/>
        </section>
    )
}