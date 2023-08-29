import Image from 'next/image';
import logo_devanews from '../../../public/images/logo.svg';
import { useState } from 'react';
import PublicInput from '@/components/publicInput';

export default function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault()
        setMessage(true)
        setDisabled(true)
        console.log('login - ' + login + ' e ' + 'password - ' + password)
        setTimeout(() => {
            setMessage(false)
            setDisabled(false)
        }, 500)
    }

    return (
        <div className="container_auth">
            <div className="logo">
                <Image src={logo_devanews} alt='Logo DevaNews' />
            </div>
            <div className='form'>
                <form onSubmit={onSubmit}>
                    <PublicInput
                        type='text'
                        text='Login'
                        value={login}
                        onChange={e => setLogin(e?.target.value)}
                        validationMessage="O login informado é inválido"
                        showValidationMessage={!login}
                    />
                    <PublicInput
                        type='password'
                        text='Senha'
                        value={password}
                        onChange={e => setPassword(e?.target.value)}
                        validationMessage="A senha informada é inválida"
                        showValidationMessage={!password}
                    />
                    <button disabled={disabled} className='primary'>{message ? '...carregando' : 'Entrar'}</button>
                </form>
            </div>
        </div>
    )
}