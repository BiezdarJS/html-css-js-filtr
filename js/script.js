class ProjectsFilter {


  constructor() {
    this.isotope = this.isotopeInit();
    this.setActiveBoxesInit();
    this.setCheckedClassInit();
    this.setOtherLinkToActiveInit();
  }

  /*
  * ISOTOPE INIT
  */
  isotopeInit() {
    return new Isotope( '.projects-list', {
        itemSelector: '.projects-list__item',
        layoutMode: 'fitRows',
        percentPosition: true,
        fitRows: {
                gutter: 32
        }
    });
  }

  /*
  * SET ACTIVE BOXES
  */
  setActiveBoxesInit() {
    // Buttony
    const buttonLinks = document.querySelectorAll('.cat-list__link');
    Array.from(buttonLinks).forEach(item => {
        item.addEventListener('click', (event) => this.setActiveBoxes(event));
    });
    // Select
    const selectLinks = document.querySelector('.realizacje-select');
    selectLinks.addEventListener('change', (event) => this.setActiveBoxes(event));
  }
  setActiveBoxes() {
    let filterValue;
    if (event.currentTarget.classList.contains('realizacje-select')) {
        filterValue = event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('data-filter');
    } else {
        filterValue = event.currentTarget.getAttribute('data-filter');
    }
    this.isotope.arrange({ filter: filterValue });
  }

  /*
  * ADD STYLES TO BOXES
  */
  setCheckedClassInit() {
    // Buttony
    const buttonLinks = document.querySelectorAll('.cat-list__link');
    Array.from(buttonLinks).forEach(item => {
        item.addEventListener('click', (event) => this.setCheckedClass(event));
    });
    // Select
    const selectLinks = document.querySelector('.realizacje-select');
    selectLinks.addEventListener('change', (event) => this.changeActiveBoxes(event));
  }
  setCheckedClass(event) {
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

  /*
  * SET OTHER LINK TO ACTIVE
  */
  setOtherLinkToActiveInit() {
    // Buttony
    const buttonLinks = document.querySelectorAll('.cat-list__link');
    Array.from(buttonLinks).forEach(item => {
        item.addEventListener('click', (event) => this.setOtherLinkToActive(event));
    });
    // Select
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


const initApp = new ProjectsFilter();
