import React from "react"

const posts = [
  {
    id: 1,
    title: "Exploring the Mysteries of the Universe: From Nebulae to Black Holes",
    summary: "The universe is full of mysterious celestial bodies, from colorful nebulae to enigmatic black holes. This article takes you on a journey through cosmic wonders.",
    date: "2024-06-01",
    author: "Starry Editor",
  },
  {
    id: 2,
    title: "Beginner's Guide to Astronomical Observation",
    summary: "Want to start stargazing? This article introduces basic equipment, observation tips, and common celestial objects to help you take the first step.",
    date: "2024-05-28",
    author: "Skywatcher",
  },
  {
    id: 3,
    title: "How AI Empowers Astronomy",
    summary: "Artificial intelligence is transforming astronomical research, from data analysis to celestial object recognition, making cosmic exploration more efficient.",
    date: "2024-05-20",
    author: "AI Astronomy",
  },
]

const categories = ["Popular Science", "Observation Tips", "AI & Astronomy", "Cosmic Exploration"]
const tags = ["Nebula", "Black Hole", "Telescope", "AI", "Milky Way", "Planet"]
const hotPosts = [
  { id: 2, title: "Beginner's Guide to Astronomical Observation" },
  { id: 1, title: "Exploring the Mysteries of the Universe: From Nebulae to Black Holes" },
]

export default function BlogPage() {
  return (
    <main className="container mx-auto px-4 py-10 min-h-[60vh]">
      {/* Blog Title & Description */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">Interstellar Blog</h1>
        <p className="text-lg text-gray-600">Sharing fascinating content about the universe, astronomy, and AI. Explore the mysteries of the cosmos with us.</p>
      </div>
      {/* Main Content + Sidebar Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content: Post List */}
        <section className="flex-1">
          {posts.map(post => (
            <article key={post.id} className="mb-8 p-6 bg-white/5 rounded-lg shadow hover:shadow-indigo-200 transition-all border border-indigo-100/10">
              <h2 className="text-2xl font-semibold mb-2 text-indigo-300 hover:underline cursor-pointer">{post.title}</h2>
              <div className="text-sm text-gray-400 mb-2">{post.date} · {post.author}</div>
              <p className="text-gray-200 mb-2">{post.summary}</p>
              <a href="#" className="text-indigo-400 hover:underline text-sm">Read More &rarr;</a>
            </article>
          ))}
        </section>
        {/* Sidebar */}
        <aside className="w-full md:w-72 flex-shrink-0">
          {/* Categories */}
          <div className="mb-8 bg-white/5 rounded-lg p-4 border border-indigo-100/10">
            <h3 className="text-lg font-bold mb-3 text-indigo-300">Categories</h3>
            <ul className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <li key={cat}>
                  <span className="inline-block px-3 py-1 bg-indigo-900/40 text-indigo-200 rounded-full text-sm">{cat}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Tags */}
          <div className="mb-8 bg-white/5 rounded-lg p-4 border border-indigo-100/10">
            <h3 className="text-lg font-bold mb-3 text-indigo-300">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-indigo-800/30 text-indigo-100 rounded text-xs">#{tag}</span>
              ))}
            </div>
          </div>
          {/* Hot Posts */}
          <div className="bg-white/5 rounded-lg p-4 border border-indigo-100/10">
            <h3 className="text-lg font-bold mb-3 text-indigo-300">Hot Posts</h3>
            <ul>
              {hotPosts.map(post => (
                <li key={post.id} className="mb-2">
                  <a href="#" className="text-indigo-400 hover:underline text-sm">{post.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  )
} 