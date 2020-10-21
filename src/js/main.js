window.addEventListener('DOMContentLoaded', () => {

    class PhotoItem {
        constructor(url, alt, srcDownload, srcSmall, srcFullscreen, authorName, authorPage, counter) {
            this.url = url;
            this.parent = document.querySelectorAll('.main__photos');
            this.url = 'https://api.pexels.com/v1/curated?per_page=12';
            this.key = '563492ad6f917000010000016afa1c811bb44f909546a673c92caebd';
            this.counter = 1;
            this.inputSearch = document.querySelector('form');
            this.pageIndex = 1;
        }
        render(data) {
            // console.log(data.photos);
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
                            <a href="${item.photographer_url}">Автор: ${item.photographer}</a>
                            <div class="icon__img">
                                <a href = "${item.src.original}" download="1.jpg" rel="noopener">
                                    <img data-download="${item.src.original}" src="assets/img/download.svg" alt="download">
                                </a>
                                <img data-heart="${item.src.large}" src="assets/img/heart_selected.svg" alt="selected">
                                <img data-fullscreen="${item.src.large}" src="assets/img/fullscreen.svg" alt="fullscreen">
                            </div>
                        </div>
                    </div>
                    `;
                    this.parent[this.counter].append(element);
                    ++this.counter;
            });
            this.eventHandler();
        }

        async queryBase(url) {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: this.key
                }
            });

            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }
            return await res.json();
        }

        async getImage(url) {
            const data = await this.queryBase(`${url}`);
            this.render(data);
        }

        eventHandler() {
            //First start
            // document.addEventListener('DOMContentLoaded', () => {
            //     this.getImage(1);
            // });

            //Img item Handler
            const img = document.querySelectorAll('.main__item');
                img.forEach(element => {
                    element.addEventListener('mouseover', () => {
                        console.log(element);
                        element.querySelector('.main__icon').style.bottom = 0 + 'px';
                    });
                });
                img.forEach(element => {
                    element.addEventListener('mouseout', () => {
                        element.querySelector('.main__icon').style.bottom = '-55' + 'px';
                    });
                });

            //Search Handler
            this.inputSearch.addEventListener('submit', (e) => {
                e.preventDefault();
                    this.parent.forEach(item => {
                        item.innerHTML = '';
                    });
                const searchValue = this.inputSearch.querySelector('input');
                let searchURL = `https://api.pexels.com/v1/search?query=${searchValue.value}&page=`;
                    this.pageIndex = 1;
                    this.getImage(searchURL+this.pageIndex)
                        .then(window.addEventListener('scroll', (e) => this.uploadingImage(searchURL)));
            });
        }

        uploadingImage(upload) {
            
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                // letpageIndex = ++this.pageIndex;
                console.log(document.documentElement.scrollHeight);
                console.log(window.pageYOffset + document.documentElement.clientHeight);
                console.log(this.pageIndex);
                console.log(upload);
                this.getImage(upload+this.pageIndex);
            }
        }

    }

    console.log(window.pageYOffset);
    console.log(document.documentElement.clientHeight);
    console.log(document.documentElement.scrollHeight);

    const url = 'https://api.pexels.com/v1/curated?page=',
        API_KEY = '563492ad6f917000010000016afa1c811bb44f909546a673c92caebd';

    // new PhotoItem().render();
    new PhotoItem().getImage('https://api.pexels.com/v1/curated?page='+'1');
    // new PhotoItem().eventHandler();

    
    //     function showModalByScroll() {
            // if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            //     openModal();
            //     window.removeEventListener('scroll', showModalByScroll);
            // }
    //     }

    //     window.addEventListener('scroll', showModalByScroll);

});