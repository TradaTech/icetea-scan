import { IceteaWeb3 } from "@iceteachain/web3";
// export default window.tweb3 = new IceTeaWeb3('http://localhost:3001/api');
export default (window.tweb3 = new IceteaWeb3(
  "wss://rpc.icetea.io/websocket"
));
