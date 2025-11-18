import type { RestaurantInfo, SocialLink } from "$lib/types";

export const socialLinks: SocialLink[] = [
  {
    platform: "facebook",
    url: "https://facebook.com/georgian-restaurant",
    label: "ფეისბუქი",
    icon: "facebook",
  },
  {
    platform: "instagram",
    url: "https://instagram.com/georgian-restaurant",
    label: "ინსტაგრამი",
    icon: "instagram",
  },
  {
    platform: "youtube",
    url: "https://youtube.com/@georgian-restaurant",
    label: "იუთუბი",
    icon: "youtube",
  },
];

export const restaurantInfo: RestaurantInfo = {
  name: "სანადიმო",
  tagline: "ავთენტური ქართული კერძები",
  description:
    "ჩვენ ვთავაზობთ ავთენტურ ქართულ კერძებს, რომლებიც მომზადებულია ტრადიციული რეცეპტებით და ახალი ინგრედიენტებით. ჩვენი რესტორანი არის იდეალური ადგილი ოჯახური სადილისთვის ან მეგობრებთან შეხვედრისთვის.",
  established: 2015,

  address: "რუსთაველის გამზირი 25",
  addressLine2: "მე-2 სართული",
  city: "თბილისი",
  postalCode: "0108",
  country: "საქართველო",

  phone: "+995 555 123 456",
  phoneFormatted: "+995 555 12 34 56",
  email: "info@georgian-restaurant.ge",

  hours: [
    {
      day: "ორშაბათი",
      hours: "12:00 - 23:00",
      isClosed: false,
    },
    {
      day: "სამშაბათი",
      hours: "12:00 - 23:00",
      isClosed: false,
    },
    {
      day: "ოთხშაბათი",
      hours: "12:00 - 23:00",
      isClosed: false,
    },
    {
      day: "ხუთშაბათი",
      hours: "12:00 - 23:00",
      isClosed: false,
    },
    {
      day: "პარასკევი",
      hours: "12:00 - 00:00",
      isClosed: false,
    },
    {
      day: "შაბათი",
      hours: "12:00 - 00:00",
      isClosed: false,
    },
    {
      day: "კვირა",
      hours: "12:00 - 22:00",
      isClosed: false,
    },
  ],

  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2977.2573155018!2d44.79379431542658!3d41.69411797923654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cd7e64f626b%3A0x4f907964122d4ac7!2sRustaveli%20Avenue%2C%20Tbilisi!5e0!3m2!1sen!2sge!4v1234567890",

  coordinates: {
    lat: 41.6941179,
    lng: 44.7959839,
  },

  social: socialLinks,
};

export const aboutContent = {
  title: 'ჩვენს შესახებ – "სანადიმო"',
  story: 'რესტორანი "სანადიმო" არის ქართული სამზარეულოსა და ტრადიციული სუფრის ადგილი თანამედროვე გარემოში. ჩვენთან შეგიძლიათ დაგეგმოთ როგორც ჩვეულებრივი სადილი, ისე ოჯახის ან მეგობრების პატარა ზეიმი.\n\nჩვენ ვამზადებთ კლასიკურ ქართულ კერძებს: ხინკალს, ხაჭაპურს, სხვადასხვა ტიპის მწვადს, ცხელ და ცივ საჭმელებს, სალათებსა და ხილის ნავებს. პროდუქტები მაქსიმალურად ადგილობრივია და კერძები მზადდება ყოველდღიურად, შეკვეთიდან.',
};

export function getFormattedAddress(): string {
  const { address, addressLine2, city, country } = restaurantInfo;
  return `${address}${
    addressLine2 ? ", " + addressLine2 : ""
  }, ${city}, ${country}`;
}

export function getTodaysHours(): string {
  const today = new Date().getDay();

  const dayIndex = today === 0 ? 6 : today - 1;
  const todayHours = restaurantInfo.hours[dayIndex];

  if (todayHours.isClosed) {
    return "დახურულია";
  }

  return todayHours.hours;
}

export function isRestaurantOpen(): boolean {
  const now = new Date();
  const today = now.getDay();
  const dayIndex = today === 0 ? 6 : today - 1;
  const todayHours = restaurantInfo.hours[dayIndex];

  if (todayHours.isClosed) {
    return false;
  }

  const currentTime = now.getHours() * 60 + now.getMinutes();
  const [openHour, openMin] = todayHours.hours
    .split(" - ")[0]
    .split(":")
    .map(Number);
  const [closeHour, closeMin] = todayHours.hours
    .split(" - ")[1]
    .split(":")
    .map(Number);

  const openTime = openHour * 60 + openMin;
  const closeTime = closeHour * 60 + closeMin;

  return currentTime >= openTime && currentTime <= closeTime;
}

export function getPhoneLink(): string {
  return `tel:${restaurantInfo.phone.replace(/\s/g, "")}`;
}

export function getEmailLink(): string {
  return `mailto:${restaurantInfo.email}`;
}
