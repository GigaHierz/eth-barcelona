import Head from 'next/head'
import Image from 'next/image'
import { NextPage } from 'next'

import Layout from '../components/Layout'
import Prose from '../components/Prose'
import Mint from '../components/Mint'
import Meditate from '../components/Meditate'
import Faq from '../components/Faq'
import Team from '../components/Team'
import Roadmap from '../components/Roadmap'
import topImage from '../public/assets/banner1.jpg'
import contractConfig from '../config/contract-config.json'

const Home: NextPage = () => {
  const { nftName } = contractConfig

  return (
    <Layout>
      <Head>
        <title>{nftName}</title>
      </Head>

      <Image src={topImage} alt={nftName} />

      <div className='bg-yellow-400 py-16'>
        <Prose>
          <h1 className='text-5xl font-bold mb-4'>{nftName}</h1>

          <p className='text-xl'>
            Meditation Farming is an App to increase the wellbeing of our
            community through incentivising people and whole communities to
            meditate.
          </p>
        </Prose>
      </div>

      <div className='py-16 bg-yellow-100'>
        <Prose>
          <Mint />
        </Prose>
      </div>

      <div className='py-16 bg-yellow-100'>
        <Prose>
          <Meditate />
        </Prose>
      </div>

      {/* <div className='bg-pink-800 py-16'>
        <Prose>
          <Faq />
        </Prose>
      </div>

      <div className='py-16'>
        <Prose>
          <Roadmap />
        </Prose>
      </div> */}

      <div className='bg-pink-800 py-16'>
        <Prose>
          <Team />
        </Prose>
      </div>
    </Layout>
  )
}

export default Home
