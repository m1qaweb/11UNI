
export const UI_TEXT = {

  navigation: {
    home: "მთავარი",
    about: "ჩვენს შესახებ",
    menu: "მენიუ",
    gallery: "გალერეა",
    contact: "კონტაქტი",
  },

  buttons: {
    submit: "გაგზავნა",
    close: "დახურვა",
    open: "გახსნა",
    viewMore: "მეტის ნახვა",
    reserve: "დაჯავშნა",
    send: "გაგზავნა",
    cancel: "გაუქმება",
    confirm: "დადასტურება",
    previous: "წინა",
    next: "შემდეგი",
  },

  form: {
    name: "სახელი",
    firstName: "სახელი",
    lastName: "გვარი",
    phone: "ტელეფონი",
    email: "ელ-ფოსტა",
    message: "შეტყობინება",
    messageType: "შეტყობინების ტიპი",
    required: "სავალდებულო ველი",
    optional: "არასავალდებულო",

    placeholders: {
      name: "შეიყვანეთ თქვენი სახელი",
      phone: "+995 XXX XXX XXX",
      email: "example@email.com",
      message: "დაწერეთ თქვენი შეტყობინება აქ...",
    },

    messageTypes: {
      reservation: "დაჯავშნა",
      inquiry: "შეკითხვა",
      feedback: "გამოხმაურება",
    },
  },

  messages: {
    success: "თქვენი შეტყობინება წარმატებით გაიგზავნა",
    error: "დაფიქსირდა შეცდომა. გთხოვთ სცადოთ მოგვიანებით",
    loading: "იტვირთება...",
    sending: "იგზავნება...",
    processing: "მუშავდება...",
    submitting: "გაგზავნა...",
  },

  errors: {
    required: "ეს ველი სავალდებულოა",
    invalidEmail: "გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა",
    invalidPhone: "გთხოვთ შეიყვანოთ სწორი ტელეფონის ნომერი",
    minLength: (min: number) => `მინიმუმ ${min} სიმბოლო`,
    maxLength: (max: number) => `მაქსიმუმ ${max} სიმბოლო`,
    networkError: "ქსელის შეცდომა. შეამოწმეთ ინტერნეტ კავშირი",
    serverError: "სერვერის შეცდომა. გთხოვთ სცადოთ მოგვიანებით",
    imageLoadError: "სურათი ვერ ჩაიტვირთა",
    formError: "გთხოვთ შეავსოთ ყველა სავალდებულო ველი",
  },

  days: {
    monday: "ორშაბათი",
    tuesday: "სამშაბათი",
    wednesday: "ოთხშაბათი",
    thursday: "ხუთშაბათი",
    friday: "პარასკევი",
    saturday: "შაბათი",
    sunday: "კვირა",
  },

  common: {
    welcome: "კეთილი იყოს თქვენი მობრძანება",
    thankYou: "გმადლობთ",
    pleaseWait: "გთხოვთ დაელოდოთ",
    backToHome: "დაბრუნება მთავარ გვერდზე",
    learnMore: "გაიგეთ მეტი",
    viewMenu: "მენიუს ნახვა",
    makeReservation: "დაჯავშნა",
    readMore: "ვრცლად",
    showLess: "ნაკლები",
  },

  a11y: {
    skipToContent: "გადასვლა შინაარსზე",
    closeModal: "მოდალური ფანჯრის დახურვა",
    openMenu: "მენიუს გახსნა",
    closeMenu: "მენიუს დახურვა",
    previousImage: "წინა სურათი",
    nextImage: "შემდეგი სურათი",
    mainNavigation: "მთავარი ნავიგაცია",
    socialMedia: "სოციალური მედია",
    closeLightbox: "სურათის დახურვა",
    openLightbox: "სურათის გახსნა",
    menuToggle: "მენიუს გადართვა",
  },

  notFound: {
    title: "გვერდი ვერ მოიძებნა",
    heading: "404 - გვერდი ვერ მოიძებნა",
    message: "თქვენ მიერ მოთხოვნილი გვერდი არ არსებობს.",
    goHome: "დაბრუნება მთავარ გვერდზე",
  },

  menuCategories: {
    all: "ყველა",
    appetizers: "წახემსები",
    salads: "სალათები",
    soups: "სუპები",
    mainCourses: "ძირითადი კერძები",
    meat: "ხორცის კერძები",
    fish: "თევზის კერძები",
    vegetarian: "ვეგეტარიანული კერძები",
    desserts: "დესერტები",
    beverages: "სასმელები",
    wine: "ღვინო",
    hotDrinks: "ცხელი სასმელები",
    coldDrinks: "ცივი სასმელები",
  },

  dishes: {
    khinkali: "ხინკალი",
    khachapuri: "ხაჭაპური",
    mtsvadi: "მწვადი",
    lobio: "ლობიო",
    pkhali: "ფხალი",
    badrijani: "ბადრიჯანი",
    satsivi: "საცივი",
    chakapuli: "ჩაქაფული",
    kharcho: "ხარჩო",
    churchkhela: "ჩურჩხელა",
    ajapsandali: "აჯაფსანდალი",
    ostri: "ოსტრი",
    shkmeruli: "შქმერული",
    chashushuli: "ჩაშუშული",
  },

  restaurantInfo: {
    address: "მისამართი",
    phone: "ტელეფონი",
    email: "ელ-ფოსტა",
    hours: "სამუშაო საათები",
    location: "მდებარეობა",
    aboutUs: "ჩვენს შესახებ",
    ourStory: "ჩვენი ისტორია",
    ourTeam: "ჩვენი გუნდი",
    ourMission: "ჩვენი მისია",
    ourValues: "ჩვენი ღირებულებები",
    contactUs: "დაგვიკავშირდით",
    findUs: "იპოვეთ ჩვენ",
    followUs: "გამოგვყევით",
  },

  gallery: {
    title: "გალერეა",
    viewAll: "ყველას ნახვა",
    categories: {
      all: "ყველა",
      food: "კერძები",
      interior: "ინტერიერი",
      atmosphere: "ატმოსფერო",
      events: "ღონისძიებები",
    },
  },

  contact: {
    title: "დაგვიკავშირდით",
    subtitle: "ჩვენ მზად ვართ დაგეხმაროთ",
    getInTouch: "დაგვიკავშირდით",
    sendMessage: "გაგზავნეთ შეტყობინება",
    visitUs: "ეწვიეთ ჩვენ",
    callUs: "დაგვირეკეთ",
    emailUs: "მოგვწერეთ",
  },

  about: {
    title: "ჩვენს შესახებ",
    subtitle: "ავთენტური ქართული სამზარეულო",
    tradition: "ტრადიცია",
    quality: "ხარისხი",
    hospitality: "სტუმართმოყვარეობა",
  },

  hero: {
    welcome: "კეთილი იყოს თქვენი მობრძანება",
    subtitle: "ავთენტური ქართული სამზარეულო",
    cta: "მენიუს ნახვა",
    reserve: "დაჯავშნა",
  },

  footer: {
    copyright: "© 2024 ყველა უფლება დაცულია",
    allRightsReserved: "ყველა უფლება დაცულია",
    privacyPolicy: "კონფიდენციალურობის პოლიტიკა",
    termsOfService: "მომსახურების პირობები",
  },

  social: {
    facebook: "ფეისბუქი",
    instagram: "ინსტაგრამი",
    twitter: "ტვიტერი",
    youtube: "იუთუბი",
    linkedin: "ლინკედინი",
    followUsOn: "გამოგვყევით",
  },

  currency: {
    lari: "₾",
    gel: "ლარი",
  },

  time: {
    am: "დილის",
    pm: "საღამოს",
    closed: "დახურულია",
    open: "ღიაა",
    hours: "საათი",
  },
} as const;

export type UITextKey = typeof UI_TEXT;

export const {
  navigation,
  buttons,
  form,
  messages,
  errors,
  days,
  common,
  a11y,
  notFound,
} = UI_TEXT;
