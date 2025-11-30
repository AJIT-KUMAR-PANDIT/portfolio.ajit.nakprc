"use client";

import clsx from "clsx";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import styles from "./BlogSection.module.scss";

export default function BlogSection() {
  const blogPosts = [
    {
      id: 1,
      title: "Building Modern Web Applications with Next.js",
      excerpt:
        "Discover the power of Next.js for creating fast, SEO-friendly web applications.",
      date: "Nov 25, 2024",
      readTime: "5 min read",
      category: "Web Development",
    },
    {
      id: 2,
      title: "Mastering React Hooks: A Complete Guide",
      excerpt:
        "Deep dive into React Hooks and learn how to build cleaner components.",
      date: "Nov 20, 2024",
      readTime: "8 min read",
      category: "React",
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox: When to Use What",
      excerpt:
        "Understanding the differences and choosing the right layout system.",
      date: "Nov 15, 2024",
      readTime: "6 min read",
      category: "CSS",
    },
    {
      id: 4,
      title: "JavaScript Performance Optimization Tips",
      excerpt: "Learn practical techniques to optimize your JavaScript code.",
      date: "Nov 10, 2024",
      readTime: "7 min read",
      category: "JavaScript",
    },
    {
      id: 5,
      title: "Building Accessible Web Applications",
      excerpt:
        "Best practices for creating inclusive web experiences for everyone.",
      date: "Nov 5, 2024",
      readTime: "10 min read",
      category: "Accessibility",
    },
    {
      id: 6,
      title: "The Future of Web Development",
      excerpt: "Exploring emerging trends and technologies shaping the future.",
      date: "Oct 30, 2024",
      readTime: "6 min read",
      category: "Trends",
    },
  ];

  return (
    <section id="blog" className={clsx(styles.blogSection)}>
      <div className={clsx(styles.titleMain)}>BLOG</div>
      <div className={clsx(styles.titleSub)}>
        Thoughts, Tutorials, And Insights
        <span className={clsx(styles.highlight)}>
          &nbsp; On Web Development.
        </span>
      </div>

      <div className={clsx(styles.contentWrapper)}>
        <div className={clsx(styles.blogGrid)}>
          {blogPosts.map((post) => (
            <article key={post.id} className={clsx(styles.blogCard)}>
              <div className={clsx(styles.cardHeader)}>
                <span className={clsx(styles.category)}>
                  <Tag size={14} />
                  {post.category}
                </span>
              </div>

              <div className={clsx(styles.cardContent)}>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>

                <div className={clsx(styles.meta)}>
                  <span className={clsx(styles.metaItem)}>
                    <Calendar size={16} />
                    {post.date}
                  </span>
                  <span className={clsx(styles.metaItem)}>
                    <Clock size={16} />
                    {post.readTime}
                  </span>
                </div>

                <Link
                  href={`/blog/${post.id}`}
                  className={clsx(styles.readMore)}
                >
                  Read More
                  <ArrowRight size={18} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
