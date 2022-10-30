import {useEffect, useLayoutEffect, useState, useRef} from "react"
import ComicButton from "../ComicButton/ComicButton"
import style from "./GithubStargazers.module.css"

function GithubStargazers() {
  const [stars, setStars] = useState<number | null>(null);
  const ghStargazersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (stars!=null) return
    fetchStars().then((ghStars) => setStars(ghStars))
  }, [stars])

  // layoutEffect will avoid cases when button might be visible without
  // the icon for a brief duration due to how useEffect works.
  useLayoutEffect(() => {
    if (!ghStargazersRef.current) return
    addGithubIcon(ghStargazersRef.current, style.ghStarBtn, style.ghIcon)
  }, [stars])

  return  (
    <div ref={ghStargazersRef} className="ghStargazers">
      <a href="https://github.com/eduardconstantin/Comic-book-button-anim">
        {stars != null ? 
          <ComicButton
            buttonName={"stars: " + stars}
            hoverBtnName="source"
            btnClassName={style.ghStarBtn}
            handleButtonClick={()=> {}}
          />
          : null
        }
      </a>
    </div>
  )
}

async function fetchStars(): Promise<number | null> {
  const url = "https://api.github.com/repos/eduardconstantin/Comic-book-button-anim"
  let resp 
  try {
    resp = await fetch(url, {
      headers: {
        "Accept": 'application/vnd.github+json',
      },
    })
  } catch(e) {
    console.warn("could not fetch star count")
    return null
  }

  if (!resp.ok) {
    console.warn("could not fetch star count")
    return null
  }
  let data = await resp.json() as GithubResp
  return data["stargazers_count"] ?? null
}

/**
 * 
 * @param compEl GithubStargazers component 
 * @param btnClassName ComicButton className to find its node
 * @param iconClassName icon's className for additional styling
 */

function addGithubIcon(compEl: HTMLElement, btnClassName: string, iconClassName?: string) {
  // dont add icon if already added incase Effect runs again
  if(compEl.dataset.iconAdded) return

  const btnEl = compEl.querySelector("." + btnClassName)
  if (!btnEl) return

  const iconImg = document.createElement("img")
  iconImg.src = "github.png";
  iconImg.alt = "github icon"
  if(iconClassName) iconImg.classList.add(iconClassName);

  btnEl.insertBefore(iconImg, btnEl.firstChild)
  // hints icon is added
  compEl.dataset.iconAdded = "1"
}


interface GithubResp {
  ["stargazers_count"]: number,
  [key: string]: any
}

export default GithubStargazers
