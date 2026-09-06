let btn = document.querySelector(".btn")
let input = document.querySelector("input")
let result = document.querySelector(".result")

async function getmovie() {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=1347b6e8&s=${encodeURIComponent(input.value.trim())}`)
        const data = await response.json()
        if (data.Response === "False") {
            return "false"
        }
        return data
    } catch (error) {
        console.log("ERROR : ", error)
        return "err"
    }
}

async function getextra(id) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=1347b6e8&i=${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log("ERROR : ", error)
        return "err"
    }
}

btn.addEventListener("click", async () => {
    result.classList.remove("err")
    result.classList.remove("resultafter")
    result.classList.add("resultbefore")
    result.textContent = "Loading....."
    if (input.value.trim() === "") {
        result.classList.add("err")
        result.textContent = "plese eneter valid movie name"
        return
    }
    // fetch movie data//
    let movieinfo = await getmovie()

    //for false movie//
    if (movieinfo === "false") {
        result.textContent = "Movie not found"
        result.classList.add("err")
        return
    }
    if (movieinfo === "err") {
        result.textContent = "something went wrong please check your internet connection"
        result.classList.add("err")
        return
    }

    try {
        result.textContent = ""
        result.classList.add("resultafter")
        result.classList.remove("resultbefore")
        for (let ind = 0; ind < movieinfo.Search.length; ind++) {

            // card create and apend//
            let moviecard = document.createElement("div")
            moviecard.classList.add("card")
            result.append(moviecard)

            //img create and append//
            let posterimg = document.createElement("img")
            posterimg.classList.add("poster")
            posterimg.setAttribute('onerror', "this.onerror=null; this.src='p.jpg';")
            moviecard.append(posterimg)

            // div container for text info create and append//
            let textcard = document.createElement("div")
            textcard.classList.add("textcard")
            moviecard.append(textcard)

            // titlearea create and append //
            let titlearea = document.createElement("div")
            textcard.append(titlearea)

            // yearshow area craete and append//
            let yeararea = document.createElement("div")
            textcard.append(yeararea)

            // date area//
            let datearea = document.createElement("div")
            textcard.append(datearea)

            //actor area //
            let actorarea = document.createElement("div")
            textcard.append(actorarea)

            //aboutarea//
            let aboutarea = document.createElement("div")
            textcard.append(aboutarea)

            //genearea//
            let genearea = document.createElement("div")
            textcard.prepend(genearea)

            // give value to img title all card items//
            let movie = movieinfo.Search[ind]
            //movie name//
            let title = movie.Title
            titlearea.textContent = "Movie : " + title;
            //movie year//
            let year = movie.Year
            yeararea.textContent = "YEAR : " + year;
            //movie poster//
            let poster = movie.Poster
            posterimg.src = poster

            // id get//
            let id = movie.imdbID
            let extrainfo = await getextra(id)
            let date = extrainfo.Released
            datearea.textContent = "RELEASED ON : " + date
            let actor = extrainfo.Actors
            actorarea.textContent = "ACTORS : " + actor
            let about = extrainfo.Plot
            aboutarea.classList.add("about")
            aboutarea.textContent = "ABOUT : " + about
            let gene = extrainfo.Genre
            genearea.innerHTML = `GENE : <button class="gene" type="button">${gene}</button>`;
        }
    } catch (error) {
        console.log("ERROR : ", error)
        return "Movie not found"
    }
    input.value = ""
})
