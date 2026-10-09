import { HomeScreen } from "@/screen/HomeScreen";
import { VIDEO_CATEGORIES } from "@/shared/constants/videoCategories";
import { GetAllVideosDto, GetOneVideoDto } from "@/shared/types/typesFromBackend";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

type CategoryPageProps = {
params: Promise<{categoryId: string}>
}
// export const metadata: Metadata = {
//   title: "Видео в категории: ...",
// };



export async function generateMetadata(
  { params,  }: CategoryPageProps,): Promise<Metadata> {
  const data = await params
  const categoryId = data.categoryId

 const foundCategory = VIDEO_CATEGORIES.find((category) => category.id === categoryId)
  
   if(!foundCategory){
    return {title: 'Категория не найдена'}
   }

  return {
    title: `Видео в категории: ${foundCategory.title}`,
  }
}


export default async function CategoryPage({params}: CategoryPageProps){
const data = await params
const categoryId = data.categoryId

const foundCategory = VIDEO_CATEGORIES.find((category) => category.id === categoryId)
  
if(!foundCategory) return notFound()

try{
const dataFromServer = await fetch(`${process.env.SERVER_API_URL}/api/videos?categoryId=${categoryId}`)
const response = await dataFromServer.json() as GetAllVideosDto
console.log('response', response)

if(!response.data){
  throw new Error('Нет данных о видео')
}

const finalCategories = VIDEO_CATEGORIES.filter(({id}) => (
  response.categories.includes(id)
))

 return(
        <HomeScreen data={response.data} categories={finalCategories}/>
    )
}
catch (error){
    console.error(error)
    return <div>Что-то Пошло не так</div>
}
}