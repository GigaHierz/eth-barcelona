require('@nomiclabs/hardhat-waffle')

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
  networks: {
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/280d6313419b4ba28f3196871800d0fd',
      accounts: [
        'ef4ccaa9a703ab1e4185e4add3497429fa83670484d1aaae934a279480f93729'
      ] // add the account that will deploy the contract (private key)
    },
    testnet: {
      url: `https://matic-mumbai--rpc.datahub.figment.io/apikey/282a80479f5d2f29045a519f55315a37`,
      accounts: [
        `b6a061881268c9cb337b79484816e6187d63850d10c48e39990c5a3ea360be0d`
      ]
    }
  }
}
