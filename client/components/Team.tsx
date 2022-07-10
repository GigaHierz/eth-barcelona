import Image from 'next/image'

import Naomi from '../public/assets/naomi.jpg'
import K from '../public/assets/k.jpg'
import Lena from '../public/assets/Lena.jpeg'
import Angelica from '../public/assets/angelica.jpeg'
import { keccak256 } from 'ethers/lib/utils'

export default function Team () {
  return (
    <div className='text-center'>
      <h2 className='text-4xl mb-8'>Team</h2>

      <div className='sm:flex sm:justify-center space-y-8 sm:space-y-0 sm:space-x-8'>
        <div>
          <h3 className='text-pink-300 text-lg'>Naomi</h3>
          <div className='my-2'>
            <Image
              src={Naomi}
              alt='Naomi'
              width={150}
              height={150}
              className='rounded-full'
            />
          </div>
          <div>
            <a
              href='https://twitter.com/kjmczk'
              rel='noopener noreferrer'
              target='_blank'
              className='text-blue-500 hover:text-blue-400'
            >
              <span className='bg-pink-900 rounded-full px-4 py-2'>
                @schetty
              </span>
            </a>
          </div>
        </div>

        <div>
          <h3 className='text-pink-300 text-lg'>K</h3>
          <div className='my-2'>
            <Image
              src={K}
              alt='Koji Mochizuki'
              width={150}
              height={150}
              className='rounded-full'
            />
          </div>
          <div>
            <a
              href='https://twitter.com/kjmczk'
              rel='noopener noreferrer'
              target='_blank'
              className='text-blue-500 hover:text-blue-400'
            >
              <span className='bg-pink-900 rounded-full px-4 py-2'>
                @rabbitdark0
              </span>
            </a>
          </div>
        </div>

        <div>
          <h3 className='text-pink-300 text-lg'>Angelica</h3>
          <div className='my-2'>
            <Image
              src={Angelica}
              alt='Koji Mochizuki'
              width={150}
              height={150}
              className='rounded-full'
            />
          </div>
          <div>
            <a
              href='https://twitter.com/kjmczk'
              rel='noopener noreferrer'
              target='_blank'
              className='text-blue-500 hover:text-blue-400'
            >
              <span className='bg-pink-900 rounded-full px-4 py-2'>
                @angie_pnz
              </span>
            </a>
          </div>
        </div>
        <div>
          <h3 className='text-pink-300 text-lg'>Lena</h3>
          <div className='my-2'>
            <Image
              src={Lena}
              alt='Koji Mochizuki'
              width={150}
              height={150}
              className='rounded-full'
            />
          </div>
          <div>
            <a
              href='https://twitter.com/kjmczk'
              rel='noopener noreferrer'
              target='_blank'
              className='text-blue-500 hover:text-blue-400'
            >
              <span className='bg-pink-900 rounded-full px-4 py-2'>
                @GigaHierz
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
