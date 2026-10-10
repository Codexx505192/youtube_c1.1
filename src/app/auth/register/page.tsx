

import { HomeScreen } from "@/screen/HomeScreen";
import { RegisterScreen } from "@/screen/RegisterScreen/RegisterScreen";
import { VIDEO_CATEGORIES } from "@/shared/constants/videoCategories";
import { GetAllVideosDto } from "@/shared/types/typesFromBackend";
import Link from "next/link";

export default async function RegisterPage() {
try{


 return (
    <RegisterScreen />
  );
}
catch(error){
  console.error(error)
return <div>Что-то Пошло не так</div>
}

}
