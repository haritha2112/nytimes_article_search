(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      responseContainer.innerHTML = '';
      searchedForText = searchField.value;

      const imgRequest = new XMLHttpRequest();
      imgRequest.onload = addImage;
      imgRequest.onerror = function (err) {
          requestError(err, 'image');
      };
      imgRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
      imgRequest.setRequestHeader('Authorization', 'Client-ID b65dff736c9af6a5cf8bd401ee5d94b6cc83e19562e71bba71d8b004a8da7051');
      imgRequest.send();
    });

    function addImage() {
        let htmlContent = '';
        const data = JSON.parse(this.responseText);

        if (data && data.results && data.results[0]) {
            const firstImage = data.results[0];
            htmlContent = `<figure>
                <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`;
        } else {
            htmlContent = '<div class="error-no-image">No images available</div>';
        }

        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }
})();
