import Lightbox from './Lightbox';
import './styles/main.less';

if (process.env.NODE_ENV === 'development') {
    const lightboxOptions = {
        group1: {
            showThumbSlider: true,
            darkBackground: 'red',
            mainSlider: {
                visibleSlides: 1,
                step: 1,
                infinite: true
            },
            thumbSlider: {
                visibleSlides: 4,
                step: 1,
                infinite: true
            }
        },
        group2: {
            showThumbSlider: true,
            showCloseButton: true,
            mainSlider: {
                visibleSlides: 1,
                step: 1,
                infinite: true
            },
            thumbSlider: {
                visibleSlides: 4,
                step: 1,
                infinite: true
            }
        }
    };

    Lightbox.init(lightboxOptions);
}

export default Lightbox;
