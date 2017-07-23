
export default function GetApiUrl (env, isClient, path) {
  if( isClient && env.generated ){
    return `${env.baseUrl}api/${path}.json`
  }
  return `${env.apiUrl}${path}`
}
