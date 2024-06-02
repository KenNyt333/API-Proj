const fetchDataBtn = document.getElementById('fetchbtn');
const dataDisplay = document.getElementById('display');
let usersData;

// Fetch users data first
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
        usersData = data;

        // Then fetch posts data
        fetchDataBtn.addEventListener('click', () => {
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then(response => response.json())
                .then(postsData => {
                    let info = ' ';
                    postsData.forEach(post => {
                        // Find the user who wrote the post
                        const user = usersData.find(user => user.id === post.userId);
                        info += `
                            <div class="post" id="post-${post.id}">
                                <h2>${post.title}</h2>
                                <p>${post.body}</p>
                                <p>Author: ${user.name}, Email: ${user.email}</p>
                                <button class="view-details">View Details</button>
                                <div class="comments"></div>
                            </div>
                            <hr>
                        `;
                    });
                    dataDisplay.innerHTML = info;

                    // Add event listeners to the "View Details" buttons
                    document.querySelectorAll('.view-details').forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            const postId = e.target.parentElement.id.split('-')[1];
                            fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
                                .then(response => response.json())
                                .then(comments => {
                                    let commentsHTML = '<h3>Comments</h3>';
                                    comments.forEach(comment => {
                                        commentsHTML += `
                                        <div>
                                            <p>${comment.name}</p>
                                            <p>${comment.body}</p>
                                        </div>
                                        `;
                                    });
                                    document.querySelector(`#post-${postId} .comments`).innerHTML = commentsHTML;
                                });
                        });
                    });
                });
        });
    });
