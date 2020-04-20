'use strict';


function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.length ; i++){
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].url}">${responseJson[i].full_name}</a></h3>
      </li>`
    )};
  $('#results').removeClass('hidden');
};

function getRepo(searchTerm) {
  const url = 'https://api.github.com/users/' + searchTerm + '/repos' ;
  console.log(url);


  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson)
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    }));
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getRepo(searchTerm);
  });
}

$(watchForm);