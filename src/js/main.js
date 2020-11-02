window.addEventListener('DOMContentLoaded', () => {

    class PhotoItem {
        constructor(url, alt, srcDownload, srcSmall, srcFullscreen, authorName, authorPage, counter) {
            this.wrapper = document.querySelector('.main__wrapper');
            this.pageIndex = 1;
            this.url = `https://api.pexels.com/v1/curated?page=`;
            this.searchURL = 0;
            this.key = '563492ad6f917000010000016afa1c811bb44f909546a673c92caebd';
            this.counter = 0;
            // this.counterMax = 3;
            this.inputSearch = document.querySelector('form');
            this.inputSearch.setAttribute('data-load', 'base');
            this.searchValue = document.querySelector('input');
            this.localSelected = JSON.parse(localStorage.getItem('data'));
            this.searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
            this.historyHeader = document.querySelector('.header__history');
            window.onresize = () => window.location.reload();
            this.staticEventHandler();
            this.getImage(this.url);
        }

        render(data) {
            data.photos.forEach(item => {
                const element = document.createElement('div');
                if (this.counter === this.counterMax) {this.counter = 0;}
                element.innerHTML = `
                    <div class="main__item">
                        <img class="main__img" src="${item.src.large}" alt="${item.id}">
                        <div class="main__icon">
                            <a href="${item.photographer_url}">Автор: <span>${item.photographer}</span> </a>
                            <div class="icon__img">
                                <a href="https://www.pexels.com/photo/${item.id}/download" rel = "noopener">
                                    <img src="assets/img/download.svg" alt="download">
                                </a>
                                <img id="selected" src="assets/img/heart_selected.svg" alt="selected">
                                <img id="fullscreen" data-fullscreen="${item.src.large}" src="assets/img/fullscreen.svg" alt="fullscreen">
                            </div>
                        </div>
                    </div>
                    `;
                    this.parent[this.counter].append(element);
                    ++this.counter;
                    this.dynamicEventHandler(element);
            });
        }

        async queryBase(url) {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    // Authorization: this.key,
                }
            });

            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }
            return await res.json();
        }

        async getImage(url) {
            const data = await this.queryBase(url);
            this.render(data);
        }

        dynamicEventHandler(element) {
            // Img item Handler
            
            const itemHandler = (e, element) => {
                if (e.target.id === 'selected') {this.saveSelect(element);}
                if (e.target.id === 'fullscreen') { }
            };
            element.addEventListener('click', (e) => itemHandler(e, element));
        }

        dataBaseCheck(localBase, nameBase, base) {
            if (JSON.parse(localStorage.getItem(nameBase))) {
                localBase = JSON.parse(localStorage.getItem(nameBase));
            } else {
                localBase = localStorage.setItem(nameBase, JSON.stringify(base));
                localBase = JSON.parse(localStorage.getItem(nameBase));
            }
        }

        fullscreenImg() {
            
        }

        saveSelect(element) {
            let src = element.querySelector('.main__img').getAttribute('src'),
                alt = element.querySelector('.main__img').getAttribute('alt'),
                authorPage = element.querySelector('a').getAttribute('href'),
                authorName = element.querySelector('span').textContent,
                data = {
                    photos: [
                        {
                            src: {
                                large: src
                            },
                            id: alt,
                            photographer_url: authorPage,
                            photographer: authorName
                        }
                    ]
                },
                firstData = {
                    photos:[]
                };
            
            
            this.dataBaseCheck(this.localSelected, 'data', firstData);
            if (this.localSelected.photos.find(item => item.id == alt)) {
                this.localSelected.photos.splice(this.localSelected.photos.findIndex(item => item.id == alt), 1);
                    if (this.inputSearch.getAttribute('data-load') === 'selected') {element.remove();}   
                localStorage.setItem('data', JSON.stringify(this.localSelected));
            } else {
                let long = this.localSelected.photos.length;
                this.localSelected.photos[long] = data.photos[0];
                localStorage.setItem('data', JSON.stringify(this.localSelected));
            }
        }
        
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
                    searchBtn.classList.toggle('header__search-active');
                    this.searchValue.focus();
                    if (this.inputSearch.getAttribute('data-load') === 'search') {
                        this.inputSearch.setAttribute('data-load', 'base');
                    } else {
                        this.inputSearch.setAttribute('data-load', 'search');
                    }
                } else if (target.dataset.menu === '2') {
                    generalFunc(e, 'selected');
                    this.counter = 0;
                    this.render(this.localSelected);
                } else if (target.dataset.menu === '3') {
                    generalFunc(e, 'history');
                    this.historySearch(100, this.parent, 'history-display');
                }
            };

            function hideActive() {
                menu.forEach(item => item.firstElementChild.classList.remove('header__item-active'));
            }
            
            menu.forEach(item =>item.addEventListener('click', menuSelected));


            // UploadImage
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
                this.clearHTML();
                let firstSearch = [];
                
                this.searchURL = `https://api.pexels.com/v1/search?query=${this.searchValue.value}&page=`;
                this.getImage(this.searchURL + this.pageIndex);

                // save massiv searchHistory

                this.dataBaseCheck(this.searchHistory, 'searchHistory', firstSearch);
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

            // this.historyHeader.addEventListener('click', this.historySearch);

            // resize window

            const resize = (e) => {
                if (window.innerWidth >= 768) {this.counterMax = 3;} 
                else if (window.innerWidth >= 450) {this.counterMax = 2;} 
                else if (window.innerWidth <= 450) {this.counterMax = 1;} 
                for (let i = 0; i < this.counterMax; i++) {
                    let element = document.createElement('div');
                    element.classList.add('main__photos');
                    this.wrapper.append(element);
                }
                this.parent = this.wrapper.querySelectorAll('.main__photos');
                this.counter = 0;
            };
            resize();
        }

        historySearch(i, caseInsert, nameBlock) {
            if (this.inputSearch.getAttribute('data-load') === 'search') {this.historyHeader.innerHTML = '';}
            
            let dbHistory = JSON.parse(localStorage.getItem('searchHistory')),
                num = 0;
            dbHistory.forEach((item, key) => {
                if (key > (dbHistory.length - i)) {
                    const element = document.createElement('div');
                    element.classList.add(nameBlock);
                    element.textContent = item;
                    if (num >= this.counterMax) {num = 0;}
                    if (caseInsert instanceof NodeList) {
                            caseInsert[num].append(element);
                            ++num;
                    } else {
                        caseInsert.append(element);
                    }                    
                }

            });
        }

        clearHTML() {
            this.parent.forEach(item => {
                item.innerHTML = '';
            });
            this.pageIndex = 1;
        }

    }


    const url = 'https://api.pexels.com/v1/curated?page=',
        API_KEY = '563492ad6f917000010000016afa1c811bb44f909546a673c92caebd';

    // new PhotoItem().render();
    new PhotoItem();



});