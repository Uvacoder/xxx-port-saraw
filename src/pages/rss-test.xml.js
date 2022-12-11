import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import { SITE_TITLE, SITE_DESCRIPTION } from '../config';

const postImportResult = import.meta.glob('./blog/**/*.md', { eager: true }); 
const posts = Object.values(postImportResult);

export const get = () =>
	rss({
		title: SITE_TITLE+" | short",
		description: SITE_DESCRIPTION,
		site: import.meta.env.SITE,
		items: posts.map((post) => ({
			link: post.url,
			title: post.frontmatter.title,
			pubDate: post.frontmatter.pubDate,
			description: post.frontmatter.short ? "" : post.frontmatter.description,
			content: post.frontmatter.short ? sanitizeHtml(post.compiledContent()) : "",
		}))
	});
