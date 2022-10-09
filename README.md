# Comic book button animation

A little experiment I did with react, trying to make a comic book like button animation. Inspired by Spider-man into the spider-verse movie.

What I learned making this project:
- fundamentals of react.js: components, imports, props, states, installing modules, framer motion
- css modules

---

<img src="https://github.com/eduardconstantin/Comic-book-button-anim/blob/main/anim/btngif.gif">

## Usage
``` javascript
import ComicButton from './components/ComicButton/ComicButton';

export default function App() {
  return (
    <div className='App'>
      <ComicButton buttonName='BUTTON' hoverBtnName='HOVER' />
    </div>
  );
}
```

## Steps to follow :scroll:

### Tip : Complete this process in GitHub (in your browser)

```mermaid
flowchart LR
    Fork[Fork the project]-->branch[Create a New Branch]
    branch-->Edit[Edit file]
    Edit-->commit[Commit the changes]
    commit -->|Finally|creatpr((Create a Pull Request))
    
 ```
 
 ### Star The Repository :star2:

## Props
* buttonName - string for button name
* hoverBtnName - string for hover button name

## Contributing
## Awesome contributors :star_struck:

<a href="https://github.com/cuttle-cards/cuttle/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=cuttle-cards/cuttle" />
</a>

<!-- ----Made with [contrib.rocks](https://contrib.rocks). -->