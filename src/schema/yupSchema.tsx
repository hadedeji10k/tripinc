import * as Yup from "yup";
const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/; //valid phone number
// /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().required("Password is required"),
});

export const ConfirmPasswordRequestSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password Required"),
  confirmPassword: Yup.string()
    .min(6, "Confirm password must be at least 6 characters")
    .when("password", {
      is: (val: any) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      ),
    })
    .required("Confirm Password is required"),
});

export const newsLetterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email required"),
});

export const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email required"),
});

export const BasicDetailsSchema = Yup.object().shape({
  phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  // countryOfOrigin: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Last name is required"),
  // cityOfOrigin: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Last name is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password Required"),
  confirmPassword: Yup.string()
    .min(6, "Confirm password must be at least 6 characters")
    .when("password", {
      is: (val: any) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      ),
    })
    .required("Confirm Password is required"),
});

export const SocialBasicDetailsSchema = Yup.object().shape({
  phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  countryOfOrigin: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last name is required"),
  cityOfOrigin: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last name is required"),
});

export const ProfileDetailsPreferenceSchema = Yup.object().shape({
  preferedCurrency: Yup.string().required("Preferred currency is Required"),
  preferedTimeFormat: Yup.string().required("Time format is Required"),
});

export const ProfileDetailsSchema = Yup.object().shape({
  password: Yup.string().required("Old Password Required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password Required"),
  confirmPassword: Yup.string()
    .min(6, "Confirm password must be at least 6 characters")
    .when("password", {
      is: (val: any) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("newPassword")],
        "Both password need to be the same"
      ),
    })
    .required("Confirm Password is required"),
});

export const CustomerInfoSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  address: Yup.string().required("Address is required"),
  postalCode: Yup.string().required("Postal Code is required"),
  phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
});

export const AmbassadorApplicationSchema = Yup.object().shape({
  // fullName: Yup.string().required("Full name is required"),
  timeAvailability: Yup.number().required("Time availability is required"),
});

export const AddFlightSchema = Yup.object().shape({
  flightName: Yup.string().required("Flight name is required"),
  airportName: Yup.string().required("Airport name is required"),
  arrivalTime: Yup.string().required("Arrival time is required"),
  arrivalDate: Yup.string().required("Arrival date is required"),
});

export const AddStaySchema = Yup.object().shape({
  stayLocation: Yup.string().required("Location is required"),
  stayName: Yup.string().required("Stay name is required"),
  time: Yup.string().required("Time is required"),
  date: Yup.string().required("Date is required"),
});
