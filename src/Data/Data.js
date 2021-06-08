const data = [
  {
    id: 1,
    name: "Marks Full Cream Milk Powder",
    price: "10",
    img: "https://i.ibb.co/RDBSMg3/image-32.png",
    category: "food",
    description:
      "The customer is now on your page, looking for the perfect product that fits his/her need  The very last step is convincing the customer to click the “add to cart” button. Have a nice day to enjoy our products and services.",
  },
  {
    id: 2,
    name: "Moushum Bay Leaves-200gm",
    price: "30",
    img: "https://i.ibb.co/K65ZxnY/image-33.png",
    category: "vegetables",
    description:
      "The customer is now on your page, looking for the perfect product that fits his/her need  The very last step is convincing the customer to click the “add to cart” button. Have a nice day to enjoy our products and services.",
  },
  {
    id: 3,
    name: "Onion Local-1kg",
    price: "36",
    img: "https://i.ibb.co/VWngmq9/image-34.png",
    category: "vegetables",
    description:
      "The customer is now on your page, looking for the perfect product that fits his/her need  The very last step is convincing the customer to click the “add to cart” button. Have a nice day to enjoy our products and services.",
  },
  {
    id: 4,
    name: "Rashid Minicate Rice-1kg",
    price: "56",
    img: "https://i.ibb.co/2kWTt0s/image-35.png",
    category: "food",
    description:
      "The customer is now on your page, looking for the perfect product that fits his/her need  The very last step is convincing the customer to click the “add to cart” button. Have a nice day to enjoy our products and services.",
  },
  {
    id: 5,
    name: "Omera LPG Refill-12kg",
    price: "76",
    img: "https://i.ibb.co/jWPd9wj/image-36.png",
    category: "fuel",
    description:
      "The customer is now on your page, looking for the perfect product that fits his/her need  The very last step is convincing the customer to click the “add to cart” button. Have a nice day to enjoy our products and services.",
  },
  {
    id: 6,
    name: "Bombay Sweets Mr. Twist-25gm",
    price: "12",
    img: "https://i.ibb.co/MRWfndb/image-37.png",
    category: "food",
    description:
      "The customer is now on your page, looking for the perfect product that fits his/her need  The very last step is convincing the customer to click the “add to cart” button. Have a nice day to enjoy our products and services.",
  },
  {
    id: 7,
    name: "Lifebuoy Soap Bar tota-100gm",
    price: "15",
    img: "https://i.ibb.co/zF9k6BQ/image-38.png",
    category: "unilever",
    description:
      "The customer is now on your page, looking for the perfect product that fits his/her need  The very last step is convincing the customer to click the “add to cart” button. Have a nice day to enjoy our products and services.",
  },
  {
    id: 17,
    name: "Tragon-Rubbed-Salmon",
    price: "23.99",
    category: "food",
    img: "https://i.ibb.co/F7CKNrj/lunch1.png",
    description:
      "The customer is now on your page, looking for the perfect product that fits his/her need  The very last step is convincing the customer to click the “add to cart” button. Have a nice day to enjoy our products and services.",
  },
  {
    id: 8,
    name: "Ruchi BBQ Chanachur-350gm",
    price: "26",
    img: "https://i.ibb.co/m4GLxBh/image-39.png",
    category: "food",
    description:
      "The customer is now on your page, looking for the perfect product that fits his/her need  The very last step is convincing the customer to click the “add to cart” button. Have a nice day to enjoy our products and services.",
  },
  {
    id: 9,
    name: "Parachute Coconut Oil-200ml",
    price: "46",
    img: "https://i.ibb.co/mqQ454D/image-40.png",
    category: "oil",
    description:
      "The customer is now on your page, looking for the perfect product that fits his/her need  The very last step is convincing the customer to click the “add to cart” button. Have a nice day to enjoy our products and services.",
  },
  {
    id: 10,
    name: "iPhone 11",
    category: "mobile",
    price: "200",
    img: "https://i.ibb.co/3pN0VfZ/Apple-i-Phone-11-1-500x500.jpg",
    description:
      "The customer is now on your page, looking for the perfect product that fits his/her need  The very last step is convincing the customer to click the “add to cart” button. Have a nice day to enjoy our products and services.",
  },
  {
    id: 18,
    name: "Indian Lunch",
    price: "15.99",
    category: "food",
    img: "https://i.ibb.co/zGTrGFw/lunch2.png",
    description:
      "The customer is now on your page, looking for the perfect product that fits his/her need  The very last step is convincing the customer to click the “add to cart” button. Have a nice day to enjoy our products and services.",
  },
  {
    id: 16,
    name: "Fried Chicken Bento",
    price: "12.99",
    category: "food",
    img: "https://i.ibb.co/pX701Bg/lunch4.png",
    description:
      "The customer is now on your page, looking for the perfect product that fits his/her need  The very last step is convincing the customer to click the “add to cart” button. Have a nice day to enjoy our products and services.",
  },
  {
    id: 11,
    name: "Realme 8",
    category: "mobile",
    price: "130",
    img: "https://i.ibb.co/8ztJ3DK/Realme-8-Cyber-Silver.jpg",
    description:
      "The customer is now on your page, looking for the perfect product that fits his/her need  The very last step is convincing the customer to click the “add to cart” button. Have a nice day to enjoy our products and services.",
  },
  {
    id: 12,
    category: "mobile",
    name: "RealMe c17",
    price: "150",
    img: "https://i.ibb.co/3RHxZLg/download-1.jpg",
    description:
      "The customer is now on your page, looking for the perfect product that fits his/her need  The very last step is convincing the customer to click the “add to cart” button. Have a nice day to enjoy our products and services.",
  },
  {
    id: 13,
    category: "mobile",
    name: "Samsung a50",
    price: "120",
    img: "https://i.ibb.co/3CfmjYk/download.jpg",
    description:
      "The customer is now on your page, looking for the perfect product that fits his/her need  The very last step is convincing the customer to click the “add to cart” button. Have a nice day to enjoy our products and services.",
  },
  {
    id: 14,
    category: "mobile",
    name: "Xiaomi Note 10",
    price: "170",
    img: "https://i.ibb.co/8j3vKj5/download.jpg",
    description:
      "The customer is now on your page, looking for the perfect product that fits his/her need  The very last step is convincing the customer to click the “add to cart” button. Have a nice day to enjoy our products and services.",
  },
  {
    id: 15,
    name: "Healthy Meal Plan",
    price: "9.99",
    category: "food",
    img: "https://i.ibb.co/prFCj77/lunch3.png",
    description:
      "The customer is now on your page, looking for the perfect product that fits his/her need  The very last step is convincing the customer to click the “add to cart” button. Have a nice day to enjoy our products and services.",
  },
];
export default data;
