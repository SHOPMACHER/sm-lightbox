import scale from './scale';

export default ($container, store) => {
    const { options } = store.getState();

    Array.prototype.forEach.call($container, $element => {
        const type = $element.parentNode.classList.contains('lightbox-slider--main') ? 'main' : 'thumb';
        const limiter = type === 'thumb' && options.thumbSlider && options.thumbSlider.visibleSlides ? options.thumbSlider.visibleSlides : null;
        const $images = $element.querySelectorAll('img');
        const elementWidth = limiter ? $element.getBoundingClientRect().width / limiter : $element.getBoundingClientRect().width;
        const elementHeight = $element.getBoundingClientRect().height;

        Array.prototype.forEach.call($images, $image => {
            const imageSizes = scale($image, elementWidth, elementHeight);

            $image.style.width = imageSizes.width;
            $image.style.height = imageSizes.height;
        });
    });
}
