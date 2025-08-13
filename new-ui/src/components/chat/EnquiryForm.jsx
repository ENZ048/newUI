import React from "react";
import {
  EnquiryBox,
  CloseButton,
  EnquiryHeading,
  EnquiryInput,
  EnquiryTextarea,
  EmailInput,
  SubmitButton,
} from "../styled";

const EnquiryForm = ({
  enquiryData,
  setEnquiryData,
  email,
  handleSubmitEnquiry,
  closeForm
}) => {
  return (
    <EnquiryBox>
      <CloseButton onClick={closeForm} aria-label="Close Form">
        ×
      </CloseButton>
      <EnquiryHeading>Send Us Your Enquiry</EnquiryHeading>
      <EnquiryInput
        type="text"
        placeholder="Your Name"
        value={enquiryData.name}
        onChange={(e) => setEnquiryData({ ...enquiryData, name: e.target.value })}
      />
      <EnquiryInput
        type="tel"
        placeholder="Your Phone Number"
        value={enquiryData.phone || ""}
        onChange={(e) => setEnquiryData({ ...enquiryData, phone: e.target.value })}
      />
      <EmailInput type="email" value={email} disabled readOnly />
      <EnquiryTextarea
        placeholder="Your Message"
        value={enquiryData.message}
        onChange={(e) => setEnquiryData({ ...enquiryData, message: e.target.value })}
        rows={3}
      />
      <SubmitButton onClick={handleSubmitEnquiry}>Submit Enquiry</SubmitButton>
    </EnquiryBox>
  );
};

export default EnquiryForm;
