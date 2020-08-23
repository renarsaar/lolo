import React, { useState, useEffect } from 'react';
import useFetchContent from './useFetchContent';
import Article from './Article';
import ArticleModal from './ArticleModal';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [articleSource, setArticleSource] = useState('');
  const { loading, content, error } = useFetchContent();

  // Handle open modal
  function handleModal(link) {
    setArticleSource(link);
    setShowModal(true);
  }

  // Disable parent component scroll when modal is opened
  function disableParentElScroll(disabled) {
    if (disabled) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  return (
    <div className="container">
      {loading && (
        <>
          <div className="placeholder">
            <div className="placeholder-header" />
            <div className="placeholder-text" />
          </div>
          <div className="placeholder">
            <div className="placeholder-header" />
            <div className="placeholder-text" />
          </div>
          <div className="placeholder">
            <div className="placeholder-header" />
            <div className="placeholder-text" />
          </div>
        </>
      )}
      {error && <h1>Error... Try refreshing</h1>}
      {[...content].map((article) => <Article article={article} handleModal={handleModal} key={article.getElementsByTagName('guid')[0].innerHTML} />)}
      <ArticleModal
        articleSource={articleSource}
        showModal={showModal}
        disableParentElScroll={disableParentElScroll}
        handleClose={() => setShowModal(false)}
      />
    </div>
  );
}
