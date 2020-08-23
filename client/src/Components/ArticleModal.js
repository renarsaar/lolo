import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import useFetchClutterFreeData from './useFetchClutterFreeData';

export default function Modal({
  showModal, handleClose, articleSource, disableParentElScroll,
}) {
  const { loading, data, error } = useFetchClutterFreeData(articleSource);
  const modalClassName = showModal === true ? 'modal visible' : 'modal hidden';

  useEffect(() => {
    if (showModal === true) disableParentElScroll(true);

    return () => {
      disableParentElScroll(false);
    };
  });

  return ReactDOM.createPortal(
    <div className={modalClassName} onClick={handleClose}>
      <div className="modal-main" onClick={(e) => e.stopPropagation()}>
        <div className="close-modal">
          <button type="button" onClick={handleClose} />
        </div>

        {loading && (
          <div className="modal-placeholder">
            <div className="modal-placeholder-header" />
            <div className="modal-placeholder-text" />
          </div>
        )}
        {error && (
          <h1>
            Error Loading Data:
            {error}
          </h1>
        )}
        {data && (
          <>
            <h1>{data.title}</h1>
            <ReactMarkdown source={data.content} />
          </>
        )}
      </div>
    </div>,
    document.getElementById('modal'),
  );
}
