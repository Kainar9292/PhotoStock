window.addEventListener('DOMContentLoaded', () => {
    class PhotoItem {
        constructor() {
            this.wrapper = document.querySelector('.main__wrapper');
            this.pageIndex = 1;
            this.url = `https://api.pexels.com/v1/curated?page=`;
            this.searchURL = 0;
            this.key = '563492ad6f917000010000016afa1c811bb44f909546a673c92caebd';
            this.counter = 0;
            this.inputSearch = document.querySelector('form');
            this.inputSearch.setAttribute('data-load', 'base');
            this.searchValue = document.querySelector('input');
            this.localSelected = localStorage.getItem('data') != null ? JSON.parse(localStorage.getItem('data')) : undefined;
            this.searchHistory = localStorage.getItem('searchHistory') != null ? JSON.parse(localStorage.getItem('searchHistory')) : undefined;
            this.historyHeader = document.querySelector('.header__history');
            // window.onresize = () => window.location.reload();
            this.staticEventHandler();
            // this.getImage(this.url);
        }

        // generate HTML img
        render(data) {
            data.photos.forEach(item => {
                const element = document.createElement('div');
                if (this.counter === this.counterMax) {this.counter = 0;}
                element.innerHTML = `
                    <div class="main__item">
                        <img class="main__img" src="${item.src.large}" alt="${item.id}">
                        <div class="main__icon">
                            <a class="main__author" href="${item.photographer_url}">Автор: <span>${item.photographer}</span></a>
                            <div class="icon__img">
                                <a class="main__download" href="https://www.pexels.com/photo/${item.id}/download" rel="noopener">
                                    <svg fill="#C0C0C0" xmlns = "http://www.w3.org/2000/svg" width = "40" height = "40" viewBox = "0 0 30 30">
                                        <g><path d="M29.063 30h-1.407a.935.935 0 01-.937-.938c0-.519.418-.937.937-.937h1.407c.519 0 .937.418.937.938 0 .519-.418.937-.938.937zm0 0M2.344 30H.938A.935.935 0 010 29.062c0-.519.418-.937.938-.937h1.406c.52 0 .937.418.937.938 0 .519-.418.937-.937.937zm0 0M24.375 30H5.625a.935.935 0 01-.938-.938c0-.519.418-.937.938-.937h18.75c.52 0 .938.418.938.938 0 .519-.418.937-.938.937zm0 0M15 25.988a2.694 2.694 0 01-1.906-.785l-7.899-7.898A3.248 3.248 0 014.242 15a3.229 3.229 0 013.234-3.242h.008c.88 0 1.735.351 2.348.969l1.887 1.886V3.281A3.286 3.286 0 0115 0a3.286 3.286 0 013.281 3.281v11.332l1.914-1.918a3.248 3.248 0 012.305-.953 3.229 3.229 0 013.242 3.234 3.335 3.335 0 01-.969 2.356l-7.867 7.871a2.694 2.694 0 01-1.906.785zM7.484 13.633H7.48c-.37 0-.714.14-.964.394a1.374 1.374 0 00-.399.973c0 .371.145.715.406.977l7.899 7.898a.82.82 0 001.16 0l7.867-7.867c.266-.27.418-.64.418-1.028 0-.37-.14-.714-.394-.964a1.374 1.374 0 00-.973-.399c-.371 0-.715.145-.977.406l-3.515 3.516a.936.936 0 01-1.602-.664V3.281a1.405 1.405 0 10-2.813 0v13.594a.936.936 0 01-1.6.664l-3.485-3.488a1.458 1.458 0 00-1.024-.418zm0 0"/>
                                        </g>
                                    </svg>
                                </a>
                                <i data-selected>
                                    <svg data-selected fill = "#C0C0C0" xmlns = "http://www.w3.org/2000/svg" width = "40" height = "40" viewBox = "0 0 30 30" >
                                        <path data-selected d="M27.852 4.215C26.437 2.832 24.48 2.14 21.98 2.14a6.69 6.69 0 00-2.113.359 8.452 8.452 0 00-2.008.973c-.62.406-1.152.789-1.597 1.144-.45.356-.871.735-1.274 1.137a15.235 15.235 0 00-1.27-1.137c-.448-.355-.98-.738-1.597-1.144a8.6 8.6 0 00-2.008-.973 6.713 6.713 0 00-2.117-.36c-2.5 0-4.457.692-5.871 2.075C.707 5.598 0 7.515 0 9.969c0 .75.133 1.52.395 2.308.261.793.558 1.47.894 2.028.332.554.715 1.097 1.137 1.629.422.53.734.894.93 1.097.195.2.347.344.457.434l10.44 10.07c.2.2.446.3.735.3.29 0 .535-.1.739-.3l10.421-10.039c2.551-2.55 3.829-5.062 3.829-7.527 0-2.453-.707-4.371-2.125-5.754zm-3.16 11.71l-9.704 9.352L5.27 15.91c-2.086-2.086-3.13-4.066-3.13-5.941 0-.903.122-1.7.36-2.39.242-.692.547-1.243.922-1.65a4.425 4.425 0 011.363-.995 6.002 6.002 0 011.57-.516 9.55 9.55 0 011.641-.137c.582 0 1.203.145 1.875.43.668.281 1.285.64 1.848 1.07.562.43 1.047.828 1.445 1.203.402.375.738.715 1.004 1.028.203.246.477.37.82.37.348 0 .621-.124.82-.37.27-.313.602-.653 1.005-1.028a19.44 19.44 0 011.445-1.203c.566-.43 1.18-.789 1.851-1.07.668-.285 1.293-.43 1.871-.43.582 0 1.13.047 1.641.137.512.086 1.04.262 1.574.516.535.257.989.59 1.364.996.37.406.68.957.918 1.648.242.692.359 1.488.359 2.39 0 1.876-1.047 3.86-3.145 5.958zm0 0"/>
                                    </svg>
                                </i>
                                <i data-screen>
                                    <svg data-screen fill="#C0C0C0" xmlns = "http://www.w3.org/2000/svg" width = "40" height = "40" viewBox = "0 0 30 30" >
                                        <g>
                                            <path data-screen d="M7.227 4.688h1.68a1.875 1.875 0 000-3.75H2.811c-1.035 0-1.874.84-1.874 1.875v6.093a1.875 1.875 0 003.75 0v-1.68l5.996 5.997a1.793 1.793 0 002.53-.008c.7-.7.704-1.828.009-2.531zm5.332 7.87a.853.853 0 01-1.211 0L4.55 5.763a.468.468 0 00-.8.332l-.001 2.812c0 .52-.418.938-.938.938a.935.935 0 01-.937-.938V2.812a.94.94 0 01.938-.937h6.093c.52 0 .938.418.938.938 0 .519-.418.937-.938.937H6.094a.468.468 0 00-.332.8l6.797 6.798a.853.853 0 010 1.21zm0 0M11.953 16.254a1.778 1.778 0 00-1.27.523l-5.995 5.996v-1.68a1.875 1.875 0 00-3.75 0v6.095c0 1.035.84 1.875 1.875 1.875h6.093a1.875 1.875 0 000-3.75h-1.68l5.997-5.997a1.793 1.793 0 00-1.27-3.062zm.606 2.398L5.762 25.45a.468.468 0 00.332.8l2.812.001c.52 0 .938.418.938.938 0 .519-.418.937-.938.937H2.812a.94.94 0 01-.937-.938v-6.093c0-.52.418-.938.938-.938.519 0 .937.418.937.938v2.812a.468.468 0 00.8.332l6.798-6.797a.853.853 0 011.21 0 .853.853 0 010 1.211zm0 0M27.188.938h-6.094a1.875 1.875 0 000 3.75h1.68l-5.997 5.996a1.793 1.793 0 00.008 2.53c.7.7 1.828.704 2.531.009l5.997-5.996v1.68a1.875 1.875 0 003.75 0V2.811c0-1.035-.84-1.874-1.875-1.874zm.937 7.968c0 .52-.418.938-.938.938a.935.935 0 01-.937-.938V6.094a.468.468 0 00-.8-.332l-6.798 6.797a.853.853 0 01-1.21 0 .853.853 0 010-1.211l6.796-6.797a.468.468 0 00-.332-.8l-2.812-.001a.935.935 0 01-.938-.938c0-.519.418-.937.938-.937h6.093a.94.94 0 01.938.938zm0 0M27.188 19.219c-1.036 0-1.875.84-1.875 1.875v1.68l-5.997-5.997a1.793 1.793 0 00-2.53.008c-.7.7-.704 1.828-.009 2.531l5.996 5.997h-1.68a1.875 1.875 0 000 3.75h6.095c1.035 0 1.875-.84 1.875-1.875v-6.094c0-1.035-.84-1.875-1.875-1.875zm.937 7.968a.94.94 0 01-.938.938h-6.093a.935.935 0 01-.938-.938c0-.519.418-.937.938-.937h2.812a.468.468 0 00.332-.8l-6.797-6.798a.853.853 0 010-1.21.853.853 0 011.211 0l6.797 6.796a.468.468 0 00.8-.332l.001-2.812c0-.52.418-.938.938-.938.519 0 .937.418.937.938zm0 0"/>
                                        </g>
                                    </svg> 
                                </i>
                            </div>
                        </div>
                    </div>
                    `;
                    this.parent[this.counter].append(element);
                    ++this.counter;
                    this.dynamicEventHandler(element);
            });
        }

        spinnerToHtml() {
            this.statusMessage = document.createElement('img');
            this.statusMessage.src = 'assets/img/spinner.svg';
            this.statusMessage.classList.add('main__spinner');
            const statusSpinner = document.querySelector('.main__spinner');
            console.log(Boolean(statusSpinner));
            if (!statusSpinner) {
                this.wrapper.insertAdjacentElement('afterend', this.statusMessage);
            } else {
                statusSpinner.remove();
            }
        }

        // fetch to DB Pexels
        async queryBase(url) {

            //spinner to Download 
            this.statusMessage = document.createElement('img');
            this.statusMessage.src = 'assets/img/spinner.svg';
            this.statusMessage.classList.add('main__spinner');
            const statusSpinner = document.querySelector('.main__spinner');
            if (statusSpinner) {
                statusSpinner.remove();
            }
            this.wrapper.insertAdjacentElement('afterend', this.statusMessage);

            //Fetch DB
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: this.key,
                }
            });

            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }
            return await res.json();
        }

        //get image in DB
        async getImage(url) {
            const data = await this.queryBase(url);
            this.render(data);

            //remove spinner
            this.statusMessage.remove();
        }

        //dynamical EventHandler
        dynamicEventHandler(element) {
            // Img item Handler
            const itemHandler = (e, element) => {
                if (e.target.getAttribute('data-selected') == '') {
                    this.saveSelect(element);
                }else if (e.target.getAttribute('data-screen') == "") {
                    this.fullscreenImg(element); 
                }
            };
            element.addEventListener('click', (e) => itemHandler(e, element));
        }

        //common variables for fullscreenImg() and saveSelect()
        pictureVariables(element) {
            this.src = element.querySelector('.main__img').getAttribute('src'),
            this.alt = element.querySelector('.main__img').getAttribute('alt'),
            this.authorPage = element.querySelector('a').getAttribute('href'),
            this.authorName = element.querySelector('span').textContent;
        }

        // fullscreenImg on click
        fullscreenImg(element) {
            this.showModal.classList.toggle('show');
            this.selectFull = element;
            this.pictureVariables(element);
            document.querySelector('.main__fullscreen .main__download').setAttribute('href', `https://www.pexels.com/photo/${this.alt}/download`);
            document.querySelector('.main__size').src = this.src;
            document.querySelector('.main__fullscreen .main__author').setAttribute('href', this.authorPage);
            document.querySelector('.main__fullscreen span').textContent = this.authorName;
                //   imageModal.src = imageSize.getAttribute('src');
        }

        // save pictures to DB and remove is DB
        saveSelect(element) {
            this.pictureVariables(element);
            const data = {
                    photos: [
                        {
                            src: {
                                large: this.src
                            },
                            id: this.alt,
                            photographer_url: this.authorPage,
                            photographer: this.authorName
                        }
                    ]
                },
                firstData = {
                    photos: []
                };

            this.localSelected = this.localSelected || firstData;
                if (this.localSelected.photos.find(item => item.id == this.alt)) {
                    this.localSelected.photos.splice(this.localSelected.photos.findIndex(item => item.id == this.alt), 1);
                    if (this.inputSearch.getAttribute('data-load') === 'selected') {
                        element.remove();
                    }
                    localStorage.setItem('data', JSON.stringify(this.localSelected));
                    this.notifications('Удалено из избранных');
                } else {
                    let long = this.localSelected.photos.length;
                    this.localSelected.photos[long] = data.photos[0];
                    localStorage.setItem('data', JSON.stringify(this.localSelected));
                    this.notifications('Добавлено в избранное');
                }
        }


        // statical DB on page load
        staticEventHandler() {
            //Menu
            const menu = document.querySelectorAll('li'),
                  searchBtn = document.querySelector('.header__search');
                  
            const generalFunc = (e, attrib) => {
                hideActive();
                e.target.classList.add('header__item-active');
                searchBtn.classList.remove('header__search-active');
                this.inputSearch.setAttribute('data-load', attrib);
                this.clearHTML();
            };

            const menuSelected = (e) => {
                const target = e.target;
                if (target.dataset.menu === '0') {
                    generalFunc(e, 'base');
                    this.getImage(this.url);
                } else if (target.dataset.menu === '1') {
                    hideActive();
                    e.target.classList.add('header__item-active');
                    searchBtn.classList.add('header__search-active');
                    
                    this.searchValue.focus();
                } else if (target.dataset.menu === '2') {
                    generalFunc(e, 'selected');
                    this.counter = 0;
                    if (JSON.parse(localStorage.getItem('data'))) {
                        this.render(this.localSelected);
                    }
                } else if (target.dataset.menu === '3') {
                    generalFunc(e, 'history');
                    this.historySearch(100, this.parent, 'history-display');
                }
            };

            function hideActive() {
                menu.forEach(item => item.firstElementChild.classList.remove('header__item-active'));
            }
            
            menu.forEach(item =>item.addEventListener('click', menuSelected));


            // UploadImage to scroll
            const uploadingImage = () => {
                if (window.pageYOffset + document.documentElement.clientHeight + 100>= document.documentElement.scrollHeight) {
                    const loadAtrib = this.inputSearch.getAttribute('data-load');
                    if (loadAtrib === 'base') {
                        this.pageIndex = ++this.pageIndex;
                        this.getImage(this.url + this.pageIndex);
                    } else if (loadAtrib === 'search') {
                        this.pageIndex = ++this.pageIndex;
                        this.getImage(this.searchURL + this.pageIndex);
                    }

                    window.removeEventListener('scroll', uploadingImage);
                    setTimeout(() => {
                        window.addEventListener('scroll', uploadingImage);
                    }, 1500);
                }  
 
            };
            window.addEventListener('scroll', uploadingImage);

            //Search input
            const search = (e) => {
                e.preventDefault();
                this.inputSearch.setAttribute('data-load', 'search');
                this.clearHTML();
                let firstSearch = [];
                
                this.searchURL = `https://api.pexels.com/v1/search?query=${this.searchValue.value}&page=`;
                this.getImage(this.searchURL + this.pageIndex);

                // save massiv searchHistory
                this.searchHistory = this.searchHistory || [];
                this.searchHistory.push(this.searchValue.value);
                localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
                this.historySearch(11, this.historyHeader, 'history__item');
            };

            this.historyHeader.addEventListener('click', (e) => {
                if (e.target.className === 'history__item') {
                    this.searchValue.value = e.target.textContent;
                    this.searchValue.focus();
                }
            });

            this.inputSearch.addEventListener('submit', search);
            this.historySearch(11, this.historyHeader, 'history__item');

            // resize window
            const resize = (e) => {
                let changeCounter = this.counterMax;
                if (window.innerWidth >= 768) {this.counterMax = 3;} 
                else if (window.innerWidth > 575) {this.counterMax = 2;} 
                else if (window.innerWidth <= 575) {this.counterMax = 1;}
                if (changeCounter != this.counterMax) {
                    this.wrapper.innerHTML = '';
                    for (let i = 0; i < this.counterMax; i++) {
                        let element = document.createElement('div');
                        element.classList.add('main__photos');
                        this.wrapper.append(element);
                    }
                    this.parent = this.wrapper.querySelectorAll('.main__photos');
                    this.counter = 0;
                    this.inputSearch.setAttribute('data-load', 'base');
                    this.getImage(this.url);
                } 

            };

            window.addEventListener('resize', resize);
            resize();

            //event handler for opening fullscreen
            this.showModal = document.querySelector('.main__screen');
            this.showModal.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-close') == '') {
                    this.showModal.classList.toggle('show');
                } else if (e.target.getAttribute('data-selected') == '') {
                    this.saveSelect(this.selectFull);
                }
            });


            // active arrow when Scrolling
            const goTopBtn = document.querySelector('.back_to_top');

            function trackScroll() {
                const scrolled = window.pageYOffset,
                      coords = document.documentElement.clientHeight;

                if (scrolled > coords) {
                    goTopBtn.classList.add('back_to_top-show');
                } else {
                    goTopBtn.classList.remove('back_to_top-show');
                }
            }

            function backToTop() {
                if (window.pageYOffset > 0) {
                    window.scrollBy(0, -80);
                    setTimeout(backToTop, 15);
                }
            }

            window.addEventListener('scroll', trackScroll);
            goTopBtn.addEventListener('click', backToTop);

            // hamburger for mobile adaptation
            const menuHamburger = document.querySelector('.header__menu'),
                  hamburger = document.querySelector('.header__hamburger');

            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('header__hamburger-active');
                menuHamburger.classList.toggle('header__menu-active');
            });

            menu.forEach(item => {
                item.addEventListener('click', () => {
                    hamburger.classList.toggle('header__hamburger-active');
                    menuHamburger.classList.toggle('header__menu-active');
                });
            });

        }

        // generation of history from database to html
        historySearch(i, caseInsert, nameBlock) {
            if (this.inputSearch.getAttribute('data-load') === 'search') {this.historyHeader.innerHTML = '';}
            
            let num = 0;
            if (this.searchHistory) {
                this.searchHistory.forEach((item, key) => {
                    if (key > (this.searchHistory.length - i)) {
                        const element = document.createElement('div');
                        element.classList.add(nameBlock);
                        element.textContent = item;
                        if (num >= this.counterMax) {
                            num = 0;
                        }
                        if (caseInsert instanceof NodeList) {
                            caseInsert[num].append(element);
                            ++num;
                        } else {
                            caseInsert.append(element);
                        }
                    } 
                });
            }
        }

        // notifications when adding and removing images to favorites
        notifications(text) {
            const notiSource = document.querySelector('.notifications');
            notiSource.textContent = text;
            notiSource.classList.toggle('fade');
            setTimeout(() => notiSource.classList.toggle('fade'), 2000);
        }

        //clearing the html to load new data
        clearHTML() {
            this.parent.forEach(item => {
                item.innerHTML = '';
            });
            this.pageIndex = 1;
        }

    }

    new PhotoItem(); // triger
});