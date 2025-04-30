// Blog functionality
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in (you would replace this with actual auth check)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
        document.getElementById('blog-editor').style.display = 'block';
    }
    
    // Load blog posts
    loadBlogPosts();
    
    // Handle new post submission
    const postForm = document.getElementById('post-form');
    if (postForm) {
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('post-title').value;
            const content = document.getElementById('post-content').value;
            const imageUrl = document.getElementById('post-image').value;
            
            // In a real app, you would send this to a server
            const newPost = {
                id: Date.now(),
                title,
                content,
                imageUrl: imageUrl || 'https://via.placeholder.com/800x400',
                date: new Date().toLocaleDateString(),
                readTime: Math.ceil(content.split(' ').length / 200) + ' min read'
            };
            
            // Save to localStorage (temporary solution)
            const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
            posts.unshift(newPost);
            localStorage.setItem('blogPosts', JSON.stringify(posts));
            
            // Reload posts
            loadBlogPosts();
            
            // Reset form
            postForm.reset();
            
            alert('Post published successfully!');
        });
    }
});

function loadBlogPosts() {
    const postsContainer = document.getElementById('posts-container');
    
    // Check if posts exist in localStorage
    const posts = JSON.parse(localStorage.getItem('blogPosts') || [
        // Default posts if none exist
        {
            id: 1,
            title: 'Getting Started with Web Development',
            content: 'Web development can seem overwhelming at first, but with the right approach, anyone can learn it. Start with HTML and CSS, then move to JavaScript. Build small projects and gradually increase complexity.',
            imageUrl: 'https://via.placeholder.com/800x400',
            date: 'May 15, 2023',
            readTime: '3 min read'
        },
        {
            id: 2,
            title: 'Why I Love Open Source',
            content: 'Open source software has transformed the tech industry. It allows for collaboration, transparency, and community-driven development. Contributing to open source is a great way to improve your skills and give back.',
            imageUrl: 'https://via.placeholder.com/800x400',
            date: 'June 2, 2023',
            readTime: '4 min read'
        }
    ];
    
    // Save if we used default posts
    if (!localStorage.getItem('blogPosts')) {
        localStorage.setItem('blogPosts', JSON.stringify(posts));
    }
    
    // Clear container
    postsContainer.innerHTML = '';
    
    // Add posts to the page
    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.innerHTML = `
            <div class="post-image" style="background-image: url('${post.imageUrl}')"></div>
            <div class="post-content">
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.content.split(' ').slice(0, 30).join(' ')}...</p>
                <div class="post-meta">
                    <span class="post-date">${post.date}</span>
                    <span class="post-read-time">${post.readTime}</span>
                </div>
            </div>
        `;
        postCard.addEventListener('click', () => {
            viewPost(post.id);
        });
        postsContainer.appendChild(postCard);
    });
}

function viewPost(postId) {
    const posts = JSON.parse(localStorage.getItem('blogPosts'));
    const post = posts.find(p => p.id === postId);
    
    if (post) {
        // In a real app, you would navigate to a post detail page
        alert(`Viewing post: ${post.title}\n\n${post.content}`);
    }
}

// Add this to your existing styles.css
const blogStyles = `
/* Blog Specific Styles */
.blog-header {
    padding: 5rem 0 3rem;
    text-align: center;
    background-color: var(--primary-color);
    color: white;
}

.blog-header p {
    max-width: 600px;
    margin: 0 auto;
    color: var(--accent-color);
}

.posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.post-card {
    background-color: var(--card-bg);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: var(--transition);
    cursor: pointer;
}

.post-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.post-image {
    height: 200px;
    background-size: cover;
    background-position: center;
}

.post-content {
    padding: 1.5rem;
}

.post-title {
    margin-bottom: 0.5rem;
    color: var(--primary-color);
}

.post-excerpt {
    margin-bottom: 1rem;
    color: var(--text-color);
}

.post-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--secondary-color);
}

.blog-editor {
    display: none;
    padding: 3rem 0;
    background-color: var(--card-bg);
    margin-top: 3rem;
}

#post-content {
    min-height: 300px;
}
`;

// Add the blog styles to the head
const styleElement = document.createElement('style');
styleElement.textContent = blogStyles;
document.head.appendChild(styleElement);