export const facilities = [
  {
    facilityId: 1,
    title: "Men's Facility",
    photo_url: require("../../assets/men_f.jpg"),
  },
  {
    facilityId: 2,
    title: "Ladies Facility",
    photo_url: require("../../assets/women_f.jpg"),
  },
];

export const options = [
  {
    optionId: 2,
    title: "Classes",
    icon: require("../../assets/icons/classes.png"),
  },
  {
    optionId: 3,
    title: "Register",
    icon: require("../../assets/icons/register.png"),
  },
  {
    optionId: 4,
    title: "Membership",
    icon: require("../../assets/icons/member.png"),
  },
  {
    optionId: 5,
    title: "Football",
    icon: require("../../assets/icons/football.png"),
  },
  {
    optionId: 6,
    title: "Notices",
    icon: require("../../assets/icons/notice.png"),
  },
  {
    optionId: 7,
    title: "Timings",
    icon: require("../../assets/icons/timeing.png"),
  },
  {
    optionId: 8,
    title: "Info",
    icon: require("../../assets/icons/info.png"),
  },
];

export const facilityStatus = {
  ladies: [
    {
      title: "Ladies Gym Traffic",
      traffic: 0,
      statusId: 1,
    },
    {
      title: "Ladies Sauna",
      traffic: 0,
      statusId: 2,
    },
    {
      title: "Ladies Shower",
      traffic: 0,
      statusId: 4,
    },
    {
      title: "Ladies Steam Room",
      traffic: 0,
      statusId: 3,
    },
  ],
  men: [
    {
      title: "Men's Gym Traffic",
      traffic: 0,
      statusId: 1,
    },
    {
      title: "Men's Sauna",
      traffic: 0,
      statusId: 2,
    },
    {
      title: "Men's Shower",
      traffic: 0,
      statusId: 4,
    },
    {
      title: "Men's Steam Room",
      traffic: 0,
      statusId: 3,
    },
  ],
};
