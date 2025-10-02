import Head from 'next/head';
import Link from 'next/link';
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

          {/* Feature Image */}
          {post.image && post.image.trim() !== '' && (
            <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto"
                onError={(e) => {
                  e.target.parentElement.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:text-slate-900 dark:prose-headings:text-white
              prose-p:text-slate-700 dark:prose-p:text-slate-300
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-900 dark:prose-strong:text-white
              prose-code:text-blue-600 dark:prose-code:text-blue-400
              prose-pre:bg-slate-800 prose-pre:text-slate-100
              prose-ul:text-slate-700 dark:prose-ul:text-slate-300
              prose-ol:text-slate-700 dark:prose-ol:text-slate-300
              prose-blockquote:border-blue-500 prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-300
              prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

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
                  <div className="relative h-40 bg-gradient-to-br from-blue-500 to-indigo-600">
                    {relatedPost.image && relatedPost.image.trim() !== '' ? (
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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
