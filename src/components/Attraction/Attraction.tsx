import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BsInfoSquare } from "react-icons/bs";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Rate,
  TimePicker,
  message,
} from "antd";
import Autocomplete from "react-google-autocomplete";
import { DeleteOutlined, UploadOutlined } from "@mui/icons-material";
import { ImLocation } from "react-icons/im";
import { MdAccessTime } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import moment from "moment";
import { GOOGLEAPIKEY } from "../../utils/constants";
import { getAllCategories } from "../../api";
import { ICategory } from "../../api/interfaces";

const { Option } = Select;
const { TextArea } = Input;
const ratingDesc = ["terrible", "bad", "normal", "good", "wonderful"];

const CreateAttraction = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [categories, setCategories] = useState<ICategory[]>([]);

  const [images] = useState([]);
  const [otherImages, setOtherImages] = useState<
    ImageListType[] | ImageType[] | any
  >([]);
  const [ratingValue, setRatingValue] = useState(3);
  const [form] = Form.useForm();

  const [images2, setImages2] = useState([]);

  const [bestVisitingTime, setBestVisitingTime] = useState<any>([]);

  // Location states
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getAllCategories().then((res) => {
      setCategories(res.data);
      setIsLoading(false);
    });
  }, []);

  const LocationInputs: any = () => {
    interface LocationInputsProps {
      onChange?: (value: string) => void;
    }

    const CountryInput: React.FC<LocationInputsProps> = ({ onChange }) => {
      const triggerChange = (changedValue: string) => {
        onChange?.(changedValue);
      };

      const onCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCountry = e.target.value;
        triggerChange(newCountry);
      };

      return (
        <Autocomplete
          apiKey={GOOGLEAPIKEY}
          onPlaceSelected={(selected: any) => {
            setCountry(selected.formatted_address);
          }}
          defaultValue={country}
          onChange={onCountryChange}
          options={{
            types: ["country"],
            fields: ["formatted_address"],
          }}
          className="ant-input ant-input-lg"
        />
      );
    };

    const CityInput: React.FC<LocationInputsProps> = ({ onChange }) => {
      const triggerChange = (changedValue: string) => {
        onChange?.(changedValue);
      };

      const onCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCity = e.target.value;
        triggerChange(newCity);
      };

      return (
        <Autocomplete
          apiKey={GOOGLEAPIKEY}
          onPlaceSelected={(selected: any) => {
            setCity(selected.formatted_address);
          }}
          defaultValue={city}
          onChange={onCityChange}
          options={{
            types: [],
            fields: ["formatted_address"],
          }}
          className="ant-input ant-input-lg"
        />
      );
    };

    const LocationInput: React.FC<LocationInputsProps> = ({ onChange }) => {
      const triggerChange = (changedValue: string) => {
        onChange?.(changedValue);
      };

      const onLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newLocation = e.target.value;
        triggerChange(newLocation);
      };

      return (
        <Autocomplete
          apiKey={GOOGLEAPIKEY}
          onPlaceSelected={(selected: any) => {
            setLocation(selected.formatted_address);
          }}
          defaultValue={location}
          onChange={onLocationChange}
          options={{
            types: [],
            fields: ["formatted_address"],
          }}
          className="ant-input ant-input-lg"
        />
      );
    };

    // <Autocomplete
    //   apiKey={GOOGLEAPIKEY}
    //   onPlaceSelected={(selected: any) => {
    //     setCountry(selected.formatted_address);
    //   }}
    //   defaultValue={country}
    //   onChange={onCountryChange}
    //   options={{
    //     types: ["country"],
    //     fields: ["formatted_address"],
    //   }}
    //   className="ant-input ant-input-lg"
    // />
    return (
      <>
        <Row className="my-3">
          <Col>
            <Form.Item
              name="location"
              label="Location"
              rules={[
                {
                  required: true,
                  message: "Please input a location!",
                },
              ]}
            >
              <LocationInput />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="post_code"
              label="Post Code"
              rules={[
                {
                  type: "string",
                  message: "The input is not valid!",
                },
                {
                  required: true,
                  message: "Please input a post code!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>
            <Form.Item
              name="city"
              label="City"
              rules={[
                {
                  required: true,
                  message: "Please input a valid city!",
                },
              ]}
            >
              <CityInput />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="country"
              label="Country"
              rules={[
                {
                  required: true,
                  message: "Please input a country!",
                },
              ]}
            >
              <CountryInput />
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  };

  const handleTime = (time: any, timeString: string): void => {
    console.log(time, timeString);
    // setTime(timeString);
  };

  const deleteBestVisitingTime = (index) => {
    const filtered = bestVisitingTime.filter((item, id) => index !== id);
    setBestVisitingTime(filtered);
  };

  const addBestVisitingTime = () => {
    if (bestVisitingTime.length < 4) {
      setBestVisitingTime([...bestVisitingTime, {}]);
    } else {
      message.error("Error, you can only add up to 5 best visiting time", 3);
    }
  };

  const otherImageChanges = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages2(imageList);
  };

  const onFinish = (values) => {
    let bestVisitingTime = [
      values.bestVisitingTime && values.bestVisitingTime,
      values.bestVisitingTime2 && values.bestVisitingTime2,
      values.bestVisitingTime3 && values.bestVisitingTime3,
      values.bestVisitingTime4 && values.bestVisitingTime4,
      values.bestVisitingTime5 && values.bestVisitingTime5,
    ];
    bestVisitingTime = bestVisitingTime.filter((item) => !!item);
    delete values.bestVisitingTime2;
    delete values.bestVisitingTime3;
    delete values.bestVisitingTime4;
    delete values.bestVisitingTime5;
    const newValues = {
      ...values,
      country,
      location,
      city,
      bestVisitingTime,
    };
    console.log("Received values of form: ", newValues);
  };

  const handleSelectChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const removeFromMultipleImages = (id) => {
    const filtered = otherImages.filter((item, index) => id !== index);
    console.log(filtered);
    setOtherImages(filtered);
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
    image.style.display = "";
    image.src = imageList[0].dataURL as string;
  };

  return (
    <>
      <h3 className="fs-2 text-center my-4">Create Attraction</h3>
      <Container className="p-3">
        {/* <Container className="border border-2 rounded-1">
        <h1 className="header border-bottom">Welcome To React-Bootstrap</h1>
      </Container> */}
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{ country, city, location }}
          scrollToFirstError
          size="large"
          layout="inline"
        >
          <Container className="border border-2 rounded-1 my-3">
            <div className="border-bottom text-start my-3">
              <span className="fs-4 me-3">
                <BsInfoSquare />
              </span>
              <h3 className="d-inline fs-3">Basic Info</h3>
            </div>
            <div className="my-4">
              <p>The field marked with * are required</p>

              <Row>
                <Col>
                  <Form.Item
                    name="categories"
                    label="Category"
                    rules={[
                      {
                        required: true,
                        message: "Please select at least one category!",
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select"
                      onChange={handleSelectChange}
                    >
                      {categories.map((item) => (
                        <Option key={item.id}>{item.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    name="photo"
                    label="Main photo"
                    rules={[
                      {
                        required: true,
                        message: "Please upload an image!",
                      },
                    ]}
                  >
                    <ImageUploading value={images} onChange={onImageChange}>
                      {({ onImageUpload, dragProps }) => (
                        // write your building UI
                        <Button
                          onClick={onImageUpload}
                          {...dragProps}
                          icon={<UploadOutlined />}
                        >
                          Click to Upload
                        </Button>
                      )}
                    </ImageUploading>
                  </Form.Item>
                  <span>
                    <img
                      width={150}
                      height={100}
                      style={{ display: "none" }}
                      src=""
                      alt=""
                      id="main_photo_preview"
                      className="mt-3"
                    />
                  </span>
                </Col>
              </Row>
              <Row className="my-3">
                <Col>
                  <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                      {
                        type: "string",
                        message: "The input is not valid!",
                      },
                      {
                        required: true,
                        message: "Please input a title!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="my-3">
                <Col>
                  <Form.Item
                    name="price"
                    label="Price"
                    rules={[
                      {
                        type: "number",
                        message: "Please enter number!",
                      },
                      {
                        required: true,
                        message: "Please input the price!",
                      },
                    ]}
                  >
                    <InputNumber />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    name="rating"
                    label="Average Rating"
                    //   rules={[
                    //     {
                    //       type: "string",
                    //     },
                    //     {
                    //       required: true,
                    //       message: "Please select a range!",
                    //     },
                    //   ]}
                  >
                    <Rate
                      tooltips={ratingDesc}
                      onChange={setRatingValue}
                      value={ratingValue}
                    />
                  </Form.Item>
                  {ratingValue ? (
                    <span className="ant-rate-text">
                      {ratingDesc[ratingValue - 1]}
                    </span>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                      {
                        type: "string",
                      },
                      {
                        required: true,
                        message: "Please enter a description!",
                      },
                    ]}
                  >
                    <TextArea
                      style={{
                        resize: "none",
                      }}
                      rows={7}
                      placeholder="Description"
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    name="rating_comment"
                    label="Rating Comment"
                    rules={[
                      {
                        type: "string",
                      },
                    ]}
                  >
                    <TextArea
                      style={{
                        resize: "none",
                      }}
                      rows={7}
                      placeholder="Your rating comment"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="my-3">
                <Form.Item name="keywords" label="Keywords / Tags">
                  <Select
                    mode="tags"
                    style={{ width: "100%" }}
                    placeholder="Add tags"
                  >
                    <Option key={1}>1</Option>
                    <Option key={2}>2</Option>
                    <Option key={3}>3</Option>
                    <Option key={4}>4</Option>
                    <Option key={5}>5</Option>
                    <Option key={6}>6</Option>
                  </Select>
                </Form.Item>
                <p>Please press enter to separate each tag</p>
              </Row>
            </div>
          </Container>
          <Container className="border border-2 rounded-1 my-3">
            <div className="border-bottom text-start my-3">
              <span className="fs-4 me-3">
                <ImLocation />
              </span>
              <h3 className="d-inline fs-3">Location</h3>
            </div>
            <div className="my-4">
              <LocationInputs />
            </div>
          </Container>
          <Container className="border border-2 rounded-1 my-3">
            <div className="border-bottom text-start my-3">
              <span className="fs-4 me-3">
                <MdAccessTime />
              </span>
              <h3 className="d-inline fs-3">Visiting Details</h3>
            </div>
            <div className="my-4">
              <Row className="my-3">
                <Col>
                  <Form.Item
                    name="openingDay"
                    label="Opening Day"
                    rules={[
                      {
                        required: true,
                        message: "Please select at least a day!",
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select days"
                    >
                      <Option key={1} value="Monday">
                        Monday
                      </Option>
                      <Option key={2} value="Tuesday">
                        Tuesday
                      </Option>
                      <Option key={3} value="Wednesday">
                        Wednesday
                      </Option>
                      <Option key={4} value="Thursday">
                        Thursday
                      </Option>
                      <Option key={5} value="Friday">
                        Friday
                      </Option>
                      <Option key={6} value="Saturday">
                        Saturday
                      </Option>
                      <Option key={7} value="Sunday">
                        Sunday
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    name="typicalTimeSpent"
                    label="Typical Time spent"
                    rules={[
                      {
                        type: "number",
                        message: "The input is not valid!",
                      },
                      {
                        required: true,
                        message: "Please input a valid number!",
                      },
                    ]}
                  >
                    <InputNumber />
                  </Form.Item>
                  <small>(Enter time in mins e.g 120 for 2hours)</small>
                </Col>
              </Row>
              <Row className="my-3">
                <Col>
                  <Form.Item
                    name="openingHour"
                    label="Opening Hour"
                    rules={[
                      {
                        type: "object" as const,
                        required: true,
                        message: "Please select time!",
                      },
                    ]}
                  >
                    <TimePicker />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    name="closingHour"
                    label="Closing Hour"
                    rules={[
                      {
                        type: "object" as const,
                        required: true,
                        message: "Please select time!",
                      },
                    ]}
                  >
                    <TimePicker />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Item
                    className="d-inline"
                    name="bestVisitingTime"
                    label="Best Visiting Time"
                    rules={[
                      {
                        type: "object" as const,
                        required: true,
                        message: "Please select best visiting time!",
                      },
                    ]}
                  >
                    <TimePicker
                      onChange={handleTime}
                      defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                    />
                  </Form.Item>
                  <Button onClick={addBestVisitingTime}>Add</Button>
                  {bestVisitingTime &&
                    bestVisitingTime.length > 0 &&
                    bestVisitingTime.map((item, index) => (
                      <div className="my-2" key={index}>
                        <Form.Item
                          className="d-inline"
                          name={`bestVisitingTime${index + 2}`}
                          label={`Best Visiting Time ${index + 2}`}
                          rules={[
                            {
                              type: "object" as const,
                              required: true,
                              message: "Please select best visiting time!",
                            },
                          ]}
                        >
                          <TimePicker
                            onChange={handleTime}
                            defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                          />
                        </Form.Item>
                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => deleteBestVisitingTime(index)}
                        >
                          Delete
                        </Button>
                      </div>
                    ))}
                </Col>
              </Row>
            </div>
          </Container>
          <Container className="border border-2 rounded-1 my-3">
            <div className="border-bottom text-start my-3">
              <span className="fs-4 me-3">
                <FaInfoCircle />
              </span>
              <h3 className="d-inline fs-3">Others</h3>
            </div>
            <div className="my-4">
              <Row className="my-3">
                <Col>
                  <Form.Item name="greatFor" label="Great For">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select "
                    >
                      <Option key={1} value="Kids">
                        Kids
                      </Option>
                      <Option key={2} value="Couples">
                        Couples
                      </Option>
                      <Option key={3} value="Family">
                        Family
                      </Option>
                      <Option key={4} value="Friends">
                        Friends
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item name="thingsToPackList" label="Things to pack">
                    <Select
                      mode="tags"
                      style={{ width: "100%" }}
                      placeholder="Add Items"
                    ></Select>
                  </Form.Item>
                  <p>Please press enter to separate each tag</p>
                </Col>
              </Row>
              <Row className="my-3">
                <Col>
                  <Form.Item name="other_pictures" label="Other Pictures">
                    <ImageUploading
                      multiple
                      value={images2}
                      onChange={otherImageChanges}
                      maxNumber={15}
                      maxFileSize={2097152}
                      acceptType={["jpg", "png", "jpeg"]}
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                          <div className="mb-3">
                            <Button
                              style={isDragging ? { color: "red" } : undefined}
                              onClick={onImageUpload}
                              {...dragProps}
                              icon={<UploadOutlined />}
                              className="me-3"
                            >
                              Click or Drop here
                            </Button>
                            &nbsp;
                            <Button onClick={onImageRemoveAll}>
                              Remove all images
                            </Button>
                          </div>
                          {imageList.map((image, index) => (
                            <span
                              key={index}
                              className="d-inline-flex flex-column align-items-center me-3"
                            >
                              <img
                                src={image.dataURL}
                                alt=""
                                width="100"
                                height="100"
                                className="d-block mb-2"
                              />
                              <span className="">
                                <Button
                                  onClick={() => onImageUpdate(index)}
                                  className="me-2"
                                >
                                  Update
                                </Button>
                                <Button onClick={() => onImageRemove(index)}>
                                  Remove
                                </Button>
                              </span>
                            </span>
                          ))}
                        </div>
                      )}
                    </ImageUploading>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="text-center mx-auto">
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default CreateAttraction;
