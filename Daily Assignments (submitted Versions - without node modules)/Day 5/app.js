// BLOG + TODO MODULE
const App = (function () {

    const postBtn = document.getElementById("postBtn");
    const userPost = document.getElementById("userPost");
    const postsContainer = document.getElementById("postsContainer");

    const todoToggle = document.getElementById("todoToggle");
    const todoPopup = document.getElementById("todoPopup");
    const addTaskBtn = document.getElementById("addTask");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    /* Preloaded Public Posts (India Context) */
    const samplePosts = [
        "India’s digital revolution is reshaping how young innovators build startups from small towns.",
        "The vibrant culture of Hyderabad blends modern technology hubs with rich historical heritage.",
        "Learning web development in India today opens doors to global remote opportunities.",
        "From chai stalls to tech parks, conversations about AI are happening everywhere across the country."
    ];

    function loadPublicPosts() {
        samplePosts.forEach(text => {
            createPost(text);
        });
    }

    function createPost(content) {
        const post = document.createElement("div");
        post.classList.add("post");
        post.textContent = content;
        postsContainer.prepend(post);
    }

    function publishPost() {
        const content = userPost.value.trim();
        if (content) {
            createPost(content);
            userPost.value = "";
        }
    }

    function toggleTodo() {
        todoPopup.style.display =
            todoPopup.style.display === "block" ? "none" : "block";
    }

    function addTask() {
        const task = taskInput.value.trim();
        if (!task) return;

        const li = document.createElement("li");
        li.innerHTML = `
            ${task}
            <span>x</span>
        `;

        li.querySelector("span").onclick = () => li.remove();

        taskList.appendChild(li);
        taskInput.value = "";
    }

    function init() {
        loadPublicPosts();
        postBtn.addEventListener("click", publishPost);
        todoToggle.addEventListener("click", toggleTodo);
        addTaskBtn.addEventListener("click", addTask);
    }

    return { init };

})();

document.addEventListener("DOMContentLoaded", App.init);
