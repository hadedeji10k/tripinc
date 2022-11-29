import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import "antd/dist/antd.css";
import { Input, Select, message, Spin, DatePicker, Button } from "antd";
import Autocomplete from "react-google-autocomplete";
import { UploadOutlined } from "@mui/icons-material";
import moment from "moment";
import { GOOGLEAPIKEY } from "../../../utils/constants";
import { Formik } from "formik";
import { AmbassadorApplicationSchema } from "../../../schema/yupSchema";
import { localGetUserFullName } from "../../../utils/helpers";
import { TripPlannerApplicationData } from "../Admin/AdminAmbassadorApplication";
import Swal from "sweetalert2";

const { Option } = Select;
const { TextArea } = Input;
const ratingDesc = ["terrible", "bad", "normal", "good", "wonderful"];

const TripPlannerApplication = {
  fullName: "",
  dateOfBirth: "",
  meansOfIdentification: "",
  timeAvailability: 0,
  images: [],
  countriesVisited: [],
  citiesVisited: [],
  citiesOfPlanning: [],
  country: "",
  hobbies: [],
};

const AmbassadorApplication = () => {
  const { type } = useParams();

  const [edit, setEdit] = useState(false);
  const [formEdit, setFormEdit] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [data, setData] = useState<any>(TripPlannerApplication);
  const [tempData, setTempData] = useState<any>(TripPlannerApplication);

  useEffect(() => {
    if (type === "edit") {
      setEdit(true);
      setData(TripPlannerApplicationData);
      setTempData(TripPlannerApplicationData);
      // here set the data fetched from the backend
    } else {
      setEdit(false);
      setData((prev) => {
        return {
          ...prev,
          fullName: localGetUserFullName(),
        };
      });
      setTempData((prev) => {
        return {
          ...prev,
          fullName: localGetUserFullName(),
        };
      });
    }
  }, [type]);

  //   Full Name
  // Date Of Birth
  // Country of Residence
  // Means of identification
  // Hobbies/Interest
  // Cities/Countries visited
  // Cities of interest for Planning
  // Amount of time available/week/month for activities

  const initialValues = {
    fullName: data.fullName,
    dateOfBirth: "",
    // countryOfOrigin: "",
    meansOfIdentification: "",
    // hobbies: "",
    // citiesVisited: "",
    // countriesVisited: "",
    // citiesForPlanning: "",
    timeAvailability: 0,
  };

  const handleCancelEdit = () => {
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to cancel editing?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        setData(tempData);
        setFormEdit(false);
      }
    });
  };

  const handleDate = (date, dateString) => {
    setData((prev) => {
      return {
        ...prev,
        dateOfBirth: date._d,
      };
    });
  };

  const handleMeansOfIdentification = (e: any) => {
    const value = e.target.value;
    setData((prev) => {
      return {
        ...prev,
        meansOfIdentification: value,
      };
    });
  };

  const onImageChange = async (imageList: ImageListType) => {
    setData((prev) => {
      return {
        ...prev,
        images: imageList,
      };
    });
    // setIsLoading(true);
    const formData = new FormData();
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
    let filtered: any;
    switch (action) {
      case "countriesVisited":
        filtered = data.countriesVisited.filter(
          (item, key) => key !== parseInt(id)
        );
        setData((prev) => {
          return {
            ...prev,
            countriesVisited: filtered,
          };
        });
        break;
      case "citiesVisited":
        filtered = data.citiesVisited.filter(
          (item, key) => key !== parseInt(id)
        );
        setData((prev) => {
          return {
            ...prev,
            citiesVisited: filtered,
          };
        });
        break;
      case "citiesOfPlanning":
        filtered = data.citiesOfPlanning.filter(
          (item, key) => key !== parseInt(id)
        );
        setData((prev) => {
          return {
            ...prev,
            citiesOfPlanning: filtered,
          };
        });
        break;

      default:
        break;
    }
  };

  const handleHobbiesChange = (value: string[]) => {
    setData((prev) => {
      return {
        ...prev,
        hobbies: value,
      };
    });
  };

  const onSubmit = (data: any) => {
    console.log({
      ...data,
    });

    // setIsLoading(true);
    if (data.countriesVisited.length <= 0) {
      message.error(
        "Error, please make sure you select at least one country.",
        3
      );
      setIsLoading(false);
      return;
    }

    if (data.citiesVisited.length <= 0) {
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
          {edit ? (
            <div className="d-flex flex-row mt-3 mx-auto w_90 justify-content-around align-items-center">
              <span className="">Status: Pending</span>
              <span className="">
                {formEdit ? (
                  <button
                    className="basic_details_button bg-danger"
                    type="submit"
                    onClick={handleCancelEdit}
                  >
                    Cancel edit!
                  </button>
                ) : (
                  <button
                    className="basic_details_button"
                    type="submit"
                    onClick={() => setFormEdit(true)}
                  >
                    Edit!
                  </button>
                )}
              </span>
            </div>
          ) : null}
          <div className="basic_details_word">
            <h1 className="basic_details_header fs-1 mt-3">
              Trip Planner Application
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
                      className="custom_input"
                      type="text"
                      placeholder="Full Name"
                      defaultValue={data.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled
                    />
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
                      className="custom_input"
                      onChange={handleDate}
                      disabled={edit ? !formEdit : false}
                      defaultValue={
                        data.dateOfBirth ? moment(data.dateOfBirth) : moment()
                      }
                    />
                    {errors.dateOfBirth && touched.dateOfBirth ? (
                      <p className="red_alert">{errors.dateOfBirth}</p>
                    ) : null}
                  </div>

                  <div className="basic_details_country">
                    <label className="basic_details_label">
                      Country of Residence
                    </label>
                    {edit ? (
                      <input
                        name="country"
                        className="custom_input"
                        type="text"
                        placeholder="Country of Residence"
                        disabled={!formEdit}
                        defaultValue={data.country}
                      />
                    ) : (
                      <Autocomplete
                        apiKey={GOOGLEAPIKEY}
                        onPlaceSelected={(selected: any) => {
                          setData((prev) => {
                            return {
                              ...prev,
                              country: selected.formatted_address,
                            };
                          });
                        }}
                        options={{
                          types: ["country"],
                          fields: ["formatted_address"],
                        }}
                        placeholder="Country of Residence"
                        className="custom_input"
                        id="country_input"
                      />
                    )}
                  </div>
                  <div className="basic_details_country">
                    <label className="basic_details_label">
                      Countries visited
                    </label>
                    {formEdit || !edit ? (
                      <Autocomplete
                        apiKey={GOOGLEAPIKEY}
                        onPlaceSelected={(selected: any) => {
                          setData((prev) => {
                            return {
                              ...prev,
                              countriesVisited: [
                                ...prev.countriesVisited,
                                selected.formatted_address,
                              ],
                            };
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
                        className="custom_input"
                        id="countries_input"
                      />
                    ) : null}
                    {data.countriesVisited.length > 0 && (
                      <div className="bucket_list_tag_container">
                        {data.countriesVisited.map((item, key) => (
                          <span
                            key={key}
                            id={key.toString()}
                            className="preferences_not_clicked"
                            onClick={() =>
                              formEdit || !edit
                                ? handlePlacesRemove("countriesVisited", key)
                                : ""
                            }
                          >
                            {formEdit || !edit ? `x ${item}` : item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="basic_details_label">
                      Cities visited
                    </label>
                    {formEdit || !edit ? (
                      <Autocomplete
                        // ref={inputRef}
                        apiKey={GOOGLEAPIKEY}
                        onPlaceSelected={(selected: any) => {
                          setData((prev) => {
                            return {
                              ...prev,
                              citiesVisited: [
                                ...prev.citiesVisited,
                                selected.formatted_address,
                              ],
                            };
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
                        className="custom_input"
                        id="city_input"
                      />
                    ) : null}
                    {data.citiesVisited.length > 0 && (
                      <div className="bucket_list_tag_container">
                        {data.citiesVisited.map((item, key) => (
                          // <span key={item.id} className="bucket_list_tag">{item.title}</span>
                          <span
                            key={key}
                            id={key.toString()}
                            className="preferences_not_clicked"
                            onClick={() =>
                              !edit || formEdit
                                ? handlePlacesRemove("citiesVisited", key)
                                : ""
                            }
                          >
                            {formEdit || !edit ? `x ${item}` : item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="basic_details_country">
                    <label className="basic_details_label">
                      Means of Identification
                    </label>
                    {formEdit || !edit ? (
                      <select
                        name="meansOfIdentity"
                        className="custom_input"
                        onChange={handleMeansOfIdentification}
                      >
                        <option value="NIN">National ID card</option>
                        <option value="DRV">Driver's license</option>
                        <option value="IPASS">International Passport</option>
                      </select>
                    ) : (
                      <input
                        name="country"
                        className="custom_input"
                        type="text"
                        placeholder="Means of Identification"
                        disabled
                        defaultValue={data.meanOfIdentification}
                      />
                    )}
                  </div>
                  <div className="basic_details_country my-2">
                    <label className="basic_details_label">
                      {formEdit || !edit
                        ? "Upload Document"
                        : "Document uploaded"}
                    </label>{" "}
                    <br />
                    {formEdit || !edit ? (
                      <ImageUploading
                        value={data.images}
                        onChange={onImageChange}
                      >
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
                    ) : null}
                    <span>
                      <img
                        width={150}
                        height={100}
                        style={{ display: "none" }}
                        src={data.images[0]?.dataURL}
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
                      {formEdit || !edit ? (
                        <>
                          <Select
                            size="large"
                            mode="tags"
                            placeholder="Add tags"
                            style={{
                              width: "100%",
                            }}
                            onChange={handleHobbiesChange}
                            defaultValue={data.hobbies}
                          ></Select>
                          <small>Please press enter to separate each tag</small>
                        </>
                      ) : data.hobbies.length > 0 ? (
                        <div className="bucket_list_tag_container">
                          {data.hobbies.map((item, key) => (
                            <span
                              key={key}
                              id={key.toString()}
                              className="preferences_not_clicked"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p>No hobbies</p>
                      )}
                    </div>
                  </div>
                  <br />
                  <div>
                    <label className="basic_details_label">
                      Cities of Interest for Planning
                    </label>
                    {formEdit || !edit ? (
                      <Autocomplete
                        // ref={inputRef}
                        apiKey={GOOGLEAPIKEY}
                        onPlaceSelected={(selected: any) => {
                          setData((prev) => {
                            return {
                              ...prev,
                              citiesOfPlanning: [
                                ...prev.citiesOfPlanning,
                                selected.formatted_address,
                              ],
                            };
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
                        className="custom_input"
                        id="cities_of_interest"
                      />
                    ) : null}
                    {data.citiesOfPlanning.length > 0 && (
                      <div className="bucket_list_tag_container">
                        {data.citiesOfPlanning.map((item, key) => (
                          // <span key={item.id} className="bucket_list_tag">{item.title}</span>
                          <span
                            key={key}
                            id={key.toString()}
                            className="preferences_not_clicked"
                            onClick={() =>
                              formEdit || !edit
                                ? handlePlacesRemove("citiesOfPlanning", key)
                                : ""
                            }
                          >
                            {formEdit || !edit ? `x ${item}` : item}
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
                      className="custom_input"
                      type="number"
                      placeholder="Time availability"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue={data.timeAvailability}
                      disabled={edit ? !formEdit : false}
                    />
                    {errors.timeAvailability && touched.timeAvailability ? (
                      <p className="red_alert">{errors.timeAvailability}</p>
                    ) : null}
                  </div>
                  {!edit || formEdit ? (
                    <div className="basic_details_button_container">
                      <button className="basic_details_button" type="submit">
                        Submit!
                      </button>
                    </div>
                  ) : (
                    <>
                      <br />
                    </>
                  )}
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
