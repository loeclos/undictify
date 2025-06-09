// lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), '/public/content/posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.md'));
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data: frontmatter, content } = matter(fileContents);
  return { slug, frontmatter, content };
}

export async function getPostContent(slug: string) {
  const { frontmatter, content } = getPostBySlug(slug);
  const processedContent = await remark().use(html).process(content);
  const htmlContent = processedContent.toString();
  return { slug, frontmatter, htmlContent };
}

export function getAllPosts() {
  return getPostSlugs().map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const { frontmatter } = getPostBySlug(slug);
    return { slug, frontmatter };
  });
}
