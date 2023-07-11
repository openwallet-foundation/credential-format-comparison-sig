import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'format',
})
export class FormatPipe implements PipeTransform {
  transform(text: string): unknown {
    if (!text || typeof text !== 'string') return text;
    // Regular expression pattern to match URLs
    const urlPattern = /(https?:\/\/\S+)/g;

    // Find all URLs in the text
    const urls = text.match(urlPattern);

    // Iterate over the URLs and wrap each one with an <a> tag
    if (urls) {
      urls.forEach((url) => {
        const link = `<a href="${url}" target="blank">${url}</a>`;
        text = text.replace(url, link);
      });
    }

    return text;
  }
}
