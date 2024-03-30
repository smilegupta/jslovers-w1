function randomNameGenerator() {
  // Indian Names
  const names = [
    "Srushith",
    "Smile",
    "Ankita",
    "Danish",
    "Saketh",
    "Varun",
    "Vishwa",
  ];
  return names[Math.floor(Math.random() * names.length)];
}

async function fetchPosts() {
  try {
    const response = await fetch("/api/posts");
    const { posts } = await response.json();
    displayPosts(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

function displayPosts(posts) {
  const feedContainer = document.getElementById("feed-container");
  feedContainer.innerHTML = posts.map(formatPost).join("");
}

function formatPost(post) {
  const postContainer = document.createElement("div");
  postContainer.classList.add("post-container");

  const userElement = document.createElement("strong");
  userElement.textContent = post.user;

  const postTextElement = document.createElement("div");
  postTextElement.textContent = post.text;

  postContainer.appendChild(userElement);
  postContainer.appendChild(postTextElement);

  return postContainer.outerHTML;
}

async function submitPost(postText) {
  try {
    await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: randomNameGenerator(),
        text: postText,
      }),
    });
  } catch (error) {
    console.error("Error submitting post:", error);
  }
}

document
  .getElementById("post-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const postInput = document.getElementById("post-input");
    const postText = postInput.value.trim();
    if (postText !== "") {
      await submitPost(postText);
      postInput.value = "";
    }
  });

// Poll for new posts every 3 seconds
setInterval(fetchPosts, 3000);

// Fetch posts initially when the page loads
fetchPosts();
