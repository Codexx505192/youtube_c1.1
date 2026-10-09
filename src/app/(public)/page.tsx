import { HomeScreen } from "@/screen/HomeScreen";
import { VIDEO_CATEGORIES } from "@/shared/constants/videoCategories";
import { GetAllVideosDto } from "@/shared/types/typesFromBackend";

export default async function Home() {
try{
const dataFromServer = await fetch(`${process.env.SERVER_API_URL}/api/videos`, {
method: 'GET',
})
 
const response = await dataFromServer.json() as GetAllVideosDto
console.log('response', response)

const finalCategories = VIDEO_CATEGORIES.filter(({id}) => (
  response.categories.includes(id)
))


 return (
    <>
    <HomeScreen data={response.data} categories={finalCategories}/>
    </>
  );
}
catch(error){
  console.error(error)
return <div>Что-то Пошло не так</div>
}

}
