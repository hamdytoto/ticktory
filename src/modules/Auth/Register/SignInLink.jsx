import { Link } from 'react-router-dom'
import {useTranslation} from 'react-i18next'
const SignInLink = () => {
    const { t } = useTranslation()
    return (
        <>
            <div className="mt-4 text-center">
                <span className="text-gray-600">{t('register.alreadyHaveAccount')} </span>
                <Link to="/auth/login" className="text-blue-600 font-semibold hover:underline">
                    {t('register.signIn')}
                </Link>
            </div>
        </>
    )
}

export default SignInLink
