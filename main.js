class GitHub {
  constructor() {
    this.form = document.getElementById("form");
    this.search = document.getElementById("search");
    this.main = document.getElementById("main");

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = this.search.value;
      this.getUserDetails(username);
    });

    // Initialize with your profile details
    this.getUserDetails("milindkusahu");
  }

  async getUserDetails(username) {
    try {
      const [userResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(
          `https://api.github.com/users/${username}/repos?sort=created&per_page=5`,
        ),
      ]);

      const userData = await userResponse.json();
      const reposData = await reposResponse.json();

      this.createUserCard(userData, reposData);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  createUserCard(user, repos) {
    const card = `
      <div class="card">
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
        <h2 class="name">${user.name}</h2>
        <p class="bio">${user.bio}</p>
        <div class="stats">
          <p>${user.followers} Followers</p>
          <p>${user.following} Following</p>
          <p>${user.public_repos} Repos</p>
        </div>
        <div class="repo-list">
          ${repos
            .map(
              (repo) => `
            <a href="${repo.html_url}" target="_blank" class="repo">
              ${repo.name}
            </a>
          `,
            )
            .join("")}
        </div>
      </div>
    `;

    this.main.innerHTML = card;
  }
}

new GitHub();
