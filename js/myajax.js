let myHeaders = new Headers()
  myHeaders.append("Access-Control-Allow-Origin", "*")
  myHeaders.append("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With")
  myHeaders.append("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
  myHeaders.append("X-Powered-By",'3.2.1')

const fetchSetting = {
  headers:myHeaders,
  mode: 'cors',
  cache: 'default'
}

const $ajax = (params) => {
  return fetch(new Request(params.url, {...fetchSetting,method: params.type, data: params.data}));
}

export{$ajax} 
export default  $ajax