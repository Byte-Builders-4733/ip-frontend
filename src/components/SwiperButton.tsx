import { useSwiper } from 'swiper/react';
import Button from './Button';

export default function SlideNextButton({shown=false, onClick}: {shown: boolean, onClick: Function}) {
	const swiper = useSwiper();

	const onButtonClick = () => {
		swiper.slideNext();
		onClick();
	}

	return <Button
		type="button" className={shown ? 'my-5' : 'hidden'}
		dark onClick={onButtonClick}
	>Далее</Button>
}