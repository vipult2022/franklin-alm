export default function decorate(block) {
  const blockName = 'vt-team-block';
  const picture = block.querySelector('picture');
  const headings = block.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const titleWrapper = block.querySelector(':scope > div');
  const contentWrapper = block.querySelectorAll(':scope > div');
  const content = block.querySelector(':scope > div > div');

  const profileWrapper = document.createElement('div');
  profileWrapper.className = `${blockName}-profile-wrapper`;

  [...contentWrapper].forEach((cw) => {
    cw.classList.add(`${blockName}-profile`);
    profileWrapper.append(cw);
  });
  content.classList.add(`${blockName}-content`);
  [...headings].forEach((heading) => heading.classList.add(`${blockName}-heading`));

  const headingBlock = titleWrapper;
  headingBlock.classList.add(`${blockName}-heading-block`);
  headingBlock.classList.remove(`${blockName}-profile`);
  titleWrapper.remove();

  block.textContent = '';
  block.append(headingBlock);
  block.append(profileWrapper);

  const pictureTag = picture;
  pictureTag.classList.add(`${blockName}-bg-image`);
  picture.remove();

  block.prepend(pictureTag);
}
