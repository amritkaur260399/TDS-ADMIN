export const emailValidation = (inp) => {
    if (inp) {
      return inp.replace(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
      // .replace(/\s/g, "");
    }
    return '';
  };