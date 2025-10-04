import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

/**
 * Individual Blog Post Page
 * Full SEO optimization + Internal linking + Related posts
 */
export default function BlogPost({ post, relatedPosts }) {
  if (!post) {
    return <div>Post not found</div>;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author
    },
    datePublished: post.date,
    image: post.image ? `https://elsewhere-app.onrender.com${post.image}` : null,
    publisher: {
      '@type': 'Organization',
      name: 'ElseWhere',
      logo: {
        '@type': 'ImageObject',
        url: 'https://elsewhere-app.onrender.com/favicon.ico'
      }
    }
  };

  return (
    <>
      <Head>
        <title>{post.title} | ElseWhere Blog</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <meta name="author" content={post.author} />
        <link rel="canonical" href={`https://elsewhere-app.onrender.com/blog/${post.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={`https://elsewhere-app.onrender.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.image ? `https://elsewhere-app.onrender.com${post.image}` : ''} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
        {post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={post.image ? `https://elsewhere-app.onrender.com${post.image}` : ''} />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Header */}
        <header className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ElseWhere
              </Link>
              <nav className="flex gap-6">
                <Link href="/" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  App
                </Link>
                <Link href="/blog" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Article */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-8">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400">Blog</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white">{post.category}</span>
          </nav>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
              {post.category}
            </span>
            <time className="text-slate-600 dark:text-slate-400" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span className="text-slate-600 dark:text-slate-400">•</span>
            <span className="text-slate-600 dark:text-slate-400">{post.readTime || '8 min read'}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
              {post.author.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">{post.author}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">ElseWhere Team</div>
            </div>
          </div>

          {/* Feature Image */}          {post.image && post.image.trim() !== '' && (
            <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl relative h-96">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                onError={(e) => {
                  e.target.parentElement.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Content */}
          <div className="blog-content">
            <style jsx>{`
              .blog-content {
                max-width: 65ch;
                font-size: 1.125rem;
                line-height: 1.8;
                color: #334155;
              }
              
              .blog-content :global(p) {
                margin-bottom: 1.75rem;
                line-height: 1.9;
              }
              
              .blog-content :global(h2) {
                font-size: 2rem;
                font-weight: 700;
                margin-top: 3.5rem;
                margin-bottom: 1.5rem;
                color: #0f172a;
                border-bottom: 3px solid #3b82f6;
                padding-bottom: 0.75rem;
              }
              
              .blog-content :global(h3) {
                font-size: 1.5rem;
                font-weight: 600;
                margin-top: 2.5rem;
                margin-bottom: 1rem;
                color: #1e293b;
              }
              
              .blog-content :global(h4) {
                font-size: 1.25rem;
                font-weight: 600;
                margin-top: 2rem;
                margin-bottom: 0.75rem;
                color: #334155;
              }
              
              .blog-content :global(ul),
              .blog-content :global(ol) {
                margin: 2rem 0;
                padding-left: 1.5rem;
              }
              
              .blog-content :global(li) {
                margin-bottom: 1rem;
                line-height: 1.8;
              }
              
              .blog-content :global(strong) {
                font-weight: 700;
                color: #0f172a;
              }
              
              .blog-content :global(a) {
                color: #3b82f6;
                text-decoration: none;
                font-weight: 600;
                border-bottom: 2px solid transparent;
                transition: border-color 0.2s;
              }
              
              .blog-content :global(a:hover) {
                border-bottom-color: #3b82f6;
              }
              
              .blog-content :global(blockquote) {
                margin: 2.5rem 0;
                padding: 1.5rem 2rem;
                background: #eff6ff;
                border-left: 4px solid #3b82f6;
                font-style: italic;
                border-radius: 0 0.5rem 0.5rem 0;
              }
              
              .blog-content :global(code) {
                background: #eff6ff;
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
                font-size: 0.95em;
                color: #3b82f6;
                font-family: 'Courier New', monospace;
              }
              
              .blog-content :global(pre) {
                background: #1e293b;
                padding: 1.5rem;
                border-radius: 0.75rem;
                overflow-x: auto;
                margin: 2.5rem 0;
              }
              
              .blog-content :global(pre code) {
                background: none;
                color: #f1f5f9;
                padding: 0;
              }
              
              .blog-content :global(hr) {
                margin: 3rem 0;
                border: none;
                border-top: 2px solid #e2e8f0;
              }
              
              /* Dark mode */
              :global(.dark) .blog-content {
                color: #cbd5e1;
              }
              
              :global(.dark) .blog-content :global(h2) {
                color: #f1f5f9;
                border-bottom-color: #3b82f6;
              }
              
              :global(.dark) .blog-content :global(h3) {
                color: #e2e8f0;
              }
              
              :global(.dark) .blog-content :global(h4) {
                color: #cbd5e1;
              }
              
              :global(.dark) .blog-content :global(strong) {
                color: #f1f5f9;
              }
              
              :global(.dark) .blog-content :global(blockquote) {
                background: rgba(59, 130, 246, 0.1);
                color: #cbd5e1;
              }
              
              :global(.dark) .blog-content :global(code) {
                background: rgba(59, 130, 246, 0.2);
                color: #93c5fd;
              }
            `}</style>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="mt-12 p-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Try ElseWhere?</h3>
            <p className="text-lg mb-6 text-blue-100">
              Experience 30 world cities with authentic ambient sounds - completely free!
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all transform hover:scale-105"
            >
              Start Listening Now →
            </Link>
          </div>

          {/* Support Box */}
          <div className="mt-8 p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-center">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              💙 <strong>Enjoying this content?</strong> Support my work and help me create more!
            </p>
            <div className="flex items-center justify-center">
              <a
                href="https://paypal.me/imashokbhagat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.76-4.852a.932.932 0 0 1 .924-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.746-4.46z"/>
                </svg>
                <span>Support via PayPal</span>
              </a>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
              Your support helps keep ElseWhere free for everyone!
            </p>
          </div>

          {/* Share Buttons */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <span className="text-slate-600 dark:text-slate-400 font-semibold">Share this article:</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://elsewhere-app.onrender.com/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://elsewhere-app.onrender.com/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://elsewhere-app.onrender.com/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Facebook
            </a>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700"
                >
                  <div className="relative h-40 bg-gradient-to-br from-blue-500 to-indigo-600">                    {relatedPost.image && relatedPost.image.trim() !== '' ? (
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-4xl">🎵</div>';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        🎵
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                      {relatedPost.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-600 dark:text-slate-400">
            <p>© 2025 ElseWhere. Made with ❤️ for focus and productivity.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

// Generate paths for all blog posts
export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  
  if (!fs.existsSync(postsDirectory)) {
    return {
      paths: [],
      fallback: false
    };
  }

  const filenames = fs.readdirSync(postsDirectory);
  const paths = filenames
    .filter(filename => filename.endsWith('.md') && filename !== 'README.md')
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return {
        params: {
          slug: data.slug || filename.replace('.md', '')
        }
      };
    });

  return {
    paths,
    fallback: false
  };
}

// Get post data
export async function getStaticProps({ params }) {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDirectory, `${params.slug}.md`);
  
  // Read the specific post
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  // Convert markdown to HTML
  const htmlContent = marked(content);

  // Get all posts for related posts
  const allFiles = fs.readdirSync(postsDirectory);
  const allPosts = allFiles
    .filter(filename => filename.endsWith('.md') && filename !== `${params.slug}.md` && filename !== 'README.md')
    .map((filename) => {
      const postPath = path.join(postsDirectory, filename);
      const postContents = fs.readFileSync(postPath, 'utf8');
      const { data: postData } = matter(postContents);
      return {
        slug: postData.slug || filename.replace('.md', ''),
        title: postData.title,
        description: postData.description,
        category: postData.category,
        tags: postData.tags || [],
        image: postData.image,
      };
    });

  // Find related posts (same category or tags)
  const relatedPosts = allPosts
    .filter(post => 
      post.category === data.category || 
      post.tags.some(tag => data.tags.includes(tag))
    )
    .slice(0, 3);

  return {
    props: {
      post: {
        slug: data.slug || params.slug,
        title: data.title,
        description: data.description,
        date: data.date,
        author: data.author,
        category: data.category,
        tags: data.tags || [],
        image: data.image,
        content: htmlContent,
        readTime: data.readTime || calculateReadTime(content)
      },
      relatedPosts
    }
  };
}

// Helper function to calculate read time
function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}
