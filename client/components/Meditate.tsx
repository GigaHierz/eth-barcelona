import { useCallback, useEffect, useState } from 'react'
import { utils, BigNumber, ContractTransaction } from 'ethers'
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'
import { useNotification, Icon, Loading } from 'web3uikit'
import { TIconType } from 'web3uikit/dist/components/Icon/collection'
import {
  IPosition,
  notifyType
} from 'web3uikit/dist/components/Notification/types'

import ABI from '../config/abi.json'
import contractConfig from '../config/contract-config.json'
import { getContractAddress, checkChainIdIncluded } from '../utils/chain'
import { getProof, checkAllowlisted } from '../utils/allowlist'

type CustomErrors = {
  [key: string]: string
}

export default function Meditate () {
  const { maxSupply, saleType, gasToken, customErrors } = contractConfig

  const { isWeb3Enabled, account, chainId: chainIdHex } = useMoralis()

  const proof = getProof(account)
  const isAllowlisted = checkAllowlisted(account)
  const contractAddress = getContractAddress(chainIdHex)
  const isChainIdIncluded = checkChainIdIncluded(chainIdHex)

  const [saleState, setSaleState] = useState(0)
  const [mintPrice, setMintPrice] = useState(BigNumber.from(0))
  const [maxMintAmountPerTx, setMaxMintAmountPerTx] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)
  const [mintAmount, setMintAmount] = useState(1)

  const dispatch = useNotification()

  // allowlistMint() function
  const {
    fetch: allowlistMint,
    isFetching: isFetchingAM,
    isLoading: isLoadingAM
  } = useWeb3ExecuteFunction({
    abi: ABI,
    contractAddress: contractAddress,
    functionName: 'allowlistMint',
    params: {
      _mintAmount: mintAmount,
      _merkleProof: proof
    },
    msgValue: utils
      .parseEther(saleType.allowlistSale.mintPrice)
      .mul(mintAmount)
      .toString()
  })

  // publicMint() function
  const {
    fetch: publicMint,
    isFetching: isFetchingPM,
    isLoading: isLoadingPM
  } = useWeb3ExecuteFunction({
    abi: ABI,
    contractAddress: contractAddress,
    functionName: 'publicMint',
    params: {
      _mintAmount: mintAmount
    },
    msgValue: utils
      .parseEther(saleType.publicSale.mintPrice)
      .mul(mintAmount)
      .toString()
  })

  const { fetch: getSaleState } = useWeb3ExecuteFunction({
    abi: ABI,
    contractAddress: contractAddress,
    functionName: 'getSaleState'
  })

  const { fetch: getMintPrice } = useWeb3ExecuteFunction({
    abi: ABI,
    contractAddress: contractAddress,
    functionName: 'getMintPrice'
  })

  const { fetch: getMaxMintAmountPerTx } = useWeb3ExecuteFunction({
    abi: ABI,
    contractAddress: contractAddress,
    functionName: 'getMaxMintAmountPerTx'
  })

  const { fetch: getTotalSupply } = useWeb3ExecuteFunction({
    abi: ABI,
    contractAddress: contractAddress,
    functionName: 'totalSupply'
  })

  const updateUiValues = useCallback(async () => {
    const saleStateFromCall = (await getSaleState()) as number
    const mintPriceFromCall = (await getMintPrice()) as BigNumber
    const maxMintAmountPerTxFromCall = (await getMaxMintAmountPerTx()) as BigNumber
    const totalSupplyFromCall = (await getTotalSupply()) as BigNumber
    setSaleState(saleStateFromCall)
    setMintPrice(mintPriceFromCall)
    setMaxMintAmountPerTx(maxMintAmountPerTxFromCall.toNumber())
    setTotalSupply(totalSupplyFromCall.toNumber())
  }, [getMaxMintAmountPerTx, getMintPrice, getSaleState, getTotalSupply])

  useEffect(() => {
    if (isWeb3Enabled && isChainIdIncluded) {
      updateUiValues()

      // cleanup
      return () => {
        setSaleState(0)
        setMintPrice(BigNumber.from(0))
        setMaxMintAmountPerTx(0)
        setTotalSupply(0)
      }
    }
  }, [isChainIdIncluded, isWeb3Enabled, updateUiValues])

  function decrementMintAmount () {
    setMintAmount(Math.max(1, mintAmount - 1))
  }

  function incrementMintAmount () {
    setMintAmount(Math.min(maxMintAmountPerTx, mintAmount + 1))
  }

  function handleNotification (
    type: notifyType,
    message?: string,
    title?: string,
    icon?: TIconType,
    position?: IPosition
  ) {
    dispatch({
      type,
      message,
      title,
      icon,
      position: position || 'bottomR'
    })
  }

  async function handleOnSuccess (tx: ContractTransaction) {
    await tx.wait(1)
    updateUiValues()
    handleNotification(
      'success',
      'Successfully minted!',
      'Transaction Notification',
      'checkmark'
    )
  }

  function handleErrorMessage (error: Error) {
    const errNames = Object.keys(customErrors)
    const filtered = errNames.filter(errName => error.message.includes(errName))
    return filtered[0] in customErrors
      ? (customErrors as CustomErrors)[filtered[0]]
      : error.message
  }

  function handleOnError (error: Error) {
    handleNotification(
      'error',
      handleErrorMessage(error),
      'Transaction Notification',
      'xCircle'
    )
  }

  async function mint () {
    if (saleState === 0) return
    if (saleState === 1) {
      await allowlistMint({
        onSuccess: async tx => await handleOnSuccess(tx as ContractTransaction),
        onError: error => handleOnError(error)
      })
    }
    if (saleState === 2) {
      await publicMint({
        onSuccess: async tx => await handleOnSuccess(tx as ContractTransaction),
        onError: error => handleOnError(error)
      })
    }
  }

  return (
    <div className='bg-yellow-100 flex-row justify-content-center'>
      <button
        type='button'
        className={`rounded-full p-2 ${'bg-pink-800 cursor-default'}`}
        onClick={decrementMintAmount}
      >
        Start Meditating
      </button>
    </div>
  )
}
