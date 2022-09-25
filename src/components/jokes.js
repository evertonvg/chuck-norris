import axios from "axios"
import { hideLoad,showLoad } from './loader'
export function jokes() {
  let form = document.forms.search;
  let loader = document.querySelector('#loader');
  const getJokes = async () => {
    showLoad()
    axios.get(`https://api.chucknorris.io/jokes/search?query=${form.term.value}`)
    .then((res)=>{
      console.log(res.data)
      document.querySelector('#jokes').innerHTML =  res.data.value
    })
    .catch(err=>{
      console.log(err)
    })
    .finally(()=>{
      hideLoad()
    })
    
  }

  form.addEventListener('submit',(ev)=>{
    ev.preventDefault()
    getJokes()
  })

}
