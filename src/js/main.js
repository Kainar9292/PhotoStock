window.addEventListener('DOMContentLoaded', () => {

    class PhotoItem {
        constructor(src, data) {
            this.src = 'src';
            this.parent = document.querySelector('.main__wrapper');
            this.data = this.getImage(this.url, this.key);
            this.url = 'https://api.pexels.com/v1/curated?per_page=20';
            this.key = '563492ad6f917000010000016afa1c811bb44f909546a673c92caebd';
        }
        render() {
            
            
            console.log(this.data);
            const element =document.createElement('div');

            element.innerHTML = `
                    <div class="main__item">
                        <img class="main__img" src="${this.src}" alt="img">
                        <div class="main__icon">
                            <img src="assets/img/download.svg" alt="download">
                            <img src="assets/img/heart_selected.svg" alt="selected">
                            <img src="assets/img/fullscreen.svg" alt="fullscreen">
                        </div>
                    </div>
                `;
            this.parent.append(element);
        }

        async getImage() {
            const res = await fetch(this.url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: this.key
                }
            });

            if (!res.ok) {
                throw new Error(`Could not fetch ${this.url}, status: ${res.status}`);
            }

            return await res.json();
        }



    }

    new PhotoItem().render();
    // new PhotoItem().getImage();

    // getImage(url, API_KEY)
    //     .then(data => {
    //         data.photos.forEach((item) => {
    //             new PhotoItem(item.src.portrait, '.main__wrapper').render();
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
    //                 // console.log(element);
    //                 element.querySelector('.main__icon').style.bottom = '-40' + 'px';
    //             });
    //         });
    //     });



    // console.log(img);



});