export default function decorate(block) {
  const blockName = 'vt-testimonial';
  const picture = block.querySelector('picture');
  const headings = block.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const ctaButtons = block.querySelectorAll('.button-container a');
  const contentWrapper = block.querySelector(':scope > div');
  const content = block.querySelector(':scope > div > div');

  contentWrapper.classList.add(`${blockName}-content-wrapper`);
  content.classList.add(`${blockName}-content`);
  [...headings].forEach((heading) => heading.classList.add(`${blockName}-heading`));
  [...ctaButtons].forEach((button) => {
    button.classList.add(`${blockName}-button`, 'tertiary', 'dark');
    button.classList.remove('primary');
  });

  const pictureTag = picture;
  pictureTag.classList.add(`${blockName}-bg-image`);
  picture.remove();

  block.prepend(pictureTag);
}
