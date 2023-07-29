//  * USA driver license formats.

export const US_DL = {
  Alabama: [
    {
      regex: /^[0-9]{1,8}$/,
      description: '1-8 numbers',
    },
  ],

  Alaska: [
    {
      regex: /^[0-9]{1,7}$/,
      description: '1-7 numbers',
    },
  ],
  Arizona: [
    {
      regex: /^[A-Z]{1}[0-9]{8,9}$/,
      description: '1 letter followed by 8-9 numbers',
    },
    {
      regex: /^[A-Z]{2}[0-9]{2,5}$/,
      description: '2 letters followed by 2-5 numbers',
    },
    {
      regex: /^[0-9]{9}$/,
      description: '9 numbers',
    },
  ],
  Arkansas: [
    {
      regex: /^[0-9]{4,9}$/,
      description: '4-9 numbers',
    },
  ],
  California: [
    {
      regex: /^[A-Z]{1}[0-9]{7}$/,
      description: '1 letter followed by 7 numbers',
    },
  ],
  Colorado: [
    {
      regex: /^[0-9]{9}$/,
      description: '9 numbers',
    },
    {
      regex: /^[A-Z]{1}[0-9]{3,6}$/,
      description: '1 letter followed by 3-6 numbers',
    },
    {
      regex: /^[A-Z]{2}[0-9]{2,5}$/,
      description: '2 letters followed by 2-5 numbers',
    },
  ],
  Connecticut: [
    {
      regex: /^[0-9]{9}$/,
      description: '9 numbers',
    },
  ],
  Delaware: [
    {
      regex: /^[0-9]{1,7}$/,
      description: '1-7 numbers',
    },
  ],
  DistrictofColumbia: [
    {
      regex: /^[0-9]{7}$/,
      description: '7 numbers',
    },
    {
      regex: /^[0-9]{9}$/,
      description: '9 numbers',
    },
  ],
  Florida: [
    {
      regex: /^[A-Z]{1}[0-9]{12}$/,
      description: '1 letter followed by 12 numbers',
    },
  ],
  Georgia: [
    {
      regex: /^[0-9]{7,9}$/,
      description: '7-9 numbers',
    },
  ],
  Hawaii: [
    {
      regex: /^[A-Z]{1}[0-9]{8}$/,
      description: '1 letter followed by 8 numbers',
    },
    {
      regex: /^[0-9]{9}$/,
      description: '9 numbers',
    },
  ],
  Idaho: [
    {
      regex: /^[A-Z]{2}[0-9]{6}[A-Z]{1}$/,
      description: '2 letters followed by 6 numbers followed by 1 letter',
    },
    {
      regex: /^[0-9]{9}$/,
      description: '9 numbers',
    },
  ],
  Illinois: [
    {
      regex: /^[A-Z]{1}[0-9]{11,12}$/,
      description: '1 letter followed by 11-12 numbers',
    },
  ],
  Indiana: [
    {
      regex: /^[A-Z]{1}[0-9]{9}$/,
      description: '1 letter followed by 9 numbers',
    },
    {
      regex: /^[0-9]{9,10}$/,
      description: '9-10 numbers',
    },
  ],
  Iowa: [
    {
      regex: /^[0-9]{9}$/,
      description: '9 numbers',
    },
    {
      regex: /^[0-9]{3}[A-Z]{2}[0-9]{4}$/,
      description: '3 numbers followed by 2 letters followed by 4 numbers',
    },
  ],
  Kansas: [
    {
      regex: /^([A-Z]{1}[0-9]{1}){2}[A-Z]{1}$/,
      description: '1 letter then 1 number then 1 letter then 1 number then 1 letter',
    },
    {
      regex: /^[A-Z]{1}[0-9]{8}$/,
      description: '1 letter followed by 8 numbers',
    },
    {
      regex: /^[0-9]{9}$/,
      description: '9 numbers',
    },
  ],
  Kentucky: [
    {
      regex: /^[A-Z]{1}[0-9]{8,9}$/,
      description: '1 letter followed by 8-9 numbers',
    },
    {
      regex: /^[0-9]{9}$/,
      description: '9 numbers',
    },
  ],
  Louisiana: [
    {
      regex: /^[0-9]{1,9}$/,
      description: '1-9 numbers',
    },
  ],
  Maine: [
    {
      regex: /^[0-9]{7}$/,
      description: '7 numbers',
    },
    {
      regex: /^[0-9]{7}[A-Z]{1}$/,
      description: '7 numbers followed by 1 letter',
    },
    {
      regex: /^[0-9]{8}$/,
      description: '8 numbers',
    },
  ],
  Maryland: [
    {
      regex: /^[A-Z]{1}[0-9]{12}$/,
      description: '1 letter followed by 12 numbers',
    },
  ],
  Massachusetts: [
    {
      regex: /^[A-Z]{1}[0-9]{8}$/,
      description: '1 letter followed by 8 numbers',
    },
    {
      regex: /^[0-9]{9}$/,
      description: '9 numbers',
    },
  ],
  Michigan: [
    {
      regex: /^[A-Z]{1}[0-9]{10}$/,
      description: '1 letter followed by 10 numbers',
    },
    {
      regex: /^[A-Z]{1}[0-9]{12}$/,
      description: '1 letter followed by 12 numbers',
    },
  ],
  Minnesota: [
    {
      regex: /^[A-Z]{1}[0-9]{12}$/,
      description: '1 letter followed by 12 numbers',
    },
  ],
  Mississippi: [
    {
      regex: /^[0-9]{9}$/,
      description: '9 numbers',
    },
  ],
  Missouri: [
    {
      regex: /^[A-Z]{1}[0-9]{5,9}$/,
      description: '1 letter followed by 5-9 numbers',
    },
    {
      regex: /^[A-Z]{1}[0-9]{6}[R]{1}$/,
      description: '1 letter followed by 6 numbers followed by "R"',
    },
    {
      regex: /^[0-9]{8}[A-Z]{2}$/,
      description: '8 numbers followed by 2 letters',
    },
    {
      regex: /^[0-9]{9}[A-Z]{1}$/,
      description: '9 numbers followed by 1 letter',
    },
    {
      regex: /^[0-9]{9}$/,
      description: '9 numbers',
    },
    {
      regex: /^[0-9]{3}[A-Z]{1}[0-9]{6}$/,
      description: '3 numbers followed by 1 letter followed by 6 numbers',
    },
  ],
  Montana: [
    {
      regex: /^[A-Z]{1}[0-9]{8}$/,
      description: '1 letter followed by 8 numbers',
    },
    {
      regex: /^[0-9]{13}$/,
      description: '13 numbers',
    },
    {
      regex: /^[0-9]{9}$/,
      description: '9 numbers',
    },
    {
      regex: /^[0-9]{14}$/,
      description: '14 numbers',
    },
  ],
  Nebraska: [
    {
      regex: /^[A-Z]{1}[0-9]{6,8}$/,
      description: '1 letter followed by 6-8 numbers',
    },
  ],
  Nevada: [
    {
      regex: /^[0-9]{9,10}$/,
      description: '9-10 numbers',
    },
    {
      regex: /^[0-9]{12}$/,
      description: '12 numbers',
    },
    {
      regex: /^[X]{1}[0-9]{8}$/,
      description: '"X" followed by 8 numbers',
    },
  ],
  NewHampshire: [
    {
      regex: /^[0-9]{2}[A-Z]{3}[0-9]{5}$/,
      description: '2 numbers followed by 3 letters followed by 5 numbers',
    },
  ],
  NewJersey: [
    {
      regex: /^[A-Z]{1}[0-9]{14}$/,
      description: '1 letter followed by 14 numbers',
    },
  ],
  NewMexico: [
    {
      regex: /^[0-9]{8,9}$/,
      description: '8-9 numbers',
    },
  ],
  NewYork: [
    {
      regex: /^[A-Z]{1}[0-9]{7}$/,
      description: '1 letter followed by 7 numbers',
    },
    {
      regex: /^[A-Z]{1}[0-9]{18}$/,
      description: '1 letter followed by 18 numbers',
    },
    {
      regex: /^[0-9]{8,9}$/,
      description: '8-9 numbers',
    },
    {
      regex: /^[0-9]{16}$/,
      description: '16 numbers',
    },
    {
      regex: /^[A-Z]{8}$/,
      description: '8 letters',
    },
  ],
  NorthCarolina: [
    {
      regex: /^[0-9]{1,12}$/,
      description: '1-12 numbers',
    },
  ],
  NorthDakota: [
    {
      regex: /^[A-Z]{3}[0-9]{6}$/,
      description: '3 letters followed by 6 numbers',
    },
    {
      regex: /^[0-9]{9}$/,
      description: '9 numbers',
    },
  ],
  Ohio: [
    {
      regex: /^[A-Z]{1}[0-9]{4,8}$/,
      description: '1 letter followed by 4-8 numbers',
    },
    {
      regex: /^[A-Z]{2}[0-9]{3,7}$/,
      description: '2 letters followed by 3-7 numbers',
    },
    {
      regex: /^[0-9]{8}$/,
      description: '8 numbers',
    },
  ],
  Oklahoma: [
    {
      regex: /^[A-Z]{1}[0-9]{9}$/,
      description: '1 letter followed by 9 numbers',
    },
    {
      regex: /^[0-9]{9}$/,
      description: '9 numbers',
    },
  ],
  Oregon: [
    {
      regex: /^[0-9]{1,9}$/,
      description: '1-9 numbers',
    },
  ],
  Pennsylvania: [
    {
      regex: /^[0-9]{8}$/,
      description: '8 numbers',
    },
  ],
  RhodeIsland: [
    {
      regex: /^[0-9]{7}$/,
      description: '7 numbers',
    },
    {
      regex: /^[A-Z]{1}[0-9]{6}$/,
      description: '1 letter followed by 6 numbers',
    },
  ],
  SouthCarolina: [
    {
      regex: /^[0-9]{5,11}$/,
      description: '5-11 numbers',
    },
  ],
  SouthDakota: [
    {
      regex: /^[0-9]{6,10}$/,
      description: '6-10 numbers',
    },
    {
      regex: /^[0-9]{12}$/,
      description: '12 numbers',
    },
  ],
  Tennessee: [
    {
      regex: /^[0-9]{7,9}$/,
      description: '7-9 numbers',
    },
  ],
  Texas: [
    {
      regex: /^[0-9]{7,8}$/,
      description: '7-8 numbers',
    },
  ],
  Utah: [
    {
      regex: /^[0-9]{4,10}$/,
      description: '4-10 numbers',
    },
  ],
  Vermont: [
    {
      regex: /^[0-9]{8}$/,
      description: '8 numbers',
    },
    {
      regex: /^[0-9]{7}[A]$/,
      description: '7 numbers followed by "A"',
    },
  ],
  Virginia: [
    {
      regex: /^[A-Z]{1}[0-9]{8,11}$/,
      description: '1 letter followed by 8-11 numbers',
    },
    {
      regex: /^[0-9]{9}$/,
      description: '9 numbers',
    },
  ],
  Washington: [
    {
      regex: /^(?=.{12}$)[A-Z]{1,7}[A-Z0-9\\*]{4,11}$/,
      description:
        '1-7 letters followed by any combination of letters, numbers, or "*" for a total of 12 characters',
    },
  ],
  WestVirginia: [
    {
      regex: /^[0-9]{7}$/,
      description: '7 numbers',
    },
    {
      regex: /^[A-Z]{1,2}[0-9]{5,6}$/,
      description: '1-2 letters followed by 5-6 numbers',
    },
  ],
  Wisconsin: [
    {
      regex: /^[A-Z]{1}[0-9]{13}$/,
      description: '1 letter followed by 13 numbers',
    },
  ],
  Wyoming: [
    {
      regex: /^[0-9]{9,10}$/,
      description: '9-10 numbers',
    },
  ],
};

export const patternsUS = [
  /^[0-9]{1,8}$/,

  /^[0-9]{1,7}$/,

  /^[A-Z]{1}[0-9]{8,9}$/,

  /^[A-Z]{2}[0-9]{2,5}$/,

  /^[0-9]{9}$/,

  /^[0-9]{4,9}$/,

  /^[A-Z]{1}[0-9]{7}$/,

  /^[0-9]{9}$/,

  /^[A-Z]{1}[0-9]{3,6}$/,

  /^[A-Z]{2}[0-9]{2,5}$/,

  /^[0-9]{9}$/,

  /^[0-9]{1,7}$/,

  /^[0-9]{7}$/,

  /^[0-9]{9}$/,

  /^[A-Z]{1}[0-9]{12}$/,

  /^[0-9]{7,9}$/,

  /^[A-Z]{1}[0-9]{8}$/,

  /^[0-9]{9}$/,

  /^[A-Z]{2}[0-9]{6}[A-Z]{1}$/,

  /^[0-9]{9}$/,

  /^[A-Z]{1}[0-9]{11,12}$/,

  /^[A-Z]{1}[0-9]{9}$/,

  /^[0-9]{9,10}$/,

  /^[0-9]{9}$/,

  /^[0-9]{3}[A-Z]{2}[0-9]{4}$/,

  /^([A-Z]{1}[0-9]{1}){2}[A-Z]{1}$/,

  /^[A-Z]{1}[0-9]{8}$/,

  /^[0-9]{9}$/,

  /^[A-Z]{1}[0-9]{8,9}$/,

  /^[0-9]{9}$/,

  /^[0-9]{1,9}$/,

  /^[0-9]{7}$/,

  /^[0-9]{7}[A-Z]{1}$/,

  /^[0-9]{8}$/,

  /^[A-Z]{1}[0-9]{12}$/,

  /^[A-Z]{1}[0-9]{8}$/,

  /^[0-9]{9}$/,

  /^[A-Z]{1}[0-9]{10}$/,

  /^[A-Z]{1}[0-9]{12}$/,

  /^[A-Z]{1}[0-9]{12}$/,

  /^[0-9]{9}$/,

  /^[A-Z]{1}[0-9]{5,9}$/,

  /^[A-Z]{1}[0-9]{6}[R]{1}$/,

  /^[0-9]{8}[A-Z]{2}$/,

  /^[0-9]{9}[A-Z]{1}$/,

  /^[0-9]{9}$/,

  /^[0-9]{3}[A-Z]{1}[0-9]{6}$/,

  /^[A-Z]{1}[0-9]{8}$/,

  /^[0-9]{13}$/,

  /^[0-9]{9}$/,

  /^[0-9]{14}$/,

  /^[A-Z]{1}[0-9]{6,8}$/,

  /^[0-9]{9,10}$/,

  /^[0-9]{12}$/,

  /^[X]{1}[0-9]{8}$/,

  /^[0-9]{2}[A-Z]{3}[0-9]{5}$/,

  /^[A-Z]{1}[0-9]{14}$/,

  /^[0-9]{8,9}$/,

  /^[A-Z]{1}[0-9]{7}$/,

  /^[A-Z]{1}[0-9]{18}$/,

  /^[0-9]{8,9}$/,

  /^[0-9]{16}$/,

  /^[A-Z]{8}$/,

  /^[0-9]{1,12}$/,

  /^[A-Z]{3}[0-9]{6}$/,

  /^[0-9]{9}$/,

  /^[A-Z]{1}[0-9]{4,8}$/,

  /^[A-Z]{2}[0-9]{3,7}$/,

  /^[0-9]{8}$/,

  /^[A-Z]{1}[0-9]{9}$/,

  /^[0-9]{9}$/,

  /^[0-9]{1,9}$/,

  /^[0-9]{8}$/,

  /^[0-9]{7}$/,

  /^[A-Z]{1}[0-9]{6}$/,

  /^[0-9]{5,11}$/,

  /^[0-9]{6,10}$/,

  /^[0-9]{12}$/,

  /^[0-9]{7,9}$/,

  /^[0-9]{7,8}$/,

  /^[0-9]{4,10}$/,

  /^[0-9]{8}$/,

  /^[0-9]{7}[A]$/,

  /^[A-Z]{1}[0-9]{8,11}$/,

  /^[0-9]{9}$/,

  /^(?=.{12}$)[A-Z]{1,7}[A-Z0-9\\*]{4,11}$/,

  /^[0-9]{7}$/,

  /^[A-Z]{1,2}[0-9]{5,6}$/,

  /^[A-Z]{1}[0-9]{13}$/,

  /^[0-9]{9,10}$/,
];
