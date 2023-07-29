import { convertToRaw, ContentState, EditorState } from 'draft-js';
import moment from 'moment';
import DraftJSToHTML from 'draftjs-to-html';
import HTMLToDraftJS from 'html-to-draftjs';
import { getPageQuery } from './utils';

export const getTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getInitials = (name) => {
  if (name) {
    let initials = name.match(/\b\w/g) || [];
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    return initials;
  }
  return '';
};

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

// input - +919876543210 or 9876543210
export const formatPhoneFromString = (country_code, phone) => {
  if (!phone) return null;
  if (phone.startsWith(country_code)) {
    // eslint-disable-next-line no-param-reassign
    phone = phone.replace(country_code, '');
  }
  return `${country_code} ${phone.substring(0, 5)}-${phone.substring(5)}`;
};

// converts the wysiwyg editor state to html
export const convertStateToHTML = (editorState) => {
  if (editorState) {
    return DraftJSToHTML(convertToRaw(editorState.getCurrentContent()));
  }
  return '';
};

// converts the html back to draft js editor state
export const convertHTMLToState = (html) => {
  if (html) {
    const contentBlock = HTMLToDraftJS(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      return editorState;
    }
  }
  return '';
};

// call this function, passing-in your date
export const dateToFromNowDaily = (date) => {
  // get from-now for this date
  const fromNow = moment(date).fromNow();
  // ensure the date is displayed with today and yesterday
  return moment(date).calendar(null, {
    // when the date is closer, specify custom values
    lastWeek: '[Last] dddd',
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    sameElse: () => `[${fromNow}]`,
  });
};

const colors = {
  ordered: {
    text: 'green',
    bg: 'green',
  },
  active: {
    text: '#0A4933',
    bg: '#D7F5EA',
  },
  expired: {
    text: '#6F2323',
    bg: '#FFE0E0',
  },
  draft: {
    text: '#45400E',
    bg: '#FBF8DE',
  },
};

export function getTagColor(status) {
  if (status && status !== '') {
    let color;
    switch (status) {
      case 'QUO_DRAFT':
        color = colors.draft.bg;
        break;
      case 'QUO_CREATED':
        color = colors.active.bg;
        break;
      case 'QUO_EXPIRED':
        color = colors.expired.bg;
        break;
      case 'QUOTES_ARCHIVED':
        color = colors.expired.bg;
        break;
      case 'QUO_ORDERED':
        color = colors.ordered.bg;
        break;
      default:
        color = colors.draft.bg;
    }
    return color;
  }
  return 'orange';
}
export function getTagTextColor(status) {
  if (status && status !== '') {
    let color;
    switch (status) {
      case 'QUO_DRAFT':
        color = colors.draft.text;
        break;
      case 'QUO_CREATED':
        color = colors.active.text;
        break;
      case 'QUO_EXPIRED':
        color = colors.expired.text;
        break;
      case 'QUOTES_ARCHIVED':
        color = colors.expired.text;
        break;
      case 'QUO_ORDERED':
        color = colors.ordered.text;
        break;
      default:
        color = colors.draft.text;
    }
    return color;
  }
  return 'orange';
}

export function decodeDollarsToDigits(usd) {
  let usdCurrency = usd;
  if (!usd) {
    return '';
  }
  if (usd.indexOf('.') > 0) {
    usdCurrency = usd.substring(0, usd.indexOf('.'));
  }
  if (usdCurrency) {
    return `${usdCurrency.replace(/[^\d]/g, '')}${usd.substring(usd.indexOf('.'))}`;
  }
  return '';
}

export function decodeDhiramToNumber(amount) {
  let amountCurrency = amount;

  if (!amount) {
    return '';
  }

  if (!amount?.includes('.')) {
    return amount;
  }

  if (amount?.indexOf('.') > 0) {
    amountCurrency = amount?.substring(0, amount?.indexOf('.'));
  }

  if (amountCurrency) {
    return `${amountCurrency?.replace(/[^\d]/g, '')}`;
  }
}

export function getRedirectURL(cb) {
  const urlParams = new URL(window.location.href);
  const params = getPageQuery();
  let { redirect } = params;

  if (redirect) {
    const redirectUrlParams = new URL(redirect);

    if (redirectUrlParams.origin === urlParams.origin) {
      redirect = redirect.substr(urlParams.origin.length);

      if (redirect.match(/^\/.*#/)) {
        redirect = redirect.substr(redirect.indexOf('#') + 1);
      }
      cb(redirect);
    } else {
      window.location.href = redirect;
    }
  }
}
