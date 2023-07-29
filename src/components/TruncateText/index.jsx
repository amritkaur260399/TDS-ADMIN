import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TruncateText(props) {
  const {
    lines,
    id,
    dangerouslySetInnerHTML,
    charCountForNotShowingButtons,
    buttonPosition,
    children,
    className,
  } = props;
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {!showMore ? (
        <div
          className={`${className} text-justify`}
          style={{
            '-webkit-line-clamp': lines,
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
            overflow: 'hidden',
          }}
        >
          {dangerouslySetInnerHTML ? (
            // eslint-disable-next-line react/no-danger
            <div dangerouslySetInnerHTML={{ __html: children }} />
          ) : (
            children
          )}
        </div>
      ) : (
        <div className={`${className} text-justify`}>
          {dangerouslySetInnerHTML ? (
            // eslint-disable-next-line react/no-danger
            <div dangerouslySetInnerHTML={{ __html: children }} />
          ) : (
            children
          )}
        </div>
      )}
      {!showMore && children?.length > charCountForNotShowingButtons && (
        <div
          className={buttonPosition === 'right' ? 'text-right' : 'text-left'}
          id={`show-more-${id}`}
          onClick={() => setShowMore(true)}
        >
          <a className="font-semibold text-blue-600 text-xs"> Show More </a>
        </div>
      )}
      {showMore && children?.length > charCountForNotShowingButtons && (
        <div
          className={buttonPosition === 'right' ? 'text-right' : 'text-left'}
          id={`show-less-${id}`}
          onClick={() => setShowMore(false)}
        >
          <a className="font-semibold text-blue-600 text-xs"> Show Less </a>
        </div>
      )}
    </>
  );
}
TruncateText.defaultProps = {
  lines: 2,
  id: 'text',
  dangerouslySetInnerHTML: false,
  charCountForNotShowingButtons: 180,
  buttonPosition: 'right',
};
TruncateText.propTypes = {
  /**
   * @param {lines} max number of lines can be displayed in truncate state
   */
  lines: PropTypes.string,
  /**
   * @param {id} holds unique id for the show-more or show-less link
   */
  id: PropTypes.string,
  /**
   * @param {charCountForNotShowingButtons} holds number of characters count
   * after which Show more button is visible
   */
  charCountForNotShowingButtons: PropTypes.number,
  /**
   * @param {dangerouslySetInnerHTML} holds flag whether to display html content or not
   */
  dangerouslySetInnerHTML: PropTypes.bool,
  /**
   * @param {buttonPosition} holds string poisiton as left or right
   * controls where to display the button
   */
  buttonPosition: PropTypes.string,
};

export default TruncateText;
