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

## Props
* buttonName - string for button name
* hoverBtnName - string for hover button name

## Contributing
If you think you can make an improvement don't hesitate to open a pull request.
