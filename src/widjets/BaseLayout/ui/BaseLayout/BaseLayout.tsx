import React from 'react'
import LeftMenu from '../LeftMenu/LeftMenu'
import Header from '../Header/Header'
import s from './BaseLayout.module.css'

type BaseLayoutProps = Readonly <{
  children: React.ReactNode
}>

export const BaseLayout = ({children}: BaseLayoutProps) => {
    return(
       <section>
        <div className={s.container}>
            <Header profileId={'123'}/>
            <LeftMenu/>
            {children}   
            {/* <h1>home</h1> */}
        </div>
       </section>
    )
}