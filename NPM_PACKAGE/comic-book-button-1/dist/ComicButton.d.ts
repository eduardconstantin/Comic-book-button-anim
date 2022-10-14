/// <reference types="react" />
interface ComicButtonProps {
    buttonName: string;
    hoverBtnName: string;
    focusBtnName: string;
}
declare function ComicButton({ buttonName, hoverBtnName, focusBtnName }: ComicButtonProps): JSX.Element;
declare namespace ComicButton {
    var defaultProps: {
        buttonName: string;
        hoverBtnName: string;
    };
}
export default ComicButton;
