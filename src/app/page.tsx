import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('HomePage');

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-center sm:text-left">
          {t('title')}
        </h1>
        <p>
          {t.rich('description', {
            gradient: (children) => (
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {children}
              </span>
            ),
          })}
        </p>
      </main>
      <div className="row-start-3">
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          width={100}
          height={24}
          priority
        />
      </div>
    </div>
  );
}
