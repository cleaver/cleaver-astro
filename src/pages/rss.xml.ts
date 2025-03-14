import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export function GET(context: APIContext) {
    if (!context.site) {
        throw new Error('site URL is required for RSS feed');
    }

    return rss({
        // `<title>` field in output xml
        title: 'cleaver.ca',
        // `<description>` field in output xml
        description: 'A blog by Cleaver Barnes. Web technology and other topics.',
        // Pull in your project "site" from the endpoint context
        // https://docs.astro.build/en/reference/api-reference/#site
        site: context.site,
        // Array of `<item>`s in output xml
        // See "Generating items" section for examples using content collections and glob imports
        items: [],
        // (optional) inject custom xml
        customData: `<language>en-us</language>`,
    });
}