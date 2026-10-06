import s from './NotFoundPage.module.css'
import not from './not2.svg'
import Image from 'next/image'

export const NotFoundPage = () => {
    return(
        <section>
            <div className={s.container}>
                <div className={s.not_itm}>
                    <Image src={not} alt="Nt" />
                </div>

                <p className={s.n_txt_1}>Это страница недоступна</p>
            </div>
        </section>
    )
}