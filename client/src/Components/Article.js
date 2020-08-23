import React from 'react';
import TimeSince from './TimeSince';

// Map HTMLCollection to DOM
export default function Article({ article, handleModal }) {
  // Returns XML element content
  function returnElContent(tagName) {
    const elContent = article.getElementsByTagName(tagName)[0] || '';

    if (elContent === '') return '';
    if (tagName === 'media:content') return article.getElementsByTagName(tagName)[0].attributes.url.value;
    return article.getElementsByTagName(tagName)[0].innerHTML;
  }

  // Hide image section if no image links
  function handleImageClass(links) {
    return links === '' ? 'hidden' : 'visible';
  }

  return (
    <div className="article">
      <div className="article-info">
        <h4 className="pub-date">{TimeSince(returnElContent('pubDate'))}</h4>
        <span className="category">{returnElContent('category')}</span>
      </div>

      <div className="article-header" onClick={() => handleModal(returnElContent('link'))}>
        <img
          className={handleImageClass(returnElContent('media:content'))}
          alt={returnElContent('title')}
          src={returnElContent('media:content')}
        />
        <h3 className="title">{returnElContent('title').replace('&amp;', '&')}</h3>
        <p className="desc">{returnElContent('description')}</p>
      </div>

      <h4 className="article-author">{returnElContent('author')}</h4>
    </div>
  );
}
