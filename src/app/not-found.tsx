import { NotFoundPage } from "@/screen/NotFoundPage"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Страница не найдена",
};

export default function NotFound(){
    return(
        <NotFoundPage/>
    )
}