
export default function GetApiUrl (env, isClient, path) {
  let base = !env.generated ? env.apiUrl : `${env.baseUrl}api/`
  let suffix = isClient && env.generated ? '.json' : ''
  let fullUrl = `${base}${path}${suffix}`
  return fullUrl
}
