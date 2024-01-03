import fetchData from '../../scripts/utils.js';

export default async function decorate(block) {
  const blockName = 'vt-categories';
  const picture = block.querySelector('picture');
  const headings = block.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const contentWrapper = block.querySelector(':scope > div');
  const content = block.querySelector(':scope > div > div');

  contentWrapper.classList.add(`${blockName}-content-wrapper`);
  content.classList.add(`${blockName}-content`);
  [...headings].forEach((heading) => heading.classList.add(`${blockName}-heading`));

  const h6Block = contentWrapper.querySelector('h5');
  const jsonName = h6Block.textContent;

  const response = await fetchData(jsonName, {
    limit: 6,
    offset: 0,
  });

  let html = '';
  const catMainBlock = document.createElement('div');
  catMainBlock.className = `${blockName}-main`;

  response[':names'].forEach((catName) => {
    html += `<div class="${blockName}-cat-block">
      <h3>${catName.replaceAll('-', ' ')}</h3>
      <ul>`;
    response[catName]?.data.forEach((item) => {
      html += `<li><p>${item?.title}</p> <span>(${item?.description})</span></li>`;
    });
    html += '</ul></div>';
  });

  catMainBlock.innerHTML = html;

  h6Block.remove();
  contentWrapper.append(catMainBlock);

  const pictureTag = picture;
  pictureTag.classList.add(`${blockName}-bg-image`);
  picture.remove();

  block.prepend(pictureTag);
}
