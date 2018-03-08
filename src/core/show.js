import smSlider from 'sm-slider';
import { ESC_KEY } from './constants';
import hide from './hide';
import once from '../utils/event-listener-once';

export default ($element, store) => {
    let { mainSlider, thumbSlider } = store.getState();
    const { $shadow, $closer, $wrapper, $group, $thumbGroup, options } = store.getState();
    const index = $element.getAttribute('data-lightbox-index');

    $shadow.style.display = 'inherit';
    $wrapper.classList.remove('hidden');

    once($shadow, 'transitionend', () => $group.classList.remove('hidden'));
    once($shadow, 'click', hide.bind(undefined, store));
    once(document, 'keydown', event => event.keyCode === ESC_KEY && hide(store));

    window.requestAnimationFrame(() => $shadow.classList.remove('lightbox-shadow--hidden'));

    if (options.showCloseButton) {
        once($closer, 'click', hide.bind(undefined, store));
        window.requestAnimationFrame(() => $closer.classList.remove('lightbox-shadow--closer-hidden'));
    }

    if (!mainSlider) {
        mainSlider = new smSlider($group, options.mainSlider);
        mainSlider.toSlide(index);

        if (options.showThumbSlider) {
            thumbSlider = new smSlider($thumbGroup, options.thumbSlider);
        }

        store.setState({
            mainSlider,
            thumbSlider
        });
    } else {
        mainSlider.toSlide(index);
    }
}
