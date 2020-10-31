window.addEventListener('DOMContentLoaded', () => {

    class PhotoItem {
        constructor(url, alt, srcDownload, srcSmall, srcFullscreen, authorName, authorPage, counter) {
            this.parent = document.querySelectorAll('.main__photos');
            this.pageIndex = 1;
            this.url = `https://api.pexels.com/v1/curated?page=`;
            this.searchURL = 0;
            this.key = '563492ad6f917000010000016afa1c811bb44f909546a673c92caebd';
            this.counter = 0;
            this.inputSearch = document.querySelector('form');
            this.inputSearch.setAttribute('data-load', 'base');
            this.localSelected = JSON.parse(localStorage.getItem('data'));
            this.searchHistory = JSON.parse(localStorage.getItem('data'));
            this.getImage(this.url);
            this.staticEventHandler();
        }
        render(data) {
            // console.log(data);
            data.photos.forEach(item => {
                const element = document.createElement('div');
                element.classList.add('item');
                if (this.counter === 3) {
                    this.counter = 0;
                }
                // console.log(item);
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
                                <img data-fullscreen="${item.src.large}" src="assets/img/fullscreen.svg" alt="fullscreen">
                            </div>
                        </div>
                    </div>
                    `;
                    this.parent[this.counter].append(element);
                    ++this.counter;
                    this.dynamicEventHandler(element);
            });
            // this.dynamicEventHandler();
        }

        async queryBase(url) {
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

        async getImage(url) {
            const data = await this.queryBase(url);
            this.render(data);
        }

        dynamicEventHandler(element) {
            // Img item Handler
            
            const itemHandler = (e, element) => {
                if (e.target.id === 'selected') {
                    console.log('yes');
                    this.saveSelect(element);
                }
            };
            element.addEventListener('click', (e) => itemHandler(e, element));
        }

        saveSelect(element) {
            let src = element.querySelector('.main__img').getAttribute('src'),
                alt = element.querySelector('.main__img').getAttribute('alt'),
                authorPage = element.querySelector('a').getAttribute('href'),
                authorName = element.querySelector('span').textContent;

            let data = {
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
            };
            console.log(this.localSelected = JSON.parse(localStorage.getItem('data')));
            if (JSON.parse(localStorage.getItem('data'))) {
                this.localSelected = JSON.parse(localStorage.getItem('data'));
            } else {
                this.localSelected = localStorage.setItem('data', JSON.stringify({photos:[]}));
                this.localSelected = JSON.parse(localStorage.getItem('data'));
            }

            if (this.localSelected.photos.find(item => item.id == alt)) {
                this.localSelected.photos.splice(this.localSelected.photos.findIndex(item => item.id == alt), 1);
                    if (this.inputSearch.getAttribute('data-load') === 'selected') {
                        element.remove();
                    }   
                localStorage.setItem('data', JSON.stringify(this.localSelected));
                console.log('delete');
            } else {
                let long = this.localSelected.photos.length;
                this.localSelected.photos[long] = data.photos[0];
                localStorage.setItem('data', JSON.stringify(this.localSelected));
                console.log('add');
            }
            
        }
        
        staticEventHandler() {
            //Menu

            const menu = document.querySelectorAll('li');
            const searchBtn = document.querySelector('.header__search');
            const menuSelected = (e) => {
                const target = e.target;
                if (target.dataset.menu === '0') {
                    hideActive();
                    searchBtn.classList.remove('header__search-active');
                    e.target.classList.add('header__item-active');
                    this.inputSearch.setAttribute('data-load', 'base');
                    
                    this.clearHTML();
                    this.getImage(this.url);
                }
                if (target.dataset.menu === '1') {
                    hideActive();
                    e.target.classList.add('header__item-active');
                    searchBtn.classList.toggle('header__search-active');
                    
                    if (this.inputSearch.getAttribute('data-load') === 'search') {
                        this.inputSearch.setAttribute('data-load', 'base');
                    } else {
                        this.inputSearch.setAttribute('data-load', 'search');
                    }
                }
                if (target.dataset.menu === '2') {
                    hideActive();
                    e.target.classList.add('header__item-active');
                    this.inputSearch.setAttribute('data-load', 'selected');
                    this.clearHTML();
                    this.counter = 0;
                    this.render(this.localSelected);
                }
                if (target.dataset.menu === '3') {
                    hideActive();
                    e.target.classList.add('header__item-active');
                }
            };

            function hideActive() {
                menu.forEach((item, e, l) =>  {
                    item.firstElementChild.classList.remove('header__item-active');
                });
            }
            
            menu.forEach(item => {
                item.addEventListener('click', menuSelected);
            });


            // UploadImage
            const uploadingImage = () => {
                // e.preventDefault();
                // window.removeEventListener('scroll', uploadingImage);
                if (window.pageYOffset + document.documentElement.clientHeight + 100>= document.documentElement.scrollHeight) {
                    const loadAtrib = this.inputSearch.getAttribute('data-load');
                    if (loadAtrib === 'base') {
                        this.pageIndex = ++this.pageIndex;
                        this.getImage(this.url + this.pageIndex);
                        console.log(this.url + this.pageIndex);
                        // this.button.removeEventListener('submit', uploadingImage);
                    } else if (loadAtrib === 'search') {
                        this.pageIndex = ++this.pageIndex;
                        this.getImage(this.searchURL + this.pageIndex);
                        console.log(this.searchURL + this.pageIndex);
                        // this.button.removeEventListener('submit', uploadingImage);
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
              let searchValue = document.querySelector('input');
              localStorage.setItem('searchHistory', JSON.stringify(searchValue.value));
              this.searchURL = `https://api.pexels.com/v1/search?query=${searchValue.value}&page=`;
              console.log(this.searchURL, searchValue.value);
              this.getImage(this.searchURL + this.pageIndex);
            //   this.inputSearch.removeEventListener('submit', search);
              // this.button.removeEventListener('submit', uploadingImage);
            };
            this.inputSearch.addEventListener('submit', search);

            

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


    const menu = document.querySelectorAll('ul');


});