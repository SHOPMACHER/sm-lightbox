import Store from './utils/Store';

import show from './core/show';
import htmlToElement from 'html-to-element';

const has = Object.prototype.hasOwnProperty;

const _defaultOptions = {
    showThumbSlider: false,
    showCloseButton: true,
    darkBackground: 'rgba(0,0,0, 0.7)',
    mainSlider: {},
    thumbSlider: {}
};

export default class Lightbox {

    constructor($refs, group, options = {}) {
        const groupOptions = options[group];

        const $group = this.getSliderDom(group);
        const $thumbGroup = groupOptions.showThumbSlider ? this.getSliderDom(group, 'thumb') : null;
        const $shadow = htmlToElement(`<div id="lightbox-shadow--${group}" class="lightbox-shadow lightbox-shadow--hidden"></div>`);
        const $closer = htmlToElement(`<div id="lightbox-shadow--${group}-closer" class="lightbox-shadow--closer lightbox-shadow--closer-hidden"></div>`);
        const $wrapper = htmlToElement(`<div id="lightbox-wrapper--${group}" class="lightbox-wrapper hidden"></div>`);

        const initialState = {
            $wrapper,
            $group,
            $thumbGroup,
            $refs,
            $shadow,
            $closer,
            group,
            options: {
                ..._defaultOptions,
                ...groupOptions
            },
            mainSlider: null,
            thumbSlider: null
        };

        this.store = new Store(initialState, this.handleChange);

        document.body.appendChild($shadow);
        $shadow.style.background = initialState.options.darkBackground;

        if (initialState.options.showCloseButton) {
            $wrapper.appendChild($closer);
        }

        Array.prototype.forEach.call($refs, ($ref, index) => {
            const $slide = htmlToElement('<div class="slide"></div>');

            $slide.appendChild($ref.cloneNode(false));
            $group.querySelector('.slides').appendChild($slide);

            if ($thumbGroup) {
                const thumbnail = $ref.getAttribute('data-lightbox-thumbnail');

                if (thumbnail) {
                    const $thumbnail = htmlToElement(`<img src="${thumbnail}">`);
                    const $slideContainer = htmlToElement('<div class="slide"></div>');

                    $slideContainer.appendChild($thumbnail);
                    $thumbGroup.querySelector('.slides').appendChild($slideContainer);
                } else {
                    $thumbGroup.querySelector('.slides').appendChild($slide.cloneNode(true));
                }
            }

            $ref.addEventListener('click', show.bind(this, $ref, this.store));
            $ref.setAttribute('data-lightbox-index', index);
        });

        $wrapper.appendChild($group);
        if ($thumbGroup) {
            $wrapper.appendChild($thumbGroup);
        } else {
            $group.classList.add('lightbox-slider--no-thumb');
        }

        document.body.appendChild($wrapper);
    }

    getSliderDom(group, type = 'main') {
        return htmlToElement(`<div id="lightbox-slider--${group}-${type}" class="lightbox-slider lightbox-slider--${type} sm-slider cloaked">
                                        <div class="arrow-left hidden-mobile"></div>
                                        <div class="slides-wrapper">
                                            <div class="slides"></div>
                                        </div>
                                        <div class="arrow-right hidden-mobile"></div>
                                    </div>`);
    }

    handleChange() {
        console.log('update state');
    }

    static init(options) {
        const $images = document.querySelectorAll('[data-lightbox]');

        const groups = Array.prototype.reduce.call($images, (result, $image) => {
            const key = $image.getAttribute('data-lightbox');
            result[key] = has.call(result, key) ? result[key].concat($image) : [$image];

            return result;
        }, {});

        Object.keys(groups).forEach(key => new Lightbox(groups[key], key, options));
    }
}
