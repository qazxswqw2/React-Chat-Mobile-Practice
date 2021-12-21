/*
return route 
 */
export function getRedirectTo(type, header) {
  let path
  // type
  if(type==='laoban') {
    path = '/laoban'
  } else {
    path = '/dashen'
  }
  // header
  if(!header) { // no value, back to info
    path += 'info'
  }

  return path
}