import { useState } from "react";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import "antd/dist/antd.css";
import { Input, Select, message, Spin, DatePicker, Button } from "antd";
import Autocomplete from "react-google-autocomplete";
import { UploadOutlined } from "@mui/icons-material";
import moment from "moment";
import { GOOGLEAPIKEY } from "../../utils/constants";
import { Formik } from "formik";
import { AmbassadorApplicationSchema } from "../../schema/yupSchema";

const { Option } = Select;
const { TextArea } = Input;
const ratingDesc = ["terrible", "bad", "normal", "good", "wonderful"];

const AmbassadorApplication = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [meansOfIdentification, setMeansOfIdentification] =
    useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [images] = useState([]);
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [citiesVisited, setCitiesVisited] = useState<any>([]);
  const [citiesOfPlanning, setCitiesOfPlanning] = useState<any>([]);
  const [countriesVisited, setCountriesVisited] = useState<any>([]);
  const [citiesForPlanning, setCitiesForPlanning] = useState<string[]>([]);

  //   Full Name
  // Date Of Birth
  // Country of Residence
  // Means of identification
  // Hobbies/Interest
  // Cities/Countries visited
  // Cities of interest for Planning
  // Amount of time available/week/month for activities

  const initialValues = {
    fullName: "",
    dateOfBirth: "",
    // countryOfOrigin: "",
    meansOfIdentification: "",
    // hobbies: "",
    // citiesVisited: "",
    // countriesVisited: "",
    // citiesForPlanning: "",
    timeAvailability: 0,
  };

  const handleDate = (date, dateString) => {
    setDateOfBirth(date._d);
  };

  const handleMeansOfIdentification = (e: any) => {
    const value = e.target.value;
    setMeansOfIdentification(value);
  };

  const onImageChange = async (imageList: ImageListType) => {
    // setIsLoading(true);
    const formData = new FormData();
    console.log(imageList);
    const file: any = imageList[0].file;
    formData.append("Photo", file, file.name);
    // formData.append("UserId", userId);
    // await updateUserPicture(formData);
    // setIsLoading(false);
    const image = document.getElementById(
      "main_photo_preview"
    ) as HTMLImageElement;
    image.style.display = "block";
    image.src = imageList[0].dataURL as string;
  };

  // function to handle placesBeenTo click to delete
  const handlePlacesRemove = (action: string, id: any) => {
    let data: any;
    switch (action) {
      case "countriesVisited":
        data = countriesVisited.filter((item, key) => key !== parseInt(id));
        setCountriesVisited([...data]);
        break;
      case "citiesVisited":
        data = citiesVisited.filter((item, key) => key !== parseInt(id));
        setCitiesVisited([...data]);
        break;

      default:
        break;
    }
  };

  const onSubmit = (data: any) => {
    console.log({ ...data, countriesVisited, citiesVisited });

    // setIsLoading(true);

    if (countriesVisited.length >= 0) {
      message.error(
        "Error, please make sure you select at least one country.",
        3
      );
      setIsLoading(false);
      return;
    }

    if (countriesVisited.length <= 0) {
      message.error("Error, please make sure you select at least one city.", 3);
      setIsLoading(false);
      return;
    }

    // send data to backend
    // signUp(formData)
    //   .then((res) => {
    //     authContext.login();
    //     authContext.setUserId(res.userId);
    //   })
    //   .catch(() => {
    //     setIsLoading(false);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  return (
    <>
      <Spin spinning={isLoading} size="large">
        <div className="basic_details_container">
          <div className="basic_details_word">
            <h1 className="basic_details_header fs-1">
              Ambassador Application
            </h1>
            <h3 className="basic_details_title">Kindly fill in all details.</h3>
          </div>
          <div>
            {/* Formik */}
            <Formik
              initialValues={initialValues}
              validationSchema={AmbassadorApplicationSchema}
              onSubmit={(values) => {
                onSubmit(values);
              }}
            >
              {({
                errors,
                touched,
                handleSubmit,
                handleChange,
                handleBlur,
              }) => (
                //  ambassador form

                <form onSubmit={handleSubmit} autoComplete="none">
                  <div>
                    <label className="basic_details_label">Full Name</label>
                    <input
                      name="fullName"
                      className="basic_details_input"
                      type="text"
                      placeholder="Full Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.fullName && touched.fullName ? (
                      <p className="red_alert">{errors.fullName}</p>
                    ) : null}
                  </div>
                  <div>
                    <label className="basic_details_label">Date of Birth</label>
                    <DatePicker
                      name="dateOfBirth"
                      style={{
                        display: "flex",
                        height: "45px",
                        borderRadius: "10px",
                        margin: "7px auto 20px",
                        border: "2px solid #ccc",
                      }}
                      className="basic_details_input"
                      onChange={handleDate}
                    />
                    {errors.dateOfBirth && touched.dateOfBirth ? (
                      <p className="red_alert">{errors.dateOfBirth}</p>
                    ) : null}
                  </div>

                  <div className="basic_details_country">
                    <label className="basic_details_label">
                      Country of Residence
                    </label>
                    <Autocomplete
                      apiKey={GOOGLEAPIKEY}
                      onPlaceSelected={(selected: any) => {
                        setCountry(selected.formatted_address);
                      }}
                      options={{
                        types: ["country"],
                        fields: ["formatted_address"],
                      }}
                      placeholder="Country of Residence"
                      className="basic_details_input"
                      id="country_input"
                    />
                  </div>
                  <div className="basic_details_country">
                    <label className="basic_details_label">
                      Countries visited
                    </label>
                    <Autocomplete
                      apiKey={GOOGLEAPIKEY}
                      onPlaceSelected={(selected: any) => {
                        setCountriesVisited((prev) => {
                          if (prev.includes(selected.formatted_address)) {
                            return [...prev];
                          } else {
                            return [...prev, selected.formatted_address];
                          }
                        });
                        (
                          document.getElementById(
                            "countries_input"
                          ) as HTMLInputElement
                        ).value = "";
                      }}
                      options={{
                        types: ["country"],
                        fields: ["formatted_address"],
                      }}
                      placeholder="Enter country name"
                      className="basic_details_input"
                      id="countries_input"
                    />
                    {countriesVisited.length > 0 && (
                      <div className="bucket_list_tag_container">
                        {countriesVisited.map((item, key) => (
                          // <span key={item.id} className="bucket_list_tag">{item.title}</span>
                          <span
                            key={key}
                            id={key.toString()}
                            className="location_tag"
                            onClick={() =>
                              handlePlacesRemove("countriesVisited", key)
                            }
                          >
                            x {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="basic_details_label">
                      Cities visited
                    </label>
                    <Autocomplete
                      // ref={inputRef}
                      apiKey={GOOGLEAPIKEY}
                      onPlaceSelected={(selected: any) => {
                        setCitiesVisited((prev) => {
                          if (prev.includes(selected.formatted_address)) {
                            return [...prev];
                          } else {
                            return [...prev, selected.formatted_address];
                          }
                        });
                        (
                          document.getElementById(
                            "city_input"
                          ) as HTMLInputElement
                        ).value = "";
                      }}
                      options={{
                        types: [],
                        fields: ["formatted_address"],
                      }}
                      placeholder="Enter city name"
                      className="basic_details_input"
                      id="city_input"
                    />
                    {citiesVisited.length > 0 && (
                      <div className="bucket_list_tag_container">
                        {citiesVisited.map((item, key) => (
                          // <span key={item.id} className="bucket_list_tag">{item.title}</span>
                          <span
                            key={key}
                            id={key.toString()}
                            className="location_tag"
                            onClick={() =>
                              handlePlacesRemove("citiesVisited", key)
                            }
                          >
                            x {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="basic_details_country">
                    <label className="basic_details_label">
                      Means of Identification
                    </label>
                    <select
                      name="meansOfIdentity"
                      className="basic_details_input"
                      onChange={handleMeansOfIdentification}
                    >
                      <option value="NIN">National ID card</option>
                      <option value="DRV">Driver's license</option>
                      <option value="IPASS">International Passport</option>
                    </select>
                  </div>
                  <div className="basic_details_country my-2">
                    <label className="basic_details_label">
                      Upload Document
                    </label>{" "}
                    <br />
                    <ImageUploading value={images} onChange={onImageChange}>
                      {({ onImageUpload, dragProps }) => (
                        // write your building UI
                        <Button
                          onClick={onImageUpload}
                          {...dragProps}
                          icon={<UploadOutlined />}
                          className="mb-3 mt-2"
                        >
                          Click to Upload
                        </Button>
                      )}
                    </ImageUploading>
                    <span>
                      <img
                        width={150}
                        height={100}
                        style={{ display: "none" }}
                        src=""
                        alt=""
                        id="main_photo_preview"
                        className="mb-3"
                      />
                    </span>
                  </div>

                  <div>
                    <label className="basic_details_label">
                      Hobbies / Interests
                    </label>
                    <div className="basic_details_country my-2">
                      <Select
                        size="large"
                        mode="tags"
                        placeholder="Add tags"
                        style={{
                          width: "100%",
                        }}
                      ></Select>
                    </div>
                    <small>Please press enter to separate each tag</small>
                  </div>
                  <br />
                  <div>
                    <label className="basic_details_label">
                      Cities of Interest for Planning
                    </label>
                    <Autocomplete
                      // ref={inputRef}
                      apiKey={GOOGLEAPIKEY}
                      onPlaceSelected={(selected: any) => {
                        setCitiesOfPlanning((prev) => {
                          if (prev.includes(selected.formatted_address)) {
                            return [...prev];
                          } else {
                            return [...prev, selected.formatted_address];
                          }
                        });
                        (
                          document.getElementById(
                            "cities_of_interest"
                          ) as HTMLInputElement
                        ).value = "";
                      }}
                      options={{
                        types: [],
                        fields: ["formatted_address"],
                      }}
                      placeholder="Enter city name"
                      className="basic_details_input"
                      id="cities_of_interest"
                    />
                    {citiesOfPlanning.length > 0 && (
                      <div className="bucket_list_tag_container">
                        {citiesOfPlanning.map((item, key) => (
                          // <span key={item.id} className="bucket_list_tag">{item.title}</span>
                          <span
                            key={key}
                            id={key.toString()}
                            className="location_tag"
                            onClick={() =>
                              handlePlacesRemove("citiesVisited", key)
                            }
                          >
                            x {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="basic_details_label">
                      Amount of time available / week for activities
                    </label>
                    <small style={{ display: "block" }}>
                      (Enter time in mins e.g 120 for 2hours)
                    </small>
                    <input
                      name="timeAvailability"
                      className="basic_details_input"
                      type="number"
                      placeholder="Time availability"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue={0}
                    />
                    {errors.timeAvailability && touched.timeAvailability ? (
                      <p className="red_alert">{errors.timeAvailability}</p>
                    ) : null}
                  </div>

                  <div className="basic_details_button_container">
                    <button className="basic_details_button" type="submit">
                      Submit!
                    </button>
                  </div>
                </form>

                // End of ambassador form
              )}
            </Formik>
            {/* End of Formik */}
          </div>
        </div>
      </Spin>
    </>
  );
};

export default AmbassadorApplication;
