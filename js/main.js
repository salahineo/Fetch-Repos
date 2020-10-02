/* --------------------------------------- Main Variables --------------------------------------- */
var input = document.querySelector('input'),
  fetchButton = document.querySelector('button'),
  result = document.querySelector('.result'),
  error = document.querySelector('.error'),
  repoContent = '';

/* ----------------------------------------- Main Logic ----------------------------------------- */

fetchButton.onclick = function () {
  // Trigger The Function
  getRepos();
};

input.onchange = function () {
  // Clear Result On New Fetch
  repoContent = '';
};

// The Main Function
function getRepos() {
  // Get The Input Value
  let username = input.value;

  // Check For Input Value
  if (username == '') {
    // Empty Result Section
    result.innerHTML = '';
    // Show Error Message
    error.innerHTML = 'Please Enter Github Username';
    error.style.display = 'block';
  } else {
    // Get Data With Fetch API
    fetch('https://api.github.com/users/' + username + '/repos')
      .then((response) => {
        // Check For Username
        if (response.status === 404) {
          // Empty Result Section
          result.innerHTML = '';
          // Show Error Message
          error.innerHTML = 'This Username Does Not Exist On Github';
          error.style.display = 'block';
        } else if (response.status === 403) {
          // Empty Result Section
          result.innerHTML = '';
          // Show Error Message
          error.innerHTML = 'Sorry, Rate Limit Exceeds. Please Try Again Later';
          error.style.display = 'block';
        } else {
          // Hide Error Message
          error.style.display = 'none';
        }
        return response.json();
      })
      .then((repositories) => {
        // Loop Through Object
        repositories.forEach((repo) => {
          // Add Repo Info
          repoContent += `<div class="repo">
          <span class="repo-name">
            ${repo.name}
            <span class="description">${repo.description}</span>
          </span>
          <div class="buttons">
            <button class="stars"><i class="fas fa-star"></i>${repo.stargazers_count}</button>
            <button class="forks"><i class="fas fa-code-branch"></i>${repo.forks_count}</button>
            <button class="visit"><a href="${repo.html_url}" target="_blank">Visit</a></button>
          </div>
        </div>`;
        });
        // Add Repo Section
        result.innerHTML = repoContent;
      });
  }
}
