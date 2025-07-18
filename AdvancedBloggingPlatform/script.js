let currentUser = null; 
let users = JSON.parse(localStorage.getItem("users")) || {};
let posts = JSON.parse(localStorage.getItem("posts")) || [];

// Sign Up
document.getElementById("signupBtn").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    if (users[username]) {
        alert("Username already exists!");
        return;
    }

    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! You can now login.");
});

// Login
document.getElementById("loginBtn").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (users[username] && users[username] === password) {
        currentUser = username;
        document.getElementById("authSection").style.display = "none";
        document.getElementById("blogSection").style.display = "block";
        document.getElementById("logoutBtn").style.display = "inline";
        renderPosts();
    } else {
        alert("Invalid credentials.");
    }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
    currentUser = null;
    document.getElementById("authSection").style.display = "block";
    document.getElementById("blogSection").style.display = "none";
    document.getElementById("logoutBtn").style.display = "none";
});

// Save Post
document.getElementById("savePostBtn").addEventListener("click", () => {
    if (!currentUser) return;

    const title = document.getElementById("postTitle").value.trim();
    const content = document.getElementById("postContent").value.trim();

    if (!title || !content) {
        alert("Title and content cannot be empty.");
        return;
    }

    posts.unshift({ username: currentUser, title, content, comments: [] });
    localStorage.setItem("posts", JSON.stringify(posts));
    document.getElementById("postTitle").value = "";
    document.getElementById("postContent").value = "";
    renderPosts();
});

// Render Posts
function renderPosts() {
    const container = document.getElementById("postsContainer");
    container.innerHTML = "";

    posts.forEach((post, index) => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");

        postDiv.innerHTML = `
            <strong>${post.title}</strong> by <em>${post.username}</em>
            <p>${post.content}</p>
            <div class="comment-section">
                <input type="text" placeholder="Add comment..." data-index="${index}" class="comment-input">
                <button onclick="addComment(${index})">Comment</button>
                <div id="comments-${index}">${renderComments(post.comments)}</div>
            </div>
        `;

        container.appendChild(postDiv);
    });
}

// Render Comments
function renderComments(comments) {
    return comments.map(c => `<div class='comment'><strong>${c.user}</strong>: ${c.text}</div>`).join("");
}

// Add Comment
function addComment(postIndex) {
    const input = document.querySelector(`.comment-input[data-index='${postIndex}']`);
    const commentText = input.value.trim();

    if (!commentText) {
        alert("Comment cannot be empty.");
        return;
    }

    if (!currentUser) {
        alert("You must be logged in to comment.");
        return;
    }

    posts[postIndex].comments.push({ user: currentUser, text: commentText });
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
}

renderPosts();













































// let currentUser = null;
// let users = JSON.parse(localStorage.getItem("users")) || {};
// let posts = JSON.parse(localStorage.getItem("posts")) || [];

// document.getElementById("signupBtn").addEventListener("click", () => {
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;

//     if (users[username]) {
//         alert("Username already exists!");
//         return;
//     }

//     users[username] = password;
//     localStorage.setItem("users", JSON.stringify(users));
//     alert("Signup successful! You can now login.");
// });

// document.getElementById("loginBtn").addEventListener("click", () => {
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;

//     if (users[username] && users[username] === password) {
//         currentUser = username;
//         document.getElementById("authSection").style.display = "none";
//         document.getElementById("blogSection").style.display = "block";
//         document.getElementById("logoutBtn").style.display = "inline";
//         renderPosts();
//     } else {
//         alert("Invalid credentials.");
//     }
// });

// document.getElementById("logoutBtn").addEventListener("click", () => {
//     currentUser = null;
//     document.getElementById("authSection").style.display = "block";
//     document.getElementById("blogSection").style.display = "none";
//     document.getElementById("logoutBtn").style.display = "none";
// });

// document.getElementById("savePostBtn").addEventListener("click", () => {
//     if (!currentUser) return;

//     const title = document.getElementById("postTitle").value;
//     const content = document.getElementById("postContent").value;

//     if (!title || !content) {
//         alert("Title and content cannot be empty.");
//         return;
//     }

//     posts.unshift({ username: currentUser, title, content, comments: [] });
//     localStorage.setItem("posts", JSON.stringify(posts));
//     renderPosts();
// });

// function renderPosts() {
//     const container = document.getElementById("postsContainer");
//     container.innerHTML = "";

//     posts.forEach((post, index) => {
//         const postDiv = document.createElement("div");
//         postDiv.classList.add("post");

//         postDiv.innerHTML = `
//             <strong>${post.title}</strong> by <em>${post.username}</em>
//             <p>${post.content}</p>
//             <div class="comment-section">
//                 <input type="text" placeholder="Add comment..." data-index="${index}" class="comment-input">
//                 <button onclick="addComment(${index})">Comment</button>
//                 <div id="comments-${index}">${renderComments(post.comments)}</div>
//             </div>
//         `;

//         container.appendChild(postDiv);
//     });
// }

// function renderComments(comments) {
//     return comments.map(c => `<div class='comment'><strong>${c.user}</strong>: ${c.text}</div>`).join("");
// }

// function addComment(postIndex) {
//     const input = document.querySelector(\`.comment-input[data-index='\${postIndex}']\`);
//     const commentText = input.value.trim();

//     if (!commentText || !currentUser) {
//         alert("You must be logged in and comment cannot be empty.");
//         return;
//     }

//     posts[postIndex].comments.push({ user: currentUser, text: commentText });
//     localStorage.setItem("posts", JSON.stringify(posts));
//     renderPosts();
// }

// renderPosts();
