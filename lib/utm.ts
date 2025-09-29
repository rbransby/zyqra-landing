export interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  ref?: string
}

export function parseUTMParams(searchParams: URLSearchParams): UTMParams {
  const params: UTMParams = {}
  
  const utmKeys: (keyof UTMParams)[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'ref'
  ]
  
  utmKeys.forEach(key => {
    const value = searchParams.get(key)
    if (value) {
      params[key] = value
    }
  })
  
  return params
}

export function getUTMParamsFromHeaders(headers: Headers): UTMParams {
  const referer = headers.get('referer')
  if (!referer) return {}
  
  try {
    const url = new URL(referer)
    return parseUTMParams(url.searchParams)
  } catch {
    return {}
  }
}

