import ComicButton from './components/ComicButton/ComicButton';

export default function App() {
	return (
		<div className='App'>
			<div className='buttonContainer'>
				<ComicButton buttonName='BUTTON' hoverBtnName='HOVER' focusBtnName='FOCUS' />
			</div>
		</div>
	);
}
