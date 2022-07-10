import Image from 'next/image'
import { useMoralis } from 'react-moralis'
import { ConnectButton, Icon } from 'web3uikit'

import Container from './Container'
import NextLink from './NextLink'
import Logo from '../public/assets/logo2.jpg'
import contractConfig from '../config/contract-config.json'
import { parseChainId, getContractAddress } from '../utils/chain'
import styles from '../styles/styling.module.scss'

export default function Header () {
  const { nftName } = contractConfig
  const { chainId: chainIdHex } = useMoralis()
  const contractAddress = getContractAddress(chainIdHex)

  return (
    <div className='sticky top-0 z-50'>
      <header className='bg-yellow-200 border-b py-4'>
        <Container>
          <div className='flex justify-between items-center'>
            <NextLink href='/' className='text-2xl font-bold text-white'>
              <span className='flex items-center'>
                <Image src={Logo} alt={nftName} width={100} height={60} />
              </span>
            </NextLink>

            <div className='flex items-center space-x-2 ml-2 sm:ml-0'>
              <div className='hidden lg:flex space-x-2'>
                <a
                  href={process.env.NEXT_PUBLIC_DISCORD_URL}
                  aria-label={`${nftName} on Discord`}
                  rel='noopener noreferrer'
                  target='_blank'
                  className='bg-yellow-700 hover:bg-yellow-600 rounded-full p-2'
                >
                  <Icon fill='#fff' svg='discord' />
                </a>
                <a
                  href={process.env.NEXT_PUBLIC_TWITTER_URL}
                  aria-label={`${nftName} on Twitter`}
                  rel='noopener noreferrer'
                  target='_blank'
                  className='bg-yellow-700 hover:bg-yellow-600 rounded-full p-2'
                >
                  <Icon fill='#fff' svg='twitter' />
                </a>
                <a
                  href={`${process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL}${
                    parseChainId(chainIdHex) !==
                    process.env.NEXT_PUBLIC_CHAIN_ID!.split(',')[1]
                      ? `/address/${contractAddress}`
                      : '/'
                  }`}
                  aria-label={`Contract of ${nftName}`}
                  rel='noopener noreferrer'
                  target='_blank'
                  className='bg-yellow-700 hover:bg-yellow-600 rounded-full p-2'
                >
                  <Icon fill='#fff' svg='eth' />
                </a>
              </div>

              <ConnectButton moralisAuth={false} />
            </div>
          </div>
        </Container>
      </header>
    </div>
  )
}
