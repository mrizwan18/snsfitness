import React from "react";
import { TextInput, View, Text, TouchableHighlight } from "react-native";
import RadioForm from "react-native-simple-radio-button";
import * as WebBrowser from "expo-web-browser";

import styles from "./styles";
import { Formik } from "formik";
import { ScrollView } from "react-native-gesture-handler";
import * as yup from "yup";
import { Linking } from "react-native";
import qs from "qs";
const reviewSchema = yup.object({
  fname: yup.string().required(),
  lname: yup.string().required(),
  email: yup.string().required().email(),
  phone: yup.string(),
  mobile: yup.string().required(),
  address: yup.string().required(),
  postcode: yup.string().required(),
  bdate: yup.string().required(),
  kinName: yup.string().required(),
  kinContact: yup.string().required(),
  kinDoctor: yup.string(),
  kinSurgery: yup.string().required(),
});
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yes_no: 0,
      fire: false,
      member: false,
    };
  }
  _handleOpenWithWebBrowser = () => {
    WebBrowser.openBrowserAsync("http://www.snsfitness.co.uk/fire_exit.html");
  };
  _handleOpenWithWebBrowserTerms = () => {
    WebBrowser.openBrowserAsync(
      "http://www.snsfitness.co.uk/terms&conditions.pdf"
    );
  };
  async sendEmail(to, subject, body, options = {}) {
    const { cc, bcc } = options;

    let url = `mailto:${to}`;

    // Create email link query
    const query = qs.stringify({
      subject: subject,
      body: body,
      cc: cc,
      bcc: bcc,
    });

    if (query.length) {
      url += `?${query}`;
    }

    // check if we can use this link
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
      throw new Error("Provided URL can not be handled");
    }

    return Linking.openURL(url);
  }

  generateBody(values) {
    let output = "";
    output += "<b>First Name: </b>" + values.fname + "<br>";
    output += "<b>Last Name: </b>" + values.lname + "<br>";
    output += "<b>Email: </b>" + values.email + "<br>";
    output += "<b>Phone: </b>" + values.phone + "<br>";
    output += "<b>Mobile Number: </b>" + values.mobile + "<br>";
    output += "<b>Birth Date: </b>" + values.bdate + "<br>";
    output += "<b>Address: </b>" + values.address + "<br>";
    output += "<b>Postcode: </b>" + values.postcode + "<br>";
    output +=
      "<b>Health and Safety Conditions: </b>" + values.conditions + "<br>";
    output += "<b>Kin's Name: </b>" + values.kinName + "<br>";
    output += "<b>Kin's Contact: </b>" + values.kinContact + "<br>";
    output += "<b>Kin's Doctor: </b>" + values.kinDoctor + "<br>";
    output += "<b>Surgery: </b>" + values.kinSurgery + "<br>";
    return output;
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.h2}>Club Membership Registration</Text>
          <Text style={styles.h3}>
            Complete the form below to sign up for our membership service.
          </Text>

          <Formik
            initialValues={{
              fname: "",
              lname: "",
              email: "",
              phone: "",
              mobile: "",
              bdate: "",
              address: "",
              postcode: "",
              radio: [
                { label: "YES", value: 1 },
                { label: "NO", value: 0 },
              ],
              health_safety_conditions: 0,
              fire: [{ label: "YES", value: 1 }],
              member: "",
              conditions: "",
              kinName: "",
              kinContact: "",
              kinDoctor: "",
              kinSurgery: "",
            }}
            validationSchema={reviewSchema}
            onSubmit={(values, actions) => {
              let body = this.generateBody(values);
              actions.resetForm();
              this.sendEmail(
                "snsreg1@gmail.com",
                "Registration form of " + values.fname + " " + values.lname,
                "<html><body>" + body + "</body></html>"
              ).then(() => {
                alert(
                  "Registration info successfully sent to snsreg1@gmail.com "
                );
                console.log(
                  "Registration info successfully sent to snsreg1@gmail.com "
                );
              });
            }}
          >
            {(props) => (
              <View style={styles.formContainer}>
                <View style={styles.formInput}>
                  <Text style={styles.label}>Firstname *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Please Enter Your First Name"
                    onChangeText={props.handleChange("fname")}
                    value={props.values.fname}
                    onBlur={props.handleBlur("fname")}
                  />
                  <Text>{props.touched.fname && props.errors.fname}</Text>

                  <Text style={styles.label}>Lastname *</Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Please Enter Your Last Name"
                    onChangeText={props.handleChange("lname")}
                    value={props.values.lname}
                    onBlur={props.handleBlur("lname")}
                  />
                  <Text>{props.touched.lname && props.errors.lname}</Text>

                  <Text style={styles.label}>Email *</Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Please Enter Your Email"
                    onChangeText={props.handleChange("email")}
                    value={props.values.email}
                    keyboardType="email-address"
                    onBlur={props.handleBlur("email")}
                  />
                  <Text>{props.touched.email && props.errors.email}</Text>

                  <Text style={styles.label}>Phone</Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Please Enter Your Phone"
                    onChangeText={props.handleChange("phone")}
                    value={props.values.phone}
                    keyboardType="phone-pad"
                    onBlur={props.handleBlur("phone")}
                  />
                  <Text>{props.touched.phone && props.errors.phone}</Text>

                  <Text style={styles.label}>Mobile *</Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Please Enter Your Mobile Number"
                    onChangeText={props.handleChange("mobile")}
                    value={props.values.mobile}
                    keyboardType="phone-pad"
                    onBlur={props.handleBlur("mobile")}
                  />
                  <Text>{props.touched.mobile && props.errors.mobile}</Text>

                  <Text style={styles.label}>Address *</Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Please Enter Your Address"
                    onChangeText={props.handleChange("address")}
                    value={props.values.address}
                    keyboardType="default"
                    onBlur={props.handleBlur("address")}
                  />
                  <Text>{props.touched.address && props.errors.address}</Text>

                  <Text style={styles.label}>Postcode *</Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Please Enter Your Postcode"
                    onChangeText={props.handleChange("postcode")}
                    value={props.values.postcode}
                    keyboardType="default"
                    onBlur={props.handleBlur("postcode")}
                  />
                  <Text>{props.touched.postcode && props.errors.postcode}</Text>

                  <Text style={styles.label}>Birth Date *</Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Please Enter Your Birthdate"
                    onChangeText={props.handleChange("bdate")}
                    value={props.values.bdate}
                    keyboardType="default"
                    onBlur={props.handleBlur("bdate")}
                  />
                  <Text>{props.touched.bdate && props.errors.bdate}</Text>

                  <Text style={styles.h2}>Health & Safety </Text>
                  <Text
                    style={[
                      styles.h3,
                      { textAlign: "justify", fontWeight: "200" },
                    ]}
                  >
                    The health and safety of all our members who exercise in S &
                    S Fitness Ltd is very important to us. For this reason we
                    wish to establish your current health status before you
                    start your exercise programme. The statements below are
                    designed to identify those persons who should obtain advice
                    from our fitness instructors.
                  </Text>
                  <View>
                    <Text style={styles.listText}>
                      o Do you suffer from a heart condition.
                    </Text>
                    <Text style={styles.listText}>
                      o Do you suffer from breathlessness or chronic asthma.
                    </Text>
                    <Text style={styles.listText}>o Are you diabetic. </Text>
                    <Text style={styles.listText}>
                      o Have you ever had chest pain brought on by exercise or
                      at rest lasting more than 60 seconds.
                    </Text>
                    <Text style={styles.listText}>
                      o Are you aged over 65 and unaccustomed to regular
                      exercise.
                    </Text>
                    <Text style={styles.listText}>
                      o Do you suffer from epilepsy.
                    </Text>
                    <Text style={styles.listText}>
                      o Do you suffer from dizziness or loss of consciousness.
                    </Text>
                    <Text style={styles.listText}>
                      o Are you taking any regularly prescribed drugs or any
                      general medication? i.e. medication for depression etc.
                    </Text>

                    <Text style={styles.listText}>
                      o Have you ever been diagnosed with osteoporosis or suffer
                      from bone or joint problems.
                    </Text>
                    <Text style={styles.listText}>
                      o Do you know of any reason why you Should not start using
                      the gym.
                    </Text>
                    <Text style={styles.listText}>
                      o Do you or have you taken medication for high or low
                      blood pressure or a heart condition.
                    </Text>
                    <Text style={styles.listText}>
                      o Are you currently pregnant.
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.h3,
                      {
                        textAlign: "justify",
                        fontWeight: "bold",
                        fontSize: 16,
                        margin: 10,
                      },
                    ]}
                  >
                    If u Suffer From any of the Above Conditions Please Select
                    Yes or No.
                  </Text>
                  <RadioForm
                    radio_props={props.values.radio}
                    initial={1}
                    formHorizontal={true}
                    buttonColor={"#C2390A"}
                    onPress={(value) => {
                      props.values.health_safety_conditions = value;
                    }}
                  />
                  <Text style={styles.h3}>
                    If yes please state which of the above conditions apply.
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Please write here"
                    onChangeText={props.handleChange("conditions")}
                    value={props.values.conditions}
                    keyboardType="default"
                    onBlur={props.handleBlur("conditions")}
                  />
                  <Text>
                    {props.touched.conditions && props.errors.conditions}
                  </Text>

                  <View>
                    <Text style={styles.h2}>Next of Kin </Text>
                    <Text style={styles.label}>Full Name *</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Please write full name here"
                    onChangeText={props.handleChange("kinName")}
                    value={props.values.kinName}
                    keyboardType="default"
                    onBlur={props.handleBlur("kinName")}
                  />
                  <Text>{props.touched.kinName && props.errors.kinName}</Text>

                  <Text style={styles.label}>Contact No. *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Please write contact number here"
                    onChangeText={props.handleChange("kinContact")}
                    value={props.values.kinContact}
                    keyboardType="phone-pad"
                    onBlur={props.handleBlur("kinContact")}
                  />
                  <Text>
                    {props.touched.kinContact && props.errors.kinContact}
                  </Text>

                  <Text style={styles.label}>Doctor Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Please write doctor's name here"
                    onChangeText={props.handleChange("kinDoctor")}
                    value={props.values.kinDoctor}
                    keyboardType="default"
                    onBlur={props.handleBlur("kinDoctor")}
                  />
                  <Text>
                    {props.touched.kinDoctor && props.errors.kinDoctor}
                  </Text>

                  <Text style={styles.label}>Surgery *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Please write details of surgery here"
                    onChangeText={props.handleChange("kinSurgery")}
                    value={props.values.kinSurgery}
                    keyboardType="default"
                    onBlur={props.handleBlur("kinSurgery")}
                  />
                  <Text>
                    {props.touched.kinSurgery && props.errors.kinSurgery}
                  </Text>
                </View>

                <Text
                  onPress={this._handleOpenWithWebBrowser}
                  style={{
                    textDecorationLine: "underline",
                    textDecorationColor: "blue",
                    color: "blue",
                    fontWeight: "bold",
                  }}
                >
                  FIRE EXIT PLAN
                </Text>
                <View>
                  <Text style={styles.h2}>Membership Terms & Conditions</Text>
                </View>
                <View>
                  <Text
                    onPress={this._handleOpenWithWebBrowserTerms}
                    style={{
                      textDecorationLine: "underline",
                      textDecorationColor: "blue",
                      color: "blue",
                      fontWeight: "bold",
                    }}
                  >
                    TERMS & CONDITIONS OF MEMBERSHIP.
                  </Text>
                </View>
                <View>
                  <Text style={[styles.h3, { marginTop: 20 }]}>
                    Once you submit your form, you will need to report to
                    reception to fully complete your application. Thank You!
                  </Text>
                  <TouchableHighlight
                    style={styles.button}
                    onPress={props.handleSubmit}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 22,
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        fontFamily: "Roboto",
                      }}
                    >
                      Register
                    </Text>
                  </TouchableHighlight>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    );
  }
}
