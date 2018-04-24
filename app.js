(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      responseContainer.innerHTML = '';
      searchedForText = searchField.value;

   $.ajax({
        url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
        headers: {
          Authorization: 'Client-ID 0f322fa9c242d1c992132fc6d4121412fe82154acd3371fdd2c559afe6596c3d'
        }
      }).done(addImage);

      $.ajax({
        url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=bb606f840f8149b8947539122a93904f`
      }).done(addArticles);
    });

    function addImage() {
      const firstImage = images.results[0];

      responseContainer.insertAdjacentHTML('afterbegin', `<figure>
        <img src="${firstImage.urls.small}" alt="${searchedForText}">
        <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
      </figure>`
      );
    }

    function addArticles(data) {
      let htmlContent = '';

      if (data.response && data.response.docs && data.response.docs.length > 1) {
        const articles = data.response.docs;
        htmlContent = '<ul>' + articles.map(article => `<li class="article"> 
            <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
            <p>${article.snippet}</p>
          </li>`
        ).join('') + '</ul>';
      } else {
        htmlContent = '<div class="error-no-articles">No articles available</div>';
      }
      responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }

    function requestError(e, part) {
        console.log(e);
        responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning error-${part}">Oh no! There was an error making a request for the ${part}.</p>`);
    }

})();
