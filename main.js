import './style.css'
import chuckNorrisImage from './src/images/chucknorris_logo_coloured_small.png'
import { jokes } from './src/components/jokes'
import { loader } from './src/components/loader'

document.querySelector('#app').innerHTML = `
  <header>
    <h1 class="flex items-center justify-center py-2 px-8">
        <a href="/" title="Chuck Norris Jokes Api - JSON API for random Chuck Norris jokes">
            <img alt="Chuck Norris Jokes Api - JSON API for random Chuck Norris jokes" src="${chuckNorrisImage}" class="max-w-full">
        </a>
    </h1>
  </header>
  
  <section>
    <div id="content" class="mx-auto max-w-xl px-5 pb-5">
      <p class="mt-4">
        Chuck Norris facts is a free website supplied by <a href="https://api.chucknorris.io" target="_blank">chucknorris.io</a> which shows funny facts about chuck norris memes.
      </p>
      <div class="mt-4 mb-12">
        <form name="search">
          <label for="find-field">Type in the field below and click find to show some jokes about your term</label>
          <div class="flex mt-2 relative flex-col">
            <input type="text" id="find-field" name="term" class="border flex-1 py-4 pl-2" placeholder="Type here">
            <p id="error-message" class="absolute hidden top-16 left-0 text-red-900">Type at least 3 characters</p>
            <div class="flex items-center justify-center gap-4 mt-8">
              <input type="submit" value="Search" class="p-4 bg-orange-500 transition-colors hover:bg-orange-700 cursor-pointer text-white">
              <input type="button" id="lucky" value="I'm feeling lucky" class="p-4  bg-orange-500 transition-colors hover:bg-orange-700 cursor-pointer text-white">
            </div>
          </div>
        </form>
      </div>
      <div class="mt-6" id="jokes">

      </div>
      <div class="mt-8" id="paginator">
          
      </div>
    </div>
  </section>
`

jokes()
loader()
