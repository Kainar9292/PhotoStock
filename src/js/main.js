window.addEventListener('DOMContentLoaded', () => {

    class PhotoItem {
        constructor(alt, srcDownload, srcSmall, srcFullscreen, authorName, authorPage) {
            this.alt = alt;
            this.srcDownload = srcDownload;
            this.srcSmall = srcSmall;
            this.srcFullscreen = srcFullscreen;
            this.authorName = authorName;
            this.authorPage = authorPage;
            this.parent = document.querySelector('.main__wrapper');
            this.url = 'https://api.unsplash.com/photos/?client_id=KMpv9NNhT8QVFenMRMZcdnjMgsdq-ZljVOaoeAs3eZQ';
            this.key = 'KMpv9NNhT8QVFenMRMZcdnjMgsdq-ZljVOaoeAs3eZQ';
        }
        render() {
            const element =document.createElement('div');

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
            this.parent.append(element);
        }
    }

    // new PhotoItem().render();

    // new PhotoItem().getImage();

    const url = 'https://api.unsplash.com/photos/',
          API_KEY = 'Client-ID KMpv9NNhT8QVFenMRMZcdnjMgsdq-ZljVOaoeAs3eZQ';

    const getImage = async (url, key) => { 
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: key
            }
        });

        if (!res.ok) { 
            throw new Error(`Could not fetch ${url}, status: ${res.status}`); 
        }

        return await res.json(); 
    };

    getImage(url, API_KEY)
        .then(data => {
            data.forEach(item => {
                    new PhotoItem(
                        item.alt_description, 
                        item.links.download, 
                        item.urls.small, 
                        item.urls.full, 
                        item.user.name, 
                        item.user.links.html)
                        .render();
                        console.log(item);
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



    // getImage(url, API_KEY)
    //     .then(data => {
    //         data.photos.forEach((item) => {
    //             new PhotoItem(item.src.portrait, '.main__wrapper').render();
    //         });
            // const img = document.querySelectorAll('.main__item');
            // img.forEach(element => {
            //     element.addEventListener('mouseover', () => {
            //         console.log(element);
            //         element.querySelector('.main__icon').style.bottom = 0 + 'px';
            //     });
            // });
            // img.forEach(element => {
            //     element.addEventListener('mouseout', () => {
            //         // console.log(element);
            //         element.querySelector('.main__icon').style.bottom = '-40' + 'px';
            //     });
            // });
    //     });



    // console.log(img);



});