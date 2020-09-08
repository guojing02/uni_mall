export function debounce(func,delay){
  let timer = null
  return function(...args){
	  let that = this
    if(timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(that,args)
    },delay)
  }
}
