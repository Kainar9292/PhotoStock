window.addEventListener('DOMContentLoaded', () => {

    class PhotoItem {
        constructor(alt, srcDownload, srcSmall, srcFullscreen, authorName, authorPage, counter) {
            this.alt = alt;
            this.srcDownload = srcDownload;
            this.srcSmall = srcSmall;
            this.srcFullscreen = srcFullscreen;
            this.authorName = authorName;
            this.authorPage = authorPage;
            this.parent = document.querySelectorAll('.main__photos');
            this.url = 'https://api.pexels.com/v1/curated?per_page=12';
            this.key = '563492ad6f917000010000016afa1c811bb44f909546a673c92caebd';
            this.counter = counter;
        }
        render() {
            console.log(this.parent);
            const element =document.createElement('div');
            element.classList.add('item');
            element.innerHTML = `
                <div class="main__item">
                    <img class="main__img" src="${this.srcSmall}" alt="${this.alt}">
                    <div class="main__icon">
                        <a href="${this.authorPage}">Автор: ${this.authorName}</a>
                        <div class="icon__img">
                            <a href = "${this.srcDownload}" download="1.jpg" rel="noopener">
                                <img data-download="${this.srcDownload}" src="assets/img/download.svg" alt="download">
                            </a>
                            <img data-heart="${this.srcSmall}" src="assets/img/heart_selected.svg" alt="selected">
                            <img data-fullscreen="${this.srcFullscreen}" src="assets/img/fullscreen.svg" alt="fullscreen">
                        </div>
                    </div>
                </div>
            `;
            this.parent[this.counter].append(element);
        }

        


    }

    // new PhotoItem().render();
    // new PhotoItem().getImage();

    
    const url = 'https://api.pexels.com/v1/curated?page=1',
          API_KEY = '563492ad6f917000010000016afa1c811bb44f909546a673c92caebd';

    const getImage = async (url, key) => { 
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                // Authorization: key
            }
        });

        if (!res.ok) { 
            throw new Error(`Could not fetch ${url}, status: ${res.status}`); 
        }
        console.log(res);
        return await res.json(); 
    };

    

    getImage(url, API_KEY)
        .then(data => {
            console.log(data);
            let counter = 1;
            data.photos.forEach(item => {
                
                if (counter === 3) {
                    counter = 0;
                }
                 console.log(item);
                 new PhotoItem(
                         'pexels',
                         item.src.original,
                         item.src.medium,
                         item.src.large,
                         item.photographer,
                         item.photographer_url,
                         counter)
                     .render();
                     ++counter;
        });
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
    });

    const inputSearch = document.querySelector('input');

    inputSearch.addEventListener('keypress', (e) => {
        if (e.which === 13) {
            console.log(inputSearch.value);
            let searchValue = `https://api.pexels.com/v1/search?query=${inputSearch.value}&per_page=21`;
            
            getImage(searchValue, API_KEY)
                .then(data => {
                    console.log(data);
                    let counter = 1;
                    // document.querySelector('.main__wrapper').innerHTML = '';
                    data.photos.forEach(item => {
                        console.log(item);
                        if (counter === 3) {
                            counter = 0;
                        }
                        new PhotoItem(
                                'pexels',
                                item.src.original,
                                item.src.medium,
                                item.src.large,
                                item.photographer,
                                item.photographer_url,
                                counter)
                            .render();
                        ++counter;
                    });
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
                });
        }
    });


        function showModalByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal();
                window.removeEventListener('scroll', showModalByScroll);
            }
        }

        window.addEventListener('scroll', showModalByScroll);


    //      UNSPLASH

    // const url = 'https://api.unsplash.com/photos/',
    //       API_KEY = 'Client-ID KMpv9NNhT8QVFenMRMZcdnjMgsdq-ZljVOaoeAs3eZQ';

    // const getImage = async (url, key) => { 
    //     const res = await fetch(url, {
    //         method: 'GET',
    //         headers: {
    //             Accept: 'application/json',
    //             Authorization: key
    //         }
    //     });

    //     if (!res.ok) { 
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`); 
    //     }

    //     return await res.json(); 
    // };

    // getImage(url, API_KEY)
    //     .then(data => {
    //         data.forEach(item => {
    //             new PhotoItem(
    //                     item.alt_description,
    //                     item.links.download,
    //                     item.urls.small,
    //                     item.urls.full,
    //                     item.user.name,
    //                     item.user.links.html)
    //                 .render();
    //             console.log(item);
    //         });
    //         const img = document.querySelectorAll('.main__item');
    //         img.forEach(element => {
    //             element.addEventListener('mouseover', () => {
    //                 console.log(element);
    //                 element.querySelector('.main__icon').style.bottom = 0 + 'px';
    //             });
    //         });
    //         img.forEach(element => {
    //             element.addEventListener('mouseout', () => {
    //                 element.querySelector('.main__icon').style.bottom = '-55' + 'px';
    //             });
    //         });
    //     });



});