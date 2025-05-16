import { useTranslation } from "react-i18next"
const HelloSection = () => {
  const { t } = useTranslation()
  return (
    <>
      <div className="md:w-5/12 flex flex-col items-center justify-center bg-[#03091E] p-8 md:p-12 text-center text-white">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{t('register.helloFriend')}</h1>
          <p className="text-lg leading-relaxed">
           {t('register.toKeepConnected')}
          </p>
        </div>
    </>
  )
}

export default HelloSection
