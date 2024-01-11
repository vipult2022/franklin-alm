import { fetchData, fetchAlmData } from '../../scripts/utils.js';
import { createOptimizedPicture } from '../../scripts/aem.js';

const createHtml = (response, obj) => {
  const div = document.createElement('section');
  const { title, description, designType } = obj;
  div.className = 'events';
  let cardSize = 6;
  let cardHtml = `
    <div class="container">
        <div class="heading-block">
            <h2 class="heading">${title}</h2>
            <p>${description}</p>
        </div>
        <div class="row ${designType || 'design1'}">`;
  response?.forEach((ele, index) => {
    if (ele.attributes.state === 'Published') {
      if (index === 0) cardSize = 6;
      else cardSize = 3;
      const {
        datePublished, enrollmentType, loFormat, loType, bannerUrl, imageUrl,
      } = ele.attributes || {};
      const { name } = ele.attributes.localizedMetadata[0] || {};
      cardHtml += `<div class="${(cardSize === 6) ? 'col-6' : 'col-3'}">
          <figure class="card card-events ${(cardSize === 6) ? 'primary' : ''}">
              <div class="image-block"><img src="${bannerUrl || imageUrl}" alt="" /></div>
              <figcaption class="description">
                  <h5 class="title">${name}</h5>
                  <ul>
                      <li><i class="icon icon-calender"></i> ${datePublished}</li>
                      <li><i class="icon icon-pin"></i>${enrollmentType}</li>
                      <li><i class="icon icon-clock"></i>${loFormat}</li>
                  </ul>
                  <div class="flex justify-between align-center">
                      <label class="tag">${loType}</label>
                      <button class="btn btn-primary" type="button">Enroll Now</button>
                  </div>
              </figcaption>
          </figure>
      </div>`;
    }
  });
  cardHtml += `</div></div>
</section>`;
  div.innerHTML = cardHtml;
  return { div };
};

export default async function decorate(block) {
  const obj = {
    title: '',
    description: '',
    json: '',
    designType: '',
    limit: 2,
    offset: 0,
  };
  obj.title = block.children[0].children[0].innerText;
  obj.description = block.children[1].children[0].innerText;
  obj.json = block.children[2].children[0].innerText;
  obj.limit = block.children[2].children[0].innerText === 'events' ? 3 : 4; // need to make dynamic
  obj.designType = block.children[2].children[0].innerText || 'design1';

  const courseList = await fetchAlmData('https://learningmanager.adobe.com/primeapi/v2/learningObjects', 'GET', {
    'page[limit]': obj.designType === 'design1' ? 3 : 4,
    'filter.loTypes': 'course',
    'filter.catalogIds': 163584,
    // 'filter.skillName': [...skillFilter],
    sort: obj.designType === 'design1' ? '-name' : 'name',
    'filter.ignoreEnhancedLP': true,
  });

  if (!document?.learningAcademy?.block?.cardsBlock) {
    const cardsBlock = {};
    cardsBlock[obj.designType] = {
      config: {
        ...obj,
      },
    };
    document.learningAcademy = {
      block: {
        cardsBlock,
      },
    };
  } else {
    const cardsBlock = {};
    cardsBlock[obj.designType] = {
      config: {
        ...obj,
      },
    };

    document.learningAcademy = {
      block: {
        cardsBlock: {
          ...document?.learningAcademy?.block?.cardsBlock,
          ...cardsBlock,
        },
      },
    };
  }

  // const response = await fetchData(obj.json, {
  //   limit: obj.limit,
  //   offset: obj.offset,
  // });
  const { div } = createHtml(courseList?.data, obj);
  block.textContent = '';
  div.querySelectorAll('img').forEach((img) => img.replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }], true)));

  block.append(div);
}
