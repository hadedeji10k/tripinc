//we need to inject this somehow
export const runtimeEnvironment = "test";

//dev
export const devTripServiceUrl = "http://localhost:21200";
export const devUserServiceUrl = "http://localhost:21000";
export const devOnboardingServiceUrl = "http://localhost:21100";
//test
export const testTripServiceUrl = "https://test-tripservice.tripinc.co";
export const testUserServiceUrl = "https://test-usersecurity.tripinc.co";
export const testOnboardingServiceUrl = "https://test-onboarding.tripinc.co";
//prod
export const tripServiceUrl = "https://tripservice.tripinc.co";
export const userServiceUrl = "https://usersecurity.tripinc.co";
export const onboardingServiceUrl = "https://onboarding.tripinc.co";

export const GoogleLoginClientId = window.tripInc?.REACT_APP_GOOGLE_CLIENT_ID;
export const GoogleProviderKey = window.tripInc?.REACT_APP_GOOGLE_PROVIDER_ID;
export const CitiesPageSize = 100
export const GOOGLEAPIKEY = window.tripInc?.REACT_APP_GOOGLE_API_KEY
export const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
export const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
export const fullMonthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]
export const stripeTestKey = window.tripInc?.REACT_APP_STRIPE_TEST_PUBLIC_KEY
export const stripeLiveKey = window.tripInc?.REACT_APP_STRIPE_LIVE_PUBLIC_KEY
export const currencyList = [
    {
        Name: "Afghan Afghani",
        Code: "AFN",
        Symbol: "AFN"
    },
    {
        Name: "Albanian Lek",
        Code: "ALL",
        Symbol: "ALL"
    },
    {
        Name: "Algerian Dinar",
        Code: "DZD",
        Symbol: "DZD"
    },
    {
        Name: "Angolan Kwanza",
        Code: "AOA",
        Symbol: "AOA"
    },
    {
        Name: "Argentine Peso",
        Code: "ARS",
        Symbol: "ARS"
    },
    {
        Name: "Armenian Dram",
        Code: "AMD",
        Symbol: "AMD"
    },
    {
        Name: "Aruban Florin",
        Code: "AWG",
        Symbol: "AWG"
    },
    {
        Name: "Australian Dollar",
        Code: "AUD",
        Symbol: "AUD"
    },
    {
        Name: "Azerbaijani Manat",
        Code: "AZN",
        Symbol: "AZN"
    },
    {
        Name: "Bahamian Dollar",
        Code: "BSD",
        Symbol: "BSD"
    },
    {
        Name: "Bahraini Dinar",
        Code: "BHD",
        Symbol: "BHD"
    },
    {
        Name: "Bangladeshi Taka",
        Code: "BDT",
        Symbol: "BDT"
    },
    {
        Name: "Barbadian Dollar",
        Code: "BBD",
        Symbol: "BBD"
    },
    {
        Name: "Belarusian Ruble",
        Code: "BYR",
        Symbol: "BYR"
    },
    {
        Name: "Belize Dollar",
        Code: "BZD",
        Symbol: "BZD"
    },
    {
        Name: "Bermudan Dollar",
        Code: "BMD",
        Symbol: "BMD"
    },
    {
        Name: "Bhutanese Ngultrum",
        Code: "BTN",
        Symbol: "BTN"
    },
    {
        Name: "Bitcoin",
        Code: "BTC",
        Symbol: "BTC"
    },
    {
        Name: "Bolivian Boliviano",
        Code: "BOB",
        Symbol: "BOB"
    },
    {
        Name: "Bosnia-Herzegovina Convertible Mark",
        Code: "BAM",
        Symbol: "BAM"
    },
    {
        Name: "Botswanan Pula",
        Code: "BWP",
        Symbol: "BWP"
    },
    {
        Name: "Brazilian Real",
        Code: "BRL",
        Symbol: "BRL"
    },
    {
        Name: "British Pound Sterling",
        Code: "GBP",
        Symbol: "£"
    },
    {
        Name: "Brunei Dollar",
        Code: "BND",
        Symbol: "BND"
    },
    {
        Name: "Bulgarian Lev",
        Code: "BGN",
        Symbol: "BGN"
    },
    {
        Name: "Burundian Franc",
        Code: "BIF",
        Symbol: "BIF"
    },
    {
        Name: "Cambodian Riel",
        Code: "KHR",
        Symbol: "KHR"
    },
    {
        Name: "Canadian Dollar",
        Code: "CAD",
        Symbol: "CAD"
    },
    {
        Name: "Cape Verdean Escudo",
        Code: "CVE",
        Symbol: "CVE"
    },
    {
        Name: "Cayman Islands Dollar",
        Code: "KYD",
        Symbol: "KYD"
    },
    {
        Name: "CFA Franc BCEAO",
        Code: "XOF",
        Symbol: "XOF"
    },
    {
        Name: "CFA Franc BEAC",
        Code: "XAF",
        Symbol: "XAF"
    },
    {
        Name: "CFP Franc",
        Code: "XPF",
        Symbol: "XPF"
    },
    {
        Name: "Chilean Peso",
        Code: "CLP",
        Symbol: "CLP"
    },
    {
        Name: "Chilean Unit of Account",
        Code: "CLF",
        Symbol: "CLF"
    },
    {
        Name: "Chinese Yuan",
        Code: "CNY",
        Symbol: "CNY"
    },
    {
        Name: "CNH",
        Code: "CNH",
        Symbol: "CNH"
    },
    {
        Name: "Colombian Peso",
        Code: "COP",
        Symbol: "COP"
    },
    {
        Name: "Comorian Franc",
        Code: "KMF",
        Symbol: "KMF"
    },
    {
        Name: "Congolese Franc",
        Code: "CDF",
        Symbol: "CDF"
    },
    {
        Name: "Costa Rican Colón",
        Code: "CRC",
        Symbol: "CRC"
    },
    {
        Name: "Croatian Kuna",
        Code: "HRK",
        Symbol: "HRK"
    },
    {
        Name: "Cuban Peso",
        Code: "CUP",
        Symbol: "CUP"
    },
    {
        Name: "Czech Republic Koruna",
        Code: "CZK",
        Symbol: "CZK"
    },
    {
        Name: "Danish Krone",
        Code: "DKK",
        Symbol: "DKK"
    },
    {
        Name: "Djiboutian Franc",
        Code: "DJF",
        Symbol: "DJF"
    },
    {
        Name: "Dominican Peso",
        Code: "DOP",
        Symbol: "DOP"
    },
    {
        Name: "East Caribbean Dollar",
        Code: "XCD",
        Symbol: "XCD"
    },
    {
        Name: "Egyptian Pound",
        Code: "EGP",
        Symbol: "EGP"
    },
    {
        Name: "Eritrean Nakfa",
        Code: "ERN",
        Symbol: "ERN"
    },
    {
        Name: "Ethiopian Birr",
        Code: "ETB",
        Symbol: "ETB"
    },
    {
        Name: "Euro",
        Code: "EUR",
        Symbol: "\u20ac"
    },
    {
        Name: "Falkland Islands Pound",
        Code: "FKP",
        Symbol: "FKP"
    },
    {
        Name: "Fijian Dollar",
        Code: "FJD",
        Symbol: "FJD"
    },
    {
        Name: "Finnish Markka",
        Code: "FIM",
        Symbol: "FIM"
    },
    {
        Name: "French Franc",
        Code: "FRF",
        Symbol: "FRF"
    },
    {
        Name: "Gambian Dalasi",
        Code: "GMD",
        Symbol: "GMD"
    },
    {
        Name: "Georgian Lari",
        Code: "GEL",
        Symbol: "GEL"
    },
    {
        Name: "German Mark",
        Code: "DEM",
        Symbol: "DEM"
    },
    {
        Name: "Ghanaian Cedi",
        Code: "GHS",
        Symbol: "GHS"
    },
    {
        Name: "Gibraltar Pound",
        Code: "GIP",
        Symbol: "GIP"
    },
    {
        Name: "Guatemalan Quetzal",
        Code: "GTQ",
        Symbol: "GTQ"
    },
    {
        Name: "Guinean Franc",
        Code: "GNF",
        Symbol: "GNF"
    },
    {
        Name: "Guyanaese Dollar",
        Code: "GYD",
        Symbol: "GYD"
    },
    {
        Name: "Haitian Gourde",
        Code: "HTG",
        Symbol: "HTG"
    },
    {
        Name: "Honduran Lempira",
        Code: "HNL",
        Symbol: "HNL"
    },
    {
        Name: "Hong Kong Dollar",
        Code: "HKD",
        Symbol: "HKD"
    },
    {
        Name: "Hungarian Forint",
        Code: "HUF",
        Symbol: "HUF"
    },
    {
        Name: "Icelandic Króna",
        Code: "ISK",
        Symbol: "ISK"
    },
    {
        Name: "Indian Rupee",
        Code: "INR",
        Symbol: "INR"
    },
    {
        Name: "Indonesian Rupiah",
        Code: "IDR",
        Symbol: "IDR"
    },
    {
        Name: "Iranian Rial",
        Code: "IRR",
        Symbol: "IRR"
    },
    {
        Name: "Iraqi Dinar",
        Code: "IQD",
        Symbol: "IQD"
    },
    {
        Name: "Irish Pound",
        Code: "IEP",
        Symbol: "IEP"
    },
    {
        Name: "Israeli New Sheqel",
        Code: "ILS",
        Symbol: "ILS"
    },
    {
        Name: "Italian Lira",
        Code: "ITL",
        Symbol: "ITL"
    },
    {
        Name: "Jamaican Dollar",
        Code: "JMD",
        Symbol: "JMD"
    },
    {
        Name: "Japanese Yen",
        Code: "JPY",
        Symbol: "¥"
    },
    {
        Name: "Jordanian Dinar",
        Code: "JOD",
        Symbol: "JOD"
    },
    {
        Name: "Kazakhstani Tenge",
        Code: "KZT",
        Symbol: "KZT"
    },
    {
        Name: "Kenyan Shilling",
        Code: "KES",
        Symbol: "KES"
    },
    {
        Name: "Kuwaiti Dinar",
        Code: "KWD",
        Symbol: "KWD"
    },
    {
        Name: "Kyrgystani Som",
        Code: "KGS",
        Symbol: "KGS"
    },
    {
        Name: "Laotian Kip",
        Code: "LAK",
        Symbol: "LAK"
    },
    {
        Name: "Latvian Lats",
        Code: "LVL",
        Symbol: "LVL"
    },
    {
        Name: "Lebanese Pound",
        Code: "LBP",
        Symbol: "LBP"
    },
    {
        Name: "Lesotho Loti",
        Code: "LSL",
        Symbol: "LSL"
    },
    {
        Name: "Liberian Dollar",
        Code: "LRD",
        Symbol: "LRD"
    },
    {
        Name: "Libyan Dinar",
        Code: "LYD",
        Symbol: "LYD"
    },
    {
        Name: "Lithuanian Litas",
        Code: "LTL",
        Symbol: "LTL"
    },
    {
        Name: "Macanese Pataca",
        Code: "MOP",
        Symbol: "MOP"
    },
    {
        Name: "Macedonian Denar",
        Code: "MKD",
        Symbol: "MKD"
    },
    {
        Name: "Malagasy Ariary",
        Code: "MGA",
        Symbol: "MGA"
    },
    {
        Name: "Malawian Kwacha",
        Code: "MWK",
        Symbol: "MWK"
    },
    {
        Name: "Malaysian Ringgit",
        Code: "MYR",
        Symbol: "MYR"
    },
    {
        Name: "Maldivian Rufiyaa",
        Code: "MVR",
        Symbol: "MVR"
    },
    {
        Name: "Mauritanian Ouguiya",
        Code: "MRO",
        Symbol: "MRO"
    },
    {
        Name: "Mauritian Rupee",
        Code: "MUR",
        Symbol: "MUR"
    },
    {
        Name: "Mexican Peso",
        Code: "MXN",
        Symbol: "MXN"
    },
    {
        Name: "Moldovan Leu",
        Code: "MDL",
        Symbol: "MDL"
    },
    {
        Name: "Mongolian Tugrik",
        Code: "MNT",
        Symbol: "MNT"
    },
    {
        Name: "Moroccan Dirham",
        Code: "MAD",
        Symbol: "MAD"
    },
    {
        Name: "Mozambican Metical",
        Code: "MZN",
        Symbol: "MZN"
    },
    {
        Name: "Myanmar Kyat",
        Code: "MMK",
        Symbol: "MMK"
    },
    {
        Name: "Namibian Dollar",
        Code: "NAD",
        Symbol: "NAD"
    },
    {
        Name: "Nepalese Rupee",
        Code: "NPR",
        Symbol: "NPR"
    },
    {
        Name: "Netherlands Antillean Guilder",
        Code: "ANG",
        Symbol: "ANG"
    },
    {
        Name: "New Taiwan Dollar",
        Code: "TWD",
        Symbol: "TWD"
    },
    {
        Name: "New Zealand Dollar",
        Code: "NZD",
        Symbol: "NZD"
    },
    {
        Name: "Nicaraguan Córdoba",
        Code: "NIO",
        Symbol: "NIO"
    },
    {
        Name: "Nigerian Naira",
        Code: "NGN",
        Symbol: "NGN"
    },
    {
        Name: "North Korean Won",
        Code: "KPW",
        Symbol: "KPW"
    },
    {
        Name: "Norwegian Krone",
        Code: "NOK",
        Symbol: "NOK"
    },
    {
        Name: "Omani Rial",
        Code: "OMR",
        Symbol: "OMR"
    },
    {
        Name: "Pakistani Rupee",
        Code: "PKR",
        Symbol: "Rs"
    },
    {
        Name: "Panamanian Balboa",
        Code: "PAB",
        Symbol: "PAB"
    },
    {
        Name: "Papua New Guinean Kina",
        Code: "PGK",
        Symbol: "PGK"
    },
    {
        Name: "Paraguayan Guarani",
        Code: "PYG",
        Symbol: "PYG"
    },
    {
        Name: "Peruvian Nuevo Sol",
        Code: "PEN",
        Symbol: "PEN"
    },
    {
        Name: "Philippine Peso",
        Code: "PHP",
        Symbol: "PHP"
    },
    {
        Name: "PKG",
        Code: "PKG",
        Symbol: "PKG"
    },
    {
        Name: "Polish Zloty",
        Code: "PLN",
        Symbol: "PLN"
    },
    {
        Name: "Qatari Rial",
        Code: "QAR",
        Symbol: "QAR"
    },
    {
        Name: "Romanian Leu",
        Code: "RON",
        Symbol: "RON"
    },
    {
        Name: "Russian Ruble",
        Code: "RUB",
        Symbol: "RUB"
    },
    {
        Name: "Rwandan Franc",
        Code: "RWF",
        Symbol: "RWF"
    },
    {
        Name: "Saint Helena Pound",
        Code: "SHP",
        Symbol: "SHP"
    },
    {
        Name: "Salvadoran Colón",
        Code: "SVC",
        Symbol: "SVC"
    },
    {
        Name: "Samoan Tala",
        Code: "WST",
        Symbol: "WST"
    },
    {
        Name: "São Tomé and Príncipe Dobra",
        Code: "STD",
        Symbol: "STD"
    },
    {
        Name: "Saudi Riyal",
        Code: "SAR",
        Symbol: "SAR"
    },
    {
        Name: "Serbian Dinar",
        Code: "RSD",
        Symbol: "RSD"
    },
    {
        Name: "Seychellois Rupee",
        Code: "SCR",
        Symbol: "SCR"
    },
    {
        Name: "Sierra Leonean Leone",
        Code: "SLL",
        Symbol: "SLL"
    },
    {
        Name: "Singapore Dollar",
        Code: "SGD",
        Symbol: "SGD"
    },
    {
        Name: "Solomon Islands Dollar",
        Code: "SBD",
        Symbol: "SBD"
    },
    {
        Name: "Somali Shilling",
        Code: "SOS",
        Symbol: "SOS"
    },
    {
        Name: "South African Rand",
        Code: "ZAR",
        Symbol: "ZAR"
    },
    {
        Name: "South Korean Won",
        Code: "KRW",
        Symbol: "KRW"
    },
    {
        Name: "Special Drawing Rights",
        Code: "XDR",
        Symbol: "XDR"
    },
    {
        Name: "Sri Lankan Rupee",
        Code: "LKR",
        Symbol: "LKR"
    },
    {
        Name: "Sudanese Pound",
        Code: "SDG",
        Symbol: "SDG"
    },
    {
        Name: "Surinamese Dollar",
        Code: "SRD",
        Symbol: "SRD"
    },
    {
        Name: "Swazi Lilangeni",
        Code: "SZL",
        Symbol: "SZL"
    },
    {
        Name: "Swedish Krona",
        Code: "SEK",
        Symbol: "SEK"
    },
    {
        Name: "Swiss Franc",
        Code: "CHF",
        Symbol: "CHF"
    },
    {
        Name: "Syrian Pound",
        Code: "SYP",
        Symbol: "SYP"
    },
    {
        Name: "Tajikistani Somoni",
        Code: "TJS",
        Symbol: "TJS"
    },
    {
        Name: "Tanzanian Shilling",
        Code: "TZS",
        Symbol: "TZS"
    },
    {
        Name: "Thai Baht",
        Code: "THB",
        Symbol: "THB"
    },
    {
        Name: "Tongan Pa'anga",
        Code: "TOP",
        Symbol: "TOP"
    },
    {
        Name: "Trinidad and Tobago Dollar",
        Code: "TTD",
        Symbol: "TTD"
    },
    {
        Name: "Tunisian Dinar",
        Code: "TND",
        Symbol: "TND"
    },
    {
        Name: "Turkish Lira",
        Code: "TRY",
        Symbol: "TRY"
    },
    {
        Name: "Turkmenistani Manat",
        Code: "TMT",
        Symbol: "TMT"
    },
    {
        Name: "Ugandan Shilling",
        Code: "UGX",
        Symbol: "UGX"
    },
    {
        Name: "Ukrainian Hryvnia",
        Code: "UAH",
        Symbol: "UAH"
    },
    {
        Name: "United Arab Emirates Dirham",
        Code: "AED",
        Symbol: "AED"
    },
    {
        Name: "Uruguayan Peso",
        Code: "UYU",
        Symbol: "UYU"
    },
    {
        Name: "US Dollar",
        Code: "USD",
        Symbol: "$"
    },
    {
        Name: "Uzbekistan Som",
        Code: "UZS",
        Symbol: "UZS"
    },
    {
        Name: "Vanuatu Vatu",
        Code: "VUV",
        Symbol: "VUV"
    },
    {
        Name: "Venezuelan Bolívar",
        Code: "VEF",
        Symbol: "VEF"
    },
    {
        Name: "Vietnamese Dong",
        Code: "VND",
        Symbol: "VND"
    },
    {
        Name: "Yemeni Rial",
        Code: "YER",
        Symbol: "YER"
    },
    {
        Name: "Zambian Kwacha",
        Code: "ZMW",
        Symbol: "ZMW"
    },
    {
        Name: "Zambian Kwacha (1968\u20132012)",
        Code: "ZMK",
        Symbol: "ZMK"
    },
    {
        Name: "Zimbabwean Dollar (2009)",
        Code: "ZWL",
        Symbol: "ZWL"
    }
]

export const newTripData = [
    {
        "date": "2022-08-25T07:34:29.926Z",
        "itineraries": []
    },
    {
        "date": "2022-08-26T07:34:29.926Z",
        "itineraries": [
            {
                "item": {
                    "itemType": "Tour",
                    "title": "Vatican Museums & Sistine Chapel Skip-the-Ticket-Line Entry",
                    "postalCode": null,
                    "price": 18.02,
                    "currency": "GBP",
                    "location": "Vatican City",
                    "city": null,
                    "country": "IT",
                    "longitude": 12.45249,
                    "latitude": 41.903839,
                    "distance": 0,
                    "openingHour": "00:00:00",
                    "closingHour": "00:00:00",
                    "bestVisitingTime": [],
                    "openingDaysList": [],
                    "availableDates": [],
                    "typicalTimeSpent": 0,
                    "description": "Take a stirring journey through art and religious history with skip-the-ticket-line entry to the Vatican Museums and Sistine Chapel. Avoid the long ticket lines and then enjoy your visit at your own pace. \n\nTiptoe through the Greek Cross Gallery to see elaborately-carved sarcophagi that might just contain the earthly remains of some of antiquity's famous kings and queens! Peek at the Cabinet of the Masks, or tour the Sala degli Animali to see a virtual menagerie of fantastic beasts, real and imagined. Walk the Upper Galleries, including the Gallery of Maps, to see how cartographers depicted the world through the ages. See masterpieces by Renaissance masters in the Raphael Rooms, and rest for a while in the Borgia Apartments.\n\nThen, it’s time to marvel at Michelangelo’s exquisite Sistine Chapel, the crown jewel of the Vatican, and perhaps even of all the world’s art treasures.",
                    "averageRating": 4.4,
                    "numberOfRatings": 29789,
                    "imageUrl": "https://cdn.getyourguide.com/img/tour/5f16d60cb3548.jpeg/116.jpg",
                    "termsAndConditions": null,
                    "greatForList": [],
                    "thingsToPackList": [],
                    "creatorUserId": 0,
                    "creatorName": null,
                    "updatedBy": null,
                    "isActive": true,
                    "isCovidFriendly": null,
                    "isPublished": false,
                    "featured": false,
                    "liked": false,
                    "photos": [
                        {
                            "id": 1,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5f16d60cb3548.jpeg/116.jpg"
                        },
                        {
                            "id": 2,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5ca71f318bf4f.jpeg/116.jpg"
                        },
                        {
                            "id": 3,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5f16d60c6be6a.jpeg/116.jpg"
                        },
                        {
                            "id": 4,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5ca71f320918c.jpeg/116.jpg"
                        },
                        {
                            "id": 5,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5ca71f3278690.jpeg/116.jpg"
                        },
                        {
                            "id": 6,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5ca71f346248b.jpeg/116.jpg"
                        },
                        {
                            "id": 7,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5ca71f34bf6cc.jpeg/116.jpg"
                        },
                        {
                            "id": 8,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5ca71f3531827.jpeg/116.jpg"
                        },
                        {
                            "id": 9,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5f16d60be476e.jpeg/116.jpg"
                        },
                        {
                            "id": 10,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5f16d60b18470.jpeg/116.jpg"
                        },
                        {
                            "id": 11,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5ca71f3308e8e.jpeg/116.jpg"
                        },
                        {
                            "id": 12,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5f16d60c360e6.jpeg/116.jpg"
                        },
                        {
                            "id": 13,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5ca71f360b48c.jpeg/116.jpg"
                        },
                        {
                            "id": 14,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5ca71f365d95b.jpeg/116.jpg"
                        },
                        {
                            "id": 15,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5f16d60a1f8f6.jpeg/116.jpg"
                        },
                        {
                            "id": 16,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5ca71f33ba36d.jpeg/116.jpg"
                        },
                        {
                            "id": 17,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5f16d60a84083.jpeg/116.jpg"
                        },
                        {
                            "id": 18,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5f16d60ad2049.jpeg/116.jpg"
                        },
                        {
                            "id": 19,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5ca71f310ddfc.jpeg/116.jpg"
                        },
                        {
                            "id": 20,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5f16d60b9d848.jpeg/116.jpg"
                        },
                        {
                            "id": 21,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5f16d60b56fdd.jpeg/116.jpg"
                        }
                    ],
                    "categories": [
                        {
                            "id": 27,
                            "name": "Culture & History",
                            "code": null
                        },
                        {
                            "id": 28,
                            "name": "Art & Museums",
                            "code": null
                        },
                        {
                            "id": 32,
                            "name": "Religious & Spiritual Activities",
                            "code": null
                        },
                        {
                            "id": 33,
                            "name": "History & Heritage",
                            "code": null
                        },
                        {
                            "id": 103,
                            "name": "Food & Drinks",
                            "code": null
                        },
                        {
                            "id": 105,
                            "name": "Food & Gourmet Tours",
                            "code": null
                        },
                        {
                            "id": 123,
                            "name": "Tickets",
                            "code": null
                        },
                        {
                            "id": 132,
                            "name": "Museums & Exhibitions",
                            "code": null
                        },
                        {
                            "id": 133,
                            "name": "Museum Tickets",
                            "code": null
                        },
                        {
                            "id": 144,
                            "name": "Audio Guides",
                            "code": null
                        },
                        {
                            "id": 169,
                            "name": "Gardens & Flowers",
                            "code": null
                        },
                        {
                            "id": 532,
                            "name": "Local Food",
                            "code": null
                        },
                        {
                            "id": 1104,
                            "name": "Medium-risk activities",
                            "code": null
                        }
                    ],
                    "tags": [],
                    "ratings": [],
                    "abstract": null,
                    "highlights": [
                        "Select your entrance to explore one of the world's busiest museums by yourself at your preferred time",
                        "Marvel at Michelangelo's fresco \"The Creation of Adam\" in the Sistine Chapel",
                        "Enter the Vatican Museums through the fastest entrance available and then enjoy your visit at your own pace",
                        "Get a 20% discount at the Vatican Museums online shop"
                    ],
                    "inclusions": "Skip-the-ticket-line entry to the Vatican Museums and Sistine Chapel (if option selected)\nTour of the Vatican Gardens in a minivan (if option selected)\nAccess to Papal Villas or Vatican Garden (if option selected)\nAudio guide in Vatican Museums and Sistine Chapel (if option selected)\nBooking and handling fee\n20% discount at Vatican Museums online shop",
                    "exclusions": "Guided tour\nAudio guide unless option chosen\nTicket to St.Peter's Basilica (free of charge, but access is not guaranteed. It may vary due to crowd control)\nAccess to St. Peter's Basilica's dome",
                    "additionalInformation": "• On arrival at the Vatican, please follow the signs for the separate Partners Entrance\n• All visitors must pass through airport-style security. During high season the wait at security may be up to 30 minutes\n• St Peter’s Basilica and the Square may be closed in the morning due to Papal Audience\n• The opening hours are subject to change due to special events at the Vatican Museums, Sistine Chapel, and St Peter's Basilica\n• Children under 6 years old go free of charge with a valid ID\n• Those with a disability and their carer or companion go free of charge with a certificate of disability, which you must present at the Special Permits and/or the Reception desk in the hall of the museum\n• The minibus tour is not available for children 6 years old or younger\n• The Vatican can get very crowded all year round. June, July and August are particularly busy as they are high-season months",
                    "bestseller": true,
                    "certified": true,
                    "tourUrl": "https://www.getyourguide.com/vatican-museums-l2738/skip-the-line-vatican-museums-sistine-chapel-ticket-t62214/?partner_id=QMFJN1D&psrc=partner_api&currency=GBP",
                    "supplierId": 8437,
                    "provider": "GetYourGuide",
                    "tourId": 62214,
                    "tourCode": "deprecated",
                    "freeSale": true,
                    "locationList": [
                        {
                            "locationId": 524,
                            "type": "poi",
                            "name": "Vatican City",
                            "englishName": "Vatican City",
                            "city": null,
                            "country": "IT",
                            "coordinates": {
                                "lat": 41.902916,
                                "long": 12.453389
                            },
                            "parentId": 33,
                            "viewport": null
                        },
                        {
                            "locationId": 4344,
                            "type": "poi",
                            "name": "Raphael Rooms",
                            "englishName": "Raphael Rooms",
                            "city": null,
                            "country": "IT",
                            "coordinates": {
                                "lat": 41.903531,
                                "long": 12.45617
                            },
                            "parentId": 2738,
                            "viewport": null
                        },
                        {
                            "locationId": 7915,
                            "type": "poi",
                            "name": "Apostolic Palace",
                            "englishName": "Apostolic Palace",
                            "city": null,
                            "country": "IT",
                            "coordinates": {
                                "lat": 41.9035313,
                                "long": 12.4561705
                            },
                            "parentId": 524,
                            "viewport": null
                        },
                        {
                            "locationId": 2738,
                            "type": "poi",
                            "name": "Vatican Museums",
                            "englishName": "Vatican Museums",
                            "city": null,
                            "country": "IT",
                            "coordinates": {
                                "lat": 41.903839,
                                "long": 12.45249
                            },
                            "parentId": 524,
                            "viewport": null
                        },
                        {
                            "locationId": 88261,
                            "type": "poi",
                            "name": "Papal Palace of Castel Gandolfo",
                            "englishName": "Papal Palace of Castel Gandolfo",
                            "city": null,
                            "country": "IT",
                            "coordinates": {
                                "lat": 41.746982,
                                "long": 12.650274
                            },
                            "parentId": 7914,
                            "viewport": null
                        },
                        {
                            "locationId": 862,
                            "type": "area",
                            "name": "Lazio",
                            "englishName": "Lazio",
                            "city": null,
                            "country": "IT",
                            "coordinates": {
                                "lat": 42.02174,
                                "long": 12.73821
                            },
                            "parentId": 0,
                            "viewport": null
                        },
                        {
                            "locationId": 90650,
                            "type": "poi",
                            "name": "Borgia Apartment",
                            "englishName": "Borgia Apartment",
                            "city": null,
                            "country": "IT",
                            "coordinates": {
                                "lat": 41.9062377,
                                "long": 12.454025
                            },
                            "parentId": 7915,
                            "viewport": null
                        },
                        {
                            "locationId": 33,
                            "type": "city",
                            "name": "Rome",
                            "englishName": "Rome",
                            "city": null,
                            "country": "IT",
                            "coordinates": {
                                "lat": 41.903111,
                                "long": 12.49576
                            },
                            "parentId": 862,
                            "viewport": null
                        },
                        {
                            "locationId": 7914,
                            "type": "city",
                            "name": "Castel Gandolfo",
                            "englishName": "Castel Gandolfo",
                            "city": null,
                            "country": "IT",
                            "coordinates": {
                                "lat": 41.7497932,
                                "long": 12.6485192
                            },
                            "parentId": 862,
                            "viewport": null
                        },
                        {
                            "locationId": 2616,
                            "type": "poi",
                            "name": "Sistine Chapel",
                            "englishName": "Sistine Chapel",
                            "city": null,
                            "country": "IT",
                            "coordinates": {
                                "lat": 41.906921,
                                "long": 12.45399
                            },
                            "parentId": 2738,
                            "viewport": null
                        }
                    ],
                    "durationList": [],
                    "cancellationPolicyText": "Cancel up to 24 hours in advance to receive a full refund",
                    "expiryDate": "2021-06-26T00:00:00+00:00",
                    "id": 5,
                    "createdDate": "2021-06-14T16:41:29.538276+00:00",
                    "updatedDate": null
                },
                "customNote": "",
                "startTime": "",
                "endTime": "",
                "numberOfPeople": 1,
                "customNoteStatus": false,
                "mapColor": "#e38696"
            }
        ]
    },
    {
        "date": "2022-08-27T07:34:29.926Z",
        "itineraries": [
            {
                "item": {
                    "itemType": "Tour",
                    "title": "Vatican Museums & Sistine Chapel Skip-the-Ticket-Line Entry",
                    "postalCode": null,
                    "price": 18.02,
                    "currency": "GBP",
                    "location": "Vatican City",
                    "city": null,
                    "country": "IT",
                    "longitude": 12.45249,
                    "latitude": 41.903839,
                    "distance": 0,
                    "openingHour": "00:00:00",
                    "closingHour": "00:00:00",
                    "bestVisitingTime": [],
                    "openingDaysList": [],
                    "availableDates": [],
                    "typicalTimeSpent": 0,
                    "description": "Take a stirring journey through art and religious history with skip-the-ticket-line entry to the Vatican Museums and Sistine Chapel. Avoid the long ticket lines and then enjoy your visit at your own pace. \n\nTiptoe through the Greek Cross Gallery to see elaborately-carved sarcophagi that might just contain the earthly remains of some of antiquity's famous kings and queens! Peek at the Cabinet of the Masks, or tour the Sala degli Animali to see a virtual menagerie of fantastic beasts, real and imagined. Walk the Upper Galleries, including the Gallery of Maps, to see how cartographers depicted the world through the ages. See masterpieces by Renaissance masters in the Raphael Rooms, and rest for a while in the Borgia Apartments.\n\nThen, it’s time to marvel at Michelangelo’s exquisite Sistine Chapel, the crown jewel of the Vatican, and perhaps even of all the world’s art treasures.",
                    "averageRating": 4.4,
                    "numberOfRatings": 29789,
                    "imageUrl": "https://cdn.getyourguide.com/img/tour/5f16d60cb3548.jpeg/116.jpg",
                    "termsAndConditions": null,
                    "greatForList": [],
                    "thingsToPackList": [],
                    "creatorUserId": 0,
                    "creatorName": null,
                    "updatedBy": null,
                    "isActive": true,
                    "isCovidFriendly": null,
                    "isPublished": false,
                    "featured": false,
                    "liked": false,
                    "photos": [
                        {
                            "id": 1,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5f16d60cb3548.jpeg/116.jpg"
                        },
                        {
                            "id": 2,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5ca71f318bf4f.jpeg/116.jpg"
                        },
                        {
                            "id": 3,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5f16d60c6be6a.jpeg/116.jpg"
                        },
                        {
                            "id": 4,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5ca71f320918c.jpeg/116.jpg"
                        },
                        {
                            "id": 5,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5ca71f3278690.jpeg/116.jpg"
                        },
                        {
                            "id": 6,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5ca71f346248b.jpeg/116.jpg"
                        },
                        {
                            "id": 7,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5ca71f34bf6cc.jpeg/116.jpg"
                        },
                        {
                            "id": 8,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5ca71f3531827.jpeg/116.jpg"
                        },
                        {
                            "id": 9,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5f16d60be476e.jpeg/116.jpg"
                        },
                        {
                            "id": 10,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5f16d60b18470.jpeg/116.jpg"
                        },
                        {
                            "id": 11,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5ca71f3308e8e.jpeg/116.jpg"
                        },
                        {
                            "id": 12,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5f16d60c360e6.jpeg/116.jpg"
                        },
                        {
                            "id": 13,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5ca71f360b48c.jpeg/116.jpg"
                        },
                        {
                            "id": 14,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5ca71f365d95b.jpeg/116.jpg"
                        },
                        {
                            "id": 15,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5f16d60a1f8f6.jpeg/116.jpg"
                        },
                        {
                            "id": 16,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5ca71f33ba36d.jpeg/116.jpg"
                        },
                        {
                            "id": 17,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5f16d60a84083.jpeg/116.jpg"
                        },
                        {
                            "id": 18,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5f16d60ad2049.jpeg/116.jpg"
                        },
                        {
                            "id": 19,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5ca71f310ddfc.jpeg/116.jpg"
                        },
                        {
                            "id": 20,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5f16d60b9d848.jpeg/116.jpg"
                        },
                        {
                            "id": 21,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5f16d60b56fdd.jpeg/116.jpg"
                        }
                    ],
                    "categories": [
                        {
                            "id": 27,
                            "name": "Culture & History",
                            "code": null
                        },
                        {
                            "id": 28,
                            "name": "Art & Museums",
                            "code": null
                        },
                        {
                            "id": 32,
                            "name": "Religious & Spiritual Activities",
                            "code": null
                        },
                        {
                            "id": 33,
                            "name": "History & Heritage",
                            "code": null
                        },
                        {
                            "id": 103,
                            "name": "Food & Drinks",
                            "code": null
                        },
                        {
                            "id": 105,
                            "name": "Food & Gourmet Tours",
                            "code": null
                        },
                        {
                            "id": 123,
                            "name": "Tickets",
                            "code": null
                        },
                        {
                            "id": 132,
                            "name": "Museums & Exhibitions",
                            "code": null
                        },
                        {
                            "id": 133,
                            "name": "Museum Tickets",
                            "code": null
                        },
                        {
                            "id": 144,
                            "name": "Audio Guides",
                            "code": null
                        },
                        {
                            "id": 169,
                            "name": "Gardens & Flowers",
                            "code": null
                        },
                        {
                            "id": 532,
                            "name": "Local Food",
                            "code": null
                        },
                        {
                            "id": 1104,
                            "name": "Medium-risk activities",
                            "code": null
                        }
                    ],
                    "tags": [],
                    "ratings": [],
                    "abstract": null,
                    "highlights": [
                        "Select your entrance to explore one of the world's busiest museums by yourself at your preferred time",
                        "Marvel at Michelangelo's fresco \"The Creation of Adam\" in the Sistine Chapel",
                        "Enter the Vatican Museums through the fastest entrance available and then enjoy your visit at your own pace",
                        "Get a 20% discount at the Vatican Museums online shop"
                    ],
                    "inclusions": "Skip-the-ticket-line entry to the Vatican Museums and Sistine Chapel (if option selected)\nTour of the Vatican Gardens in a minivan (if option selected)\nAccess to Papal Villas or Vatican Garden (if option selected)\nAudio guide in Vatican Museums and Sistine Chapel (if option selected)\nBooking and handling fee\n20% discount at Vatican Museums online shop",
                    "exclusions": "Guided tour\nAudio guide unless option chosen\nTicket to St.Peter's Basilica (free of charge, but access is not guaranteed. It may vary due to crowd control)\nAccess to St. Peter's Basilica's dome",
                    "additionalInformation": "• On arrival at the Vatican, please follow the signs for the separate Partners Entrance\n• All visitors must pass through airport-style security. During high season the wait at security may be up to 30 minutes\n• St Peter’s Basilica and the Square may be closed in the morning due to Papal Audience\n• The opening hours are subject to change due to special events at the Vatican Museums, Sistine Chapel, and St Peter's Basilica\n• Children under 6 years old go free of charge with a valid ID\n• Those with a disability and their carer or companion go free of charge with a certificate of disability, which you must present at the Special Permits and/or the Reception desk in the hall of the museum\n• The minibus tour is not available for children 6 years old or younger\n• The Vatican can get very crowded all year round. June, July and August are particularly busy as they are high-season months",
                    "bestseller": true,
                    "certified": true,
                    "tourUrl": "https://www.getyourguide.com/vatican-museums-l2738/skip-the-line-vatican-museums-sistine-chapel-ticket-t62214/?partner_id=QMFJN1D&psrc=partner_api&currency=GBP",
                    "supplierId": 8437,
                    "provider": "GetYourGuide",
                    "tourId": 62214,
                    "tourCode": "deprecated",
                    "freeSale": true,
                    "locationList": [
                        {
                            "locationId": 524,
                            "type": "poi",
                            "name": "Vatican City",
                            "englishName": "Vatican City",
                            "city": null,
                            "country": "IT",
                            "coordinates": {
                                "lat": 41.902916,
                                "long": 12.453389
                            },
                            "parentId": 33,
                            "viewport": null
                        },
                        {
                            "locationId": 4344,
                            "type": "poi",
                            "name": "Raphael Rooms",
                            "englishName": "Raphael Rooms",
                            "city": null,
                            "country": "IT",
                            "coordinates": {
                                "lat": 41.903531,
                                "long": 12.45617
                            },
                            "parentId": 2738,
                            "viewport": null
                        },
                        {
                            "locationId": 7915,
                            "type": "poi",
                            "name": "Apostolic Palace",
                            "englishName": "Apostolic Palace",
                            "city": null,
                            "country": "IT",
                            "coordinates": {
                                "lat": 41.9035313,
                                "long": 12.4561705
                            },
                            "parentId": 524,
                            "viewport": null
                        },
                        {
                            "locationId": 2738,
                            "type": "poi",
                            "name": "Vatican Museums",
                            "englishName": "Vatican Museums",
                            "city": null,
                            "country": "IT",
                            "coordinates": {
                                "lat": 41.903839,
                                "long": 12.45249
                            },
                            "parentId": 524,
                            "viewport": null
                        },
                        {
                            "locationId": 88261,
                            "type": "poi",
                            "name": "Papal Palace of Castel Gandolfo",
                            "englishName": "Papal Palace of Castel Gandolfo",
                            "city": null,
                            "country": "IT",
                            "coordinates": {
                                "lat": 41.746982,
                                "long": 12.650274
                            },
                            "parentId": 7914,
                            "viewport": null
                        },
                        {
                            "locationId": 862,
                            "type": "area",
                            "name": "Lazio",
                            "englishName": "Lazio",
                            "city": null,
                            "country": "IT",
                            "coordinates": {
                                "lat": 42.02174,
                                "long": 12.73821
                            },
                            "parentId": 0,
                            "viewport": null
                        },
                        {
                            "locationId": 90650,
                            "type": "poi",
                            "name": "Borgia Apartment",
                            "englishName": "Borgia Apartment",
                            "city": null,
                            "country": "IT",
                            "coordinates": {
                                "lat": 41.9062377,
                                "long": 12.454025
                            },
                            "parentId": 7915,
                            "viewport": null
                        },
                        {
                            "locationId": 33,
                            "type": "city",
                            "name": "Rome",
                            "englishName": "Rome",
                            "city": null,
                            "country": "IT",
                            "coordinates": {
                                "lat": 41.903111,
                                "long": 12.49576
                            },
                            "parentId": 862,
                            "viewport": null
                        },
                        {
                            "locationId": 7914,
                            "type": "city",
                            "name": "Castel Gandolfo",
                            "englishName": "Castel Gandolfo",
                            "city": null,
                            "country": "IT",
                            "coordinates": {
                                "lat": 41.7497932,
                                "long": 12.6485192
                            },
                            "parentId": 862,
                            "viewport": null
                        },
                        {
                            "locationId": 2616,
                            "type": "poi",
                            "name": "Sistine Chapel",
                            "englishName": "Sistine Chapel",
                            "city": null,
                            "country": "IT",
                            "coordinates": {
                                "lat": 41.906921,
                                "long": 12.45399
                            },
                            "parentId": 2738,
                            "viewport": null
                        }
                    ],
                    "durationList": [],
                    "cancellationPolicyText": "Cancel up to 24 hours in advance to receive a full refund",
                    "expiryDate": "2021-06-26T00:00:00+00:00",
                    "id": 5,
                    "createdDate": "2021-06-14T16:41:29.538276+00:00",
                    "updatedDate": null
                },
                "customNote": "",
                "startTime": "",
                "endTime": "",
                "numberOfPeople": 1,
                "customNoteStatus": false,
                "mapColor": "#a068ae"
            },
            {
                "item": {
                    "itemType": "Tour",
                    "title": "Isle of Wight Day Trip from London",
                    "postalCode": null,
                    "price": 99,
                    "currency": "GBP",
                    "location": "South East England",
                    "city": null,
                    "country": "GB",
                    "longitude": -0.12714,
                    "latitude": 51.506321,
                    "distance": 0,
                    "openingHour": "00:00:00",
                    "closingHour": "00:00:00",
                    "bestVisitingTime": [],
                    "openingDaysList": [],
                    "availableDates": [],
                    "typicalTimeSpent": 0,
                    "description": "Depart London and travel by luxury coach to cross by ferry to the Isle of Wight, a popular holiday destination since Victorian times. Separated from the mainland of England by the Solent, the Isle of Wight is home to annual festivals such as Bestival, along with well-conserved wildlife and some of the richest cliffs and quarries for dinosaur fossils in Europe.\n\nVisit some of the island's beautiful villages, including Godshill, home to some lovely thatched cottages and a model village. Go to the seaside village of Shanklin, where attractions include 2 sandy beaches and the wooded coastal ravine of the Shanklin Chine.\n\nBenefit from plenty of free time to explore at your leisure. Spend the rest of the day exploring the island's many charms before you return to the mainland by ferry and drive back to London by coach.",
                    "averageRating": 4.2,
                    "numberOfRatings": 8,
                    "imageUrl": "https://cdn.getyourguide.com/img/tour/574408d3614a0.jpeg/116.jpg",
                    "termsAndConditions": null,
                    "greatForList": [],
                    "thingsToPackList": [],
                    "creatorUserId": 0,
                    "creatorName": null,
                    "updatedBy": null,
                    "isActive": true,
                    "isCovidFriendly": null,
                    "isPublished": false,
                    "featured": false,
                    "liked": false,
                    "photos": [
                        {
                            "id": 1,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/574408d3614a0.jpeg/116.jpg"
                        },
                        {
                            "id": 2,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/574409ad84dce.jpeg/116.jpg"
                        },
                        {
                            "id": 3,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/574408dccfc1a.jpeg/116.jpg"
                        }
                    ],
                    "categories": [
                        {
                            "id": 1,
                            "name": "Tours",
                            "code": null
                        },
                        {
                            "id": 4,
                            "name": "Bus & Minivan Tours",
                            "code": null
                        },
                        {
                            "id": 35,
                            "name": "Nature & Adventure",
                            "code": null
                        },
                        {
                            "id": 41,
                            "name": "Nature & Panorama",
                            "code": null
                        },
                        {
                            "id": 63,
                            "name": "Beach Trips",
                            "code": null
                        },
                        {
                            "id": 172,
                            "name": "Day Trips",
                            "code": null
                        },
                        {
                            "id": 313,
                            "name": "Island Tours",
                            "code": null
                        },
                        {
                            "id": 360,
                            "name": "Day Trips From",
                            "code": null
                        },
                        {
                            "id": 361,
                            "name": "Day Trips To",
                            "code": null
                        }
                    ],
                    "tags": [],
                    "ratings": [],
                    "abstract": null,
                    "highlights": [
                        "Spend the day on the Isle of Wight",
                        "See Godshill, where attractions include thatched cottages and a scale model village",
                        "Go to the seaside village of Shanklin and discover 2 sandy beaches"
                    ],
                    "inclusions": "Transportation by luxury coach\nReturn ferry crossings\nFree time to explore the Isle of Wight\nTour manager",
                    "exclusions": "Food and drinks",
                    "additionalInformation": null,
                    "bestseller": false,
                    "certified": false,
                    "tourUrl": "https://www.getyourguide.com/london-l57/isle-of-wight-day-trip-from-london-t66705/?partner_id=QMFJN1D&psrc=partner_api&currency=GBP",
                    "supplierId": 11124,
                    "provider": "GetYourGuide",
                    "tourId": 66705,
                    "tourCode": "deprecated",
                    "freeSale": true,
                    "locationList": [
                        {
                            "locationId": 617,
                            "type": "area",
                            "name": "South East England",
                            "englishName": "South East England",
                            "city": null,
                            "country": "GB",
                            "coordinates": {
                                "lat": 51.519291,
                                "long": -0.25275
                            },
                            "parentId": 159651,
                            "viewport": null
                        },
                        {
                            "locationId": 93176,
                            "type": "poi",
                            "name": "Osborne House",
                            "englishName": "Osborne House",
                            "city": null,
                            "country": "GB",
                            "coordinates": {
                                "lat": 50.7506406,
                                "long": -1.2697465
                            },
                            "parentId": 32682,
                            "viewport": null
                        },
                        {
                            "locationId": 57,
                            "type": "city",
                            "name": "London",
                            "englishName": "London",
                            "city": null,
                            "country": "GB",
                            "coordinates": {
                                "lat": 51.506321,
                                "long": -0.12714
                            },
                            "parentId": 159651,
                            "viewport": null
                        },
                        {
                            "locationId": 32682,
                            "type": "area",
                            "name": "Isle of Wight",
                            "englishName": "Isle of Wight",
                            "city": null,
                            "country": "GB",
                            "coordinates": {
                                "lat": 50.6938479,
                                "long": -1.304734
                            },
                            "parentId": 617,
                            "viewport": null
                        },
                        {
                            "locationId": 159651,
                            "type": "area",
                            "name": "England",
                            "englishName": "England",
                            "city": null,
                            "country": "GB",
                            "coordinates": {
                                "lat": 52.3555177,
                                "long": -1.1743197
                            },
                            "parentId": 0,
                            "viewport": null
                        }
                    ],
                    "durationList": [
                        {
                            "duration": 14,
                            "unit": "hour"
                        }
                    ],
                    "cancellationPolicyText": "Cancel up to 24 hours in advance to receive a full refund",
                    "expiryDate": "2021-06-30T00:00:00+00:00",
                    "id": 1,
                    "createdDate": "2021-06-13T15:28:55.743354+00:00",
                    "updatedDate": null
                },
                "customNote": "",
                "startTime": "",
                "endTime": "",
                "numberOfPeople": 1,
                "customNoteStatus": false,
                "mapColor": "#a068ae"
            }
        ]
    },
    {
        "date": "2022-08-28T07:34:29.926Z",
        "itineraries": []
    },
    {
        "date": "2022-08-29T07:34:29.926Z",
        "itineraries": [
            {
                "item": {
                    "itemType": "Tour",
                    "title": "Aquarium of Genoa: Skip-the-Line Ticket",
                    "postalCode": null,
                    "price": 23.17,
                    "currency": "GBP",
                    "location": "Aquarium of Genoa",
                    "city": null,
                    "country": "IT",
                    "longitude": 8.93889,
                    "latitude": 44.410332,
                    "distance": 0,
                    "openingHour": "00:00:00",
                    "closingHour": "00:00:00",
                    "bestVisitingTime": [],
                    "openingDaysList": [],
                    "availableDates": [],
                    "typicalTimeSpent": 0,
                    "description": "Make your way to the Aquarium of Genoa to see more than 15,000 animals from 400 species at Italy's largest aquatic zoo. Skip the line, and learn how the aquarium was built for the Genoa Expo '92. Now, it is home to the biggest display of aquatic biodiversity in Europe.\n\nVenture into the fascinating waters of the world as you explore more than 70 tanks of critters, including sea cows.\n\nMarvel at animals from the Antarctic, such as penguins, and see sharks, seals, jellyfish and the colorful fish of the coral barriers. Go to the Cetacean Pavilion, designed by Renzo Piano, and laugh along with the bottlenose dolphins at 4 open-air pools.",
                    "averageRating": 4.5,
                    "numberOfRatings": 1604,
                    "imageUrl": "https://cdn.getyourguide.com/img/tour/609c0731043b9.jpg/116.jpg",
                    "termsAndConditions": null,
                    "greatForList": [],
                    "thingsToPackList": [],
                    "creatorUserId": 0,
                    "creatorName": null,
                    "updatedBy": null,
                    "isActive": true,
                    "isCovidFriendly": null,
                    "isPublished": false,
                    "featured": false,
                    "liked": false,
                    "photos": [
                        {
                            "id": 1,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/609c0731043b9.jpg/116.jpg"
                        },
                        {
                            "id": 2,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/609c072d3a66f.jpg/116.jpg"
                        },
                        {
                            "id": 3,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/609c072e9e94a.jpg/116.jpg"
                        },
                        {
                            "id": 4,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/609c072ee481b.jpg/116.jpg"
                        },
                        {
                            "id": 5,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/609c072f447ea.jpg/116.jpg"
                        },
                        {
                            "id": 6,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/609c073094e21.jpg/116.jpg"
                        },
                        {
                            "id": 7,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/609c07314fa5e.jpg/116.jpg"
                        },
                        {
                            "id": 8,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/609c0732a316a.jpg/116.jpg"
                        },
                        {
                            "id": 9,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/609c0733e82f2.jpg/116.jpg"
                        }
                    ],
                    "categories": [
                        {
                            "id": 28,
                            "name": "Art & Museums",
                            "code": null
                        },
                        {
                            "id": 49,
                            "name": "Dolphin & Whale Watching",
                            "code": null
                        },
                        {
                            "id": 123,
                            "name": "Tickets",
                            "code": null
                        },
                        {
                            "id": 124,
                            "name": "Shows & Musicals",
                            "code": null
                        },
                        {
                            "id": 127,
                            "name": "Shows",
                            "code": null
                        },
                        {
                            "id": 131,
                            "name": "Theme Parks & Amusement Parks",
                            "code": null
                        },
                        {
                            "id": 132,
                            "name": "Museums & Exhibitions",
                            "code": null
                        },
                        {
                            "id": 133,
                            "name": "Museum Tickets",
                            "code": null
                        },
                        {
                            "id": 134,
                            "name": "Exhibitions",
                            "code": null
                        },
                        {
                            "id": 135,
                            "name": "Zoos & Aquariums",
                            "code": null
                        },
                        {
                            "id": 189,
                            "name": "Children's Activities",
                            "code": null
                        },
                        {
                            "id": 192,
                            "name": "Water Parks",
                            "code": null
                        },
                        {
                            "id": 239,
                            "name": "Wheelchair Accessible",
                            "code": null
                        },
                        {
                            "id": 581,
                            "name": "Theme Parks for Kids",
                            "code": null
                        },
                        {
                            "id": 1104,
                            "name": "Medium-risk activities",
                            "code": null
                        },
                        {
                            "id": 1105,
                            "name": "High-risk activities",
                            "code": null
                        }
                    ],
                    "tags": [],
                    "ratings": [],
                    "abstract": null,
                    "highlights": [
                        "Discover the creatures of the sea at Italy's largest aquarium",
                        "See more than 15,000 animals from 400 different species",
                        "Marvel at bottlenose dolphins, seals, jellyfish and more",
                        "Visit the Cetacean Pavilion, designed by Renzo Piano",
                        "Skip the lines to see the majestic sea creatures without the stress of lines"
                    ],
                    "inclusions": "Skip-the-line entrance ticket",
                    "exclusions": "Guided tour",
                    "additionalInformation": "• Last admission is at 6:00 PM\n• Due to COVID-19, the opening days and times may change. As such, you're advised to check the official website for updates information during this time",
                    "bestseller": true,
                    "certified": true,
                    "tourUrl": "https://www.getyourguide.com/genoa-l1009/aquarium-of-genoa-skip-the-line-ticket-t399086/?partner_id=QMFJN1D&psrc=partner_api&currency=GBP",
                    "supplierId": 27819,
                    "provider": "GetYourGuide",
                    "tourId": 399086,
                    "tourCode": "deprecated",
                    "freeSale": true,
                    "locationList": [
                        {
                            "locationId": 87233,
                            "type": "poi",
                            "name": "Aquarium of Genoa",
                            "englishName": "Aquarium of Genoa",
                            "city": null,
                            "country": "IT",
                            "coordinates": {
                                "lat": 44.4102211,
                                "long": 8.9266709
                            },
                            "parentId": 1009,
                            "viewport": null
                        },
                        {
                            "locationId": 221,
                            "type": "area",
                            "name": "Liguria",
                            "englishName": "Liguria",
                            "city": null,
                            "country": "IT",
                            "coordinates": {
                                "lat": 44.226318,
                                "long": 9.68488
                            },
                            "parentId": 0,
                            "viewport": null
                        },
                        {
                            "locationId": 1009,
                            "type": "city",
                            "name": "Genoa",
                            "englishName": "Genoa",
                            "city": null,
                            "country": "IT",
                            "coordinates": {
                                "lat": 44.410332,
                                "long": 8.93889
                            },
                            "parentId": 221,
                            "viewport": null
                        }
                    ],
                    "durationList": [],
                    "cancellationPolicyText": "Cancel up to 24 hours in advance to receive a full refund",
                    "expiryDate": "2022-05-31T00:00:00+00:00",
                    "id": 3,
                    "createdDate": "2021-06-14T16:41:29.502525+00:00",
                    "updatedDate": null
                },
                "customNote": "",
                "startTime": "",
                "endTime": "",
                "numberOfPeople": 1,
                "customNoteStatus": false,
                "mapColor": "#eedd7b"
            }
        ]
    },
    {
        "date": "2022-08-30T07:34:29.926Z",
        "itineraries": [
            {
                "item": {
                    "itemType": "Tour",
                    "title": "From London: Margate and Broadstairs Round-Trip Transfer",
                    "postalCode": null,
                    "price": 35,
                    "currency": "GBP",
                    "location": "Broadstairs",
                    "city": null,
                    "country": "GB",
                    "longitude": -0.12714,
                    "latitude": 51.506321,
                    "distance": 0,
                    "openingHour": "00:00:00",
                    "closingHour": "00:00:00",
                    "bestVisitingTime": [],
                    "openingDaysList": [],
                    "availableDates": [],
                    "typicalTimeSpent": 0,
                    "description": "Hop onboard a luxury, air-conditioned coach from central London and head to the sandy beaches of Kent’s coastline. There are 3 destinations to choose from on the day, Margate Beach, Joss Bay, or Viking Bay.\n\nMargate is a popular choice for families, and has a shallow tide pool for swimming as well as an amusement park. There’s also plenty of shops, cafes, restaurants, and bars along the seafront. \n\nJoss Bay is a smaller beach with fewer facilities, but often has fewer crowds. The bay offers gorgeous views of the white cliffs as well as a surf school. Nearby Viking Bay is the main Broadstairs beach, and boasts a sandy shoreline and an array of popular cafes and restaurants.\n\nSpend the day exploring the beaches, bays, and seaside towns at your own leisure, then relax on the return journey to London at the end of your adventure.",
                    "averageRating": 0,
                    "numberOfRatings": 0,
                    "imageUrl": "https://cdn.getyourguide.com/img/tour/607c64f7ad482.jpeg/116.jpg",
                    "termsAndConditions": null,
                    "greatForList": [],
                    "thingsToPackList": [],
                    "creatorUserId": 0,
                    "creatorName": null,
                    "updatedBy": null,
                    "isActive": true,
                    "isCovidFriendly": null,
                    "isPublished": false,
                    "featured": false,
                    "liked": false,
                    "photos": [
                        {
                            "id": 1,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/607c64f7ad482.jpeg/116.jpg"
                        },
                        {
                            "id": 2,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/607c658e40cf9.jpeg/116.jpg"
                        },
                        {
                            "id": 3,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/607c658e9930e.jpeg/116.jpg"
                        },
                        {
                            "id": 4,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/607c6590113e2.jpeg/116.jpg"
                        },
                        {
                            "id": 5,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/607c659593f7c.jpeg/116.jpg"
                        },
                        {
                            "id": 6,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/607c65b92f844.jpeg/116.jpg"
                        },
                        {
                            "id": 7,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/607c6da25e972.jpeg/116.jpg"
                        }
                    ],
                    "categories": [
                        {
                            "id": 63,
                            "name": "Beach Trips",
                            "code": null
                        },
                        {
                            "id": 152,
                            "name": "Transportation",
                            "code": null
                        },
                        {
                            "id": 154,
                            "name": "Port Transfers",
                            "code": null
                        },
                        {
                            "id": 155,
                            "name": "Individual Transfers",
                            "code": null
                        },
                        {
                            "id": 172,
                            "name": "Day Trips",
                            "code": null
                        },
                        {
                            "id": 250,
                            "name": "Family-friendly",
                            "code": null
                        },
                        {
                            "id": 360,
                            "name": "Day Trips From",
                            "code": null
                        },
                        {
                            "id": 361,
                            "name": "Day Trips To",
                            "code": null
                        },
                        {
                            "id": 1104,
                            "name": "Medium-risk activities",
                            "code": null
                        }
                    ],
                    "tags": [],
                    "ratings": [],
                    "abstract": null,
                    "highlights": [
                        "Enjoy round-trip transfer in a comfortable, air-conditioned coach",
                        "Discover the sandy beaches and bays of Margate and Broadstairs",
                        "Sunbathe on the beach, grab a bite to eat, or go swimming in the sea"
                    ],
                    "inclusions": "Round-trip transportation from central London to Margate and Broadstairs\nLuxury, air-conditioned coach\nProfessional driver",
                    "exclusions": "Tour guide\nFood or drinks\nEntrance fees\nGratuities",
                    "additionalInformation": "• Please note, this is not a guided tour and the day is free for you to explore. After drop-off at the beach, the driver will give you a meeting time and place to board the coach for the return journey\n• Wheelchair-accessible coaches are available on request and are subject to availability, please contact the local partner in advance if you require one\n• If you intend to bring a surfboard or other large item, please contact the local partner in advance so that an appropriate size vehicle with storage can be arranged",
                    "bestseller": false,
                    "certified": false,
                    "tourUrl": "https://www.getyourguide.com/london-l57/from-london-margate-and-broadstairs-round-trip-transfer-t398175/?partner_id=QMFJN1D&psrc=partner_api&currency=GBP",
                    "supplierId": 11124,
                    "provider": "GetYourGuide",
                    "tourId": 398175,
                    "tourCode": "deprecated",
                    "freeSale": true,
                    "locationList": [
                        {
                            "locationId": 101076,
                            "type": "city",
                            "name": "Broadstairs",
                            "englishName": "Broadstairs",
                            "city": null,
                            "country": "GB",
                            "coordinates": {
                                "lat": 51.360163,
                                "long": 1.432038
                            },
                            "parentId": 2450,
                            "viewport": null
                        },
                        {
                            "locationId": 2450,
                            "type": "area",
                            "name": "Kent",
                            "englishName": "Kent",
                            "city": null,
                            "country": "GB",
                            "coordinates": {
                                "lat": 51.198711,
                                "long": 0.74267
                            },
                            "parentId": 617,
                            "viewport": null
                        },
                        {
                            "locationId": 57,
                            "type": "city",
                            "name": "London",
                            "englishName": "London",
                            "city": null,
                            "country": "GB",
                            "coordinates": {
                                "lat": 51.506321,
                                "long": -0.12714
                            },
                            "parentId": 159651,
                            "viewport": null
                        },
                        {
                            "locationId": 101007,
                            "type": "city",
                            "name": "Margate",
                            "englishName": "Margate",
                            "city": null,
                            "country": "GB",
                            "coordinates": {
                                "lat": 51.389646,
                                "long": 1.3868339
                            },
                            "parentId": 2450,
                            "viewport": null
                        },
                        {
                            "locationId": 159651,
                            "type": "area",
                            "name": "England",
                            "englishName": "England",
                            "city": null,
                            "country": "GB",
                            "coordinates": {
                                "lat": 52.3555177,
                                "long": -1.1743197
                            },
                            "parentId": 0,
                            "viewport": null
                        },
                        {
                            "locationId": 617,
                            "type": "area",
                            "name": "South East England",
                            "englishName": "South East England",
                            "city": null,
                            "country": "GB",
                            "coordinates": {
                                "lat": 51.519291,
                                "long": -0.25275
                            },
                            "parentId": 159651,
                            "viewport": null
                        }
                    ],
                    "durationList": [
                        {
                            "duration": 11,
                            "unit": "hour"
                        }
                    ],
                    "cancellationPolicyText": "Cancel up to 24 hours in advance to receive a full refund",
                    "expiryDate": null,
                    "id": 2,
                    "createdDate": "2021-06-13T15:28:55.781282+00:00",
                    "updatedDate": null
                },
                "customNote": "",
                "startTime": "",
                "endTime": "",
                "numberOfPeople": 1,
                "customNoteStatus": false,
                "mapColor": "#40e55f"
            },
            {
                "item": {
                    "itemType": "Tour",
                    "title": "Rotterdam Zoo: Entrance Ticket",
                    "postalCode": null,
                    "price": 20.17,
                    "currency": "GBP",
                    "location": "Rotterdam",
                    "city": null,
                    "country": "NL",
                    "longitude": 4.47845,
                    "latitude": 51.922829,
                    "distance": 0,
                    "openingHour": "00:00:00",
                    "closingHour": "00:00:00",
                    "bestVisitingTime": [],
                    "openingDaysList": [],
                    "availableDates": [],
                    "typicalTimeSpent": 0,
                    "description": "Rotterdam Zoo has become one of Europe’s most beautiful zoos. Wander through different parts of the world where you will see fascinating animals that feel perfectly at home in specially-imitated natural landscapes. \n\nRotterdam Zoo supports a number of conservation projects in the wild and actively participates in many breeding programmes for endangered species and is one of the international top ten of zoos in this field.\n\nDive into Oceanium and take a magical voyage over the bottom of the sea and along coastal regions, meeting many marine and coastal inhabitants such as fish (from herring to sharks), puffins, snakes and a large group of king penguins.\n\nDiscover beautiful butterfly paradise Amazonica where you'll experience tropical temperatures, fragrant flowers, thousands of colorful South American butterflies, the awesome anaconda and greedy piranhas. \n\nIn Africa, an exciting path takes you safely past a group of large crocodiles! Once you’re at the top of the path, stand eye to eye with the giraffes. At a safe altitude, admire the other inhabitants of the new savanna such as hyenas, kudus, ostriches and zebras. On the African Gorilla Island, you will be delighted by Bokito’s playful gorilla family.\n\n...and much more! On top of these experiences, see a rare species of forest giraffe, take a voyage through Asian marshes, and discover the Ice Cave for a magnificent view of polar bears.",
                    "averageRating": 4.7,
                    "numberOfRatings": 59,
                    "imageUrl": "https://cdn.getyourguide.com/img/tour/5b923447375c3.jpeg/116.jpg",
                    "termsAndConditions": null,
                    "greatForList": [],
                    "thingsToPackList": [],
                    "creatorUserId": 0,
                    "creatorName": null,
                    "updatedBy": null,
                    "isActive": true,
                    "isCovidFriendly": null,
                    "isPublished": false,
                    "featured": false,
                    "liked": false,
                    "photos": [
                        {
                            "id": 1,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5b923447375c3.jpeg/116.jpg"
                        },
                        {
                            "id": 2,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5b92344496bd9.jpeg/116.jpg"
                        },
                        {
                            "id": 3,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5b9234457ccbd.jpeg/116.jpg"
                        },
                        {
                            "id": 4,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5b923444e70ff.jpeg/116.jpg"
                        },
                        {
                            "id": 5,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5b9234452b227.jpeg/116.jpg"
                        },
                        {
                            "id": 6,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5b923445c47e8.jpeg/116.jpg"
                        },
                        {
                            "id": 7,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5b9234460c1e4.jpeg/116.jpg"
                        },
                        {
                            "id": 8,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5b9234464f3be.jpeg/116.jpg"
                        },
                        {
                            "id": 9,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5b92344690220.jpeg/116.jpg"
                        },
                        {
                            "id": 10,
                            "photoUrl": "https://cdn.getyourguide.com/img/tour/5b923446d554a.jpeg/116.jpg"
                        }
                    ],
                    "categories": [
                        {
                            "id": 35,
                            "name": "Nature & Adventure",
                            "code": null
                        },
                        {
                            "id": 41,
                            "name": "Nature & Panorama",
                            "code": null
                        },
                        {
                            "id": 123,
                            "name": "Tickets",
                            "code": null
                        },
                        {
                            "id": 131,
                            "name": "Theme Parks & Amusement Parks",
                            "code": null
                        },
                        {
                            "id": 135,
                            "name": "Zoos & Aquariums",
                            "code": null
                        },
                        {
                            "id": 189,
                            "name": "Children's Activities",
                            "code": null
                        },
                        {
                            "id": 239,
                            "name": "Wheelchair Accessible",
                            "code": null
                        },
                        {
                            "id": 250,
                            "name": "Family-friendly",
                            "code": null
                        },
                        {
                            "id": 581,
                            "name": "Theme Parks for Kids",
                            "code": null
                        },
                        {
                            "id": 1094,
                            "name": "Family-friendly Activities",
                            "code": null
                        },
                        {
                            "id": 1104,
                            "name": "Medium-risk activities",
                            "code": null
                        }
                    ],
                    "tags": [],
                    "ratings": [],
                    "abstract": null,
                    "highlights": [
                        "Discover the amazing and beautiful butterfly paradise of Amazonica",
                        "Be surrounded and amazed by sharks, turtles and the renewed Great Barrier Reef in the fully covered Oceanium",
                        "Get eye to eye with the graceful giraffes on the African Savanna",
                        "Wander through Asia and meet elephants and rhinos in the tropical green of the (mostly covered) Taman Indah"
                    ],
                    "inclusions": "Entrance ticket",
                    "exclusions": "Parking ticket\nTickets for the shuttle-service train that runs between the sides of the zoo",
                    "additionalInformation": null,
                    "bestseller": true,
                    "certified": false,
                    "tourUrl": "https://www.getyourguide.com/rotterdam-l37/special-encounters-at-rotterdam-zoo-entrance-ticket-t167792/?partner_id=QMFJN1D&psrc=partner_api&currency=GBP",
                    "supplierId": 70382,
                    "provider": "GetYourGuide",
                    "tourId": 167792,
                    "tourCode": "deprecated",
                    "freeSale": true,
                    "locationList": [
                        {
                            "locationId": 37,
                            "type": "city",
                            "name": "Rotterdam",
                            "englishName": "Rotterdam",
                            "city": null,
                            "country": "NL",
                            "coordinates": {
                                "lat": 51.922829,
                                "long": 4.47845
                            },
                            "parentId": 1178,
                            "viewport": null
                        },
                        {
                            "locationId": 1178,
                            "type": "area",
                            "name": "South Holland",
                            "englishName": "South Holland",
                            "city": null,
                            "country": "NL",
                            "coordinates": {
                                "lat": 51.985958,
                                "long": 4.49389
                            },
                            "parentId": 0,
                            "viewport": null
                        },
                        {
                            "locationId": 85274,
                            "type": "poi",
                            "name": "Rotterdam Zoo",
                            "englishName": "Rotterdam Zoo",
                            "city": null,
                            "country": "NL",
                            "coordinates": {
                                "lat": 51.9037819,
                                "long": 4.4664705
                            },
                            "parentId": 37,
                            "viewport": null
                        }
                    ],
                    "durationList": [],
                    "cancellationPolicyText": "Cancel up to 24 hours in advance to receive a full refund",
                    "expiryDate": "2021-06-30T00:00:00+00:00",
                    "id": 4,
                    "createdDate": "2021-06-14T16:41:29.538459+00:00",
                    "updatedDate": null
                },
                "customNote": "",
                "startTime": "",
                "endTime": "",
                "numberOfPeople": 1,
                "customNoteStatus": false,
                "mapColor": "#40e55f"
            }
        ]
    },
    {
        "date": "2022-08-31T07:34:29.926Z",
        "itineraries": []
    }
]

// https://maps.googleapis.com/maps/api/place/autocomplete/json?input=TEXT_INPUT_VALUE&types=(cities)&key=YOUR_API_KEY