import { IceteaWeb3 } from '@iceteachain/web3'
// export default window.tweb3 = new IceTeaWeb3('http://localhost:3001/api');
// export default window.tweb3 = new IceteaWeb3('ws://localhost:26657/websocket')
export default window.tweb3 = new IceteaWeb3(process.env.REACT_APP_RPC)