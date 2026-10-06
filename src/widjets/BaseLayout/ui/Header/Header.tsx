'use client'
import Image from 'next/image'
import s from './Header.module.css'
import Logo from './logo.svg'
import Link from 'next/link'
import Menu from './menu.svg'
import LeftMenu from '../LeftMenu/LeftMenu'
import { useState } from 'react'

type HeaderProps = {
    profileId: string
}


export default function Header({profileId}: HeaderProps){
    const [isOpen, setIsOpen] = useState(false)

    return(
        <header className={s.header}>
           <div className={s.header_left}>
             {/* <Image src={Menu} alt='menu'/> */}
             
             <Link href="/">
             <Image className={s.logo} src={Logo} alt='logo'/>
            </Link>
           </div>

            <div className={s.header_left}>
                <Link href={`/editor/addVideo`} className={s.createVideoLink}>
                    Создать
                </Link>
                
                <Link href={`/profile/${profileId}`} className={s.yourProfileLink}>
                    <div className={s.hiddenText}>
                        Перейти в свой профиль
                        </div>
                </Link>
            </div>

            
        </header>
    )
}