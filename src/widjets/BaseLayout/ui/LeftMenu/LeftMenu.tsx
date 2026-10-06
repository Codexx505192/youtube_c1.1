import Link from 'next/link'
import s from './LeftMenu.module.css'
import HomeIcon from '@/shared/assets/icons/home.svg'
import ProfileIcon from '@/shared/assets/icons/profile.svg'
import AddIvideo from '@/shared/assets/icons/add.svg'
import YourVidios from '@/shared/assets/icons/video.svg'
import Image from 'next/image';

export default function LeftMenu(){
    return(
        <aside className={s.leftMenu}>
         <nav>
            <ul className={s.left_list}> 
                 <li className={s.list_itm}>
                <Image 
                unoptimized 
                src={HomeIcon}  
                width="24" 
                height="24" 
                alt="icon" 
                aria-hidden="true"
                className={s.icon}
                />
                <Link href="/" className={s.lnk}>Главная</Link>
               </li>

               <li className={s.list_itm}>
                <Image 
                unoptimized 
                src={ProfileIcon}  
                width="24" 
                height="24" 
                alt="icon" 
                aria-hidden="true"
                className={s.icon}
                />
                <Link href="/profile/123" className={s.lnk}>Профиль</Link>
               </li>

               <div className={s.line}></div>
               
               <li className={s.list_itm}>
                <Image 
                unoptimized 
                src={AddIvideo}  
                width="24" 
                height="24" 
                alt="icon" 
                aria-hidden="true"
                className={s.icon}
                />
                <Link href="/editor/addVideo" className={s.lnk}>Добавить видео</Link>
               </li>

               <li className={s.list_itm}>
                <Image 
                unoptimized 
                src={YourVidios}  
                width="24" 
                height="24" 
                alt="icon" 
                aria-hidden="true"
                className={s.icon}
                />
                <Link href="/profile/123" className={s.lnk}>Профиль</Link>
               </li>
            </ul>
         </nav>
        </aside>
    )
}