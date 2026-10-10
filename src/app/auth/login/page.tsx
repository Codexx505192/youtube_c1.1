
import { HomeScreen } from "@/screen/HomeScreen";
import { LoginScreen } from "@/screen/LoginScreen";
import { VIDEO_CATEGORIES } from "@/shared/constants/videoCategories";
import { GetAllVideosDto } from "@/shared/types/typesFromBackend";
import Link from "next/link";

export default async function LoginPage() {
try{
 return <LoginScreen />
}
catch(error){
  console.error(error)
return <div>Что-то Пошло не так</div>
}

}
