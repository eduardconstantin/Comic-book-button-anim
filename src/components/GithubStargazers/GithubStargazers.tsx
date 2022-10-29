import {useEffect, useState} from "react"

import ComicButton from "../ComicButton/ComicButton"

function GithubStargazers () {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    if (stars!=null) return
    fetchStars().then((ghStars) => setStars(ghStars))
  }, [stars])

  return  (
    <div className="ghStarCounter">
      <a href="https://github.com/eduardconstantin/Comic-book-button-anim">
        <ComicButton
          buttonName={"Stars" + " " + (stars ?? 0)}
          hoverBtnName={"Stars" + " " + (stars ?? 0)}
          handleButtonClick={()=> {}}
        />
      </a>
    </div>
  )
}

async function fetchStars() {
  const URL = "https://api.github.com/repos/eduardconstantin/Comic-book-button-anim"
  let data = await fetch(URL, {
    headers: {
      "Accept": 'application/vnd.github+json',
    },
  }).then(resp => resp.json()).catch(() => {})

  // console.log(data)
  return data["stargazers_count"] || null
}

export default GithubStargazers