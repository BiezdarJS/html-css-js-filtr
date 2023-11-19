// CLICK + SELECT

// po click/change chcę żeby zmieniały się boxy na dole
class SetActiveBoxes {

    constructor() {
        this.isotope = this.init();
        // BUTTONY
        const buttonLinks = document.querySelectorAll('.cat-list__link');
        Array.from(buttonLinks).forEach(item => {
            item.addEventListener('click', (event) => this.changeActiveBoxes(event));
        });
        // SELECT
        const selectLinks = document.querySelector('.realizacje-select');
        selectLinks.addEventListener('change', (event) => this.changeActiveBoxes(event));
    }

    init() {
        return new Isotope( '.projects-list', {
            itemSelector: '.projects-list__item',
            layoutMode: 'fitRows',
            percentPosition: true,
            fitRows: {
                    gutter: 32
            }
        });
    }

    changeActiveBoxes(event) {
        let filterValue;
        if (event.currentTarget.classList.contains('realizacje-select')) {
            filterValue = event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('data-filter');
        } else {
            filterValue = event.currentTarget.getAttribute('data-filter');
        }
        this.isotope.arrange({ filter: filterValue });
    }

}


// dodawanie styli do Boxów
class SetActiveLinks extends SetActiveBoxes {
    
    constructor() {
        super();
        // BUTTONY
        const buttonLinks = document.querySelectorAll('.cat-list__link');
        Array.from(buttonLinks).forEach(item => {
            item.addEventListener('click', (event) => this.setCheckedClass(event));
        });
        // SELECT
        const selectLinks = document.querySelector('.realizacje-select');
        selectLinks.addEventListener('change', (event) => this.changeActiveBoxes(event));
    }

    setCheckedClass(event) {
        // tu też trzeba index
        let idx;
        const buttonLinks = document.querySelectorAll('.cat-list__link');
        Array.from(buttonLinks).forEach(item => {
            item.classList.remove('is-checked');
        });
        if (event.currentTarget.classList.contains('realizacje-select')) {
            filterValue = event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('data-filter');
        } else {
            event.currentTarget.classList.add('is-checked');
        }

    }
}



// jak teraz sprawić aby kiedy zmieniam jeden element to zmieniał się też drugi ?

class SetOtherLinkToActive extends SetActiveLinks {

    constructor() {
        super();
        // BUTTONY
        const buttonLinks = document.querySelectorAll('.cat-list__link');
        Array.from(buttonLinks).forEach(item => {
            item.addEventListener('click', (event) => this.setOtherLinkToActive(event));
        });
        // SELECT
        const selectLinks = document.querySelector('.realizacje-select');
        selectLinks.addEventListener('change', (event) => this.setOtherLinkToActive(event));
    }

    setOtherLinkToActive(event) {
        let idx;
        let currentElement;
        if (event.currentTarget.classList.contains('realizacje-select')) {
            currentElement = event.currentTarget.options[event.currentTarget.selectedIndex];
            idx = Array.prototype.indexOf.call(currentElement.parentNode.children, currentElement);
            // BUTTONY
            const buttonLinks = document.querySelectorAll('.cat-list__link');
            Array.from(buttonLinks).forEach(item => {
                item.classList.remove('is-checked');
            });
            buttonLinks[idx].classList.add('is-checked');
        } else {
            currentElement = event.currentTarget.parentNode;
            idx = Array.prototype.indexOf.call(currentElement.parentNode.children, currentElement);
            const allOptions = document.querySelectorAll('.cat-list__link-js2');
            Array.from(allOptions).forEach(item => {
                item.selected = false;
            });
            allOptions[idx].selected = true;
        }
    }

}

const initApp = new SetOtherLinkToActive();