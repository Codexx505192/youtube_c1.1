'use client'
import Link from 'next/link'
import s from './RegisterScreen.module.css'
import { zodResolver } from '@hookform/resolvers/zod'
import z, { string } from 'zod'
import { useForm } from 'react-hook-form'


const schema = z.object({
      nickname: z.string().min(1, 'Минимум 1 символ'),
      password: z.string().min(1, 'Минимум 1 символ'),
    });

type Inputs = {
     nickname: string,
     password: string,
    }

export const  RegisterScreen = () => {
const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>({resolver: zodResolver(schema)})

    const onSubmit = handleSubmit((data: Inputs) => {
     console.log('data', data)

     
    })

    const hasNicknameInputError = !!errors.nickname?.message
    const hasPasswordInputErro = !!errors.password?.message

    return(
        <div className={s.container}>
         <form onSubmit={onSubmit}>
            <label>
            <input {...register('nickname')} type="text" placeholder='Никнейм'/>
              {hasNicknameInputError && (
                <p className={s.error}>{errors.nickname?.message}</p>
                )}
            </label>

             <label>
            <input {...register('password')} type="password" placeholder='Пароль'/>
             {hasPasswordInputErro && (
                      <p className={s.error}>{errors.password?.message}</p>
                    )}
             </label>
             
            <Link href="/auth/register">
            Войти в аккаунт
            </Link>
            <button type='submit'>Зарегистрироваться</button>
         </form>
        </div>
    )
}