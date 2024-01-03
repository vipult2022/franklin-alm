export default function decorate(block) {
  const blockName = 'vt-hero-banner';
  const picture = block.querySelector('picture');
  const headings = block.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const contentWrapper = block.querySelector(':scope > div');
  const content = block.querySelector(':scope > div > div');

  contentWrapper.classList.add(`${blockName}-content-wrapper`);
  content.classList.add(`${blockName}-content`);
  [...headings].forEach((heading) => heading.classList.add(`${blockName}-heading`));

  const pictureTag = picture;
  pictureTag.classList.add(`${blockName}-bg-image`);
  picture.remove();

  block.prepend(pictureTag);
}
