
import { NFTLayout } from "@/components/04_biomes/nft/NFTDetailLayout";
import { ExplorerApi } from "atomicassets";
import { ITemplate } from "atomicassets/build/API/Explorer/Objects";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { cache } from 'react'
import { Metadata } from "next";

const getItem = cache(async (templateId: string):Promise<ITemplate> => {
  const api = new ExplorerApi(process.env.ATOMIC_ENDPOINT!, "atomicassets", { fetch: fetch as any, });
  return api.getTemplate('12daysb4xmas',templateId)
  
})

type NFTPageProps = {
  params: {
    templateId:string  
  }
}

export const metadata: Metadata = {
  title: 'Gift Crypto Not Cash by Metal Pay',
  description: 'Discover a new way of gifting at GiftCryptoNotCash.com. Metal Pay simplifies crypto gifting this holiday season with an easy, six-step process and compliant trading. Embrace the spirit with free trading on select tokens daily until December 25th.',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    type:'website',
    images: '/og_image.png',
    title: 'Gift Crypto Not Cash by Metal Pay',
    description:'Discover a new way of gifting at GiftCryptoNotCash.com. Metal Pay simplifies crypto gifting this holiday season with an easy, six-step process and compliant trading. Embrace the spirit with free trading on select tokens daily until December 25th. '
  },
}

export default async function NFTPage({params}:NFTPageProps) {
  const data = await getItem(params.templateId);
  return (
    <>
    <main className="grid grid-cols-1 gap-8 md:pb-8 mx-8" >
      
      <div className="container grid grid-cols-2 py-8 pt-12 ">
        <div className="flex justify-start">
          <Image alt="Metal Pay logo" src="/brand_logo.png" width={210} height={36}></Image>
        </div>
          <Link href={"https://giftcryptonotcash.com/"}>
        <div className="flex justify-end items-center">
            <p className="font-bold underline">
              12 Days of Free Trading 
            </p>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
        </div>
          </Link>
      </div>
      <NFTLayout template={data} ipfsResolver={process.env.NEXT_PUBLIC_IPFS_ENDPOINT!}></NFTLayout>
      <div className="container divider"></div> 
      <div className="container grid justify-items-center grid-col-1 gap-8">
        <Image alt="Metallicus logo" src="/footer_brand_logo.png" width={130} height={34}></Image>
        <p className="text-center text-xs">
          Metal Pay is a service of Metallicus, Inc., a licensed provider of money transfer services (NMLS ID: 2057807).
          All money transmission is provided by Metallicus, Inc. pursuant to Metallicus, Inc.’s licenses. © 2023 Metallicus, Inc. License issued to Metallicus by the Louisiana Office of Financial Institutions does not cover the exchange or transmission of virtual currency. All money transmission is provided by Metallicus, Inc. pursuant to Metallicus, Inc.@&lsquo;s licenses and/or the applicable law depending on the jurisdiction
        </p>
      </div> 
      <div className="overlay"></div>
      </main>
      </>
  )
}
