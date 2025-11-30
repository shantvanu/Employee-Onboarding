// src/schema/formSchema.js
module.exports = {
  title: "Employee Onboarding",
  description: "Please fill in the details to onboard a new employee.",
  fields: [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Enter full name",
      required: true,
      validations: {
        minLength: 3,
        maxLength: 50,
        regex: "^[A-Za-z ]+$"
      }
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      placeholder: "Enter age",
      required: true,
      validations: {
        min: 18,
        max: 65
      }
    },
    {
      name: "department",
      label: "Department",
      type: "select",
      placeholder: "Select department",
      required: true,
      options: [
        { label: "Engineering", value: "engineering" },
        { label: "HR", value: "hr" },
        { label: "Finance", value: "finance" }
      ]
    },
    {
      name: "skills",
      label: "Skills",
      type: "multi-select",
      placeholder: "Select skills",
      required: true,
      options: [
        { label: "JavaScript", value: "js" },
        { label: "React", value: "react" },
        { label: "Node.js", value: "node" },
        { label: "SQL", value: "sql" },
        { label: "Communication", value: "communication" }
      ],
      validations: {
        minSelected: 1,
        maxSelected: 3
      }
    },
    {
      name: "joiningDate",
      label: "Joining Date",
      type: "date",
      required: true,
      validations: {
        maxDate: "today" // Special value - will be replaced with today's date at runtime
      }
    },
    {
      name: "bio",
      label: "About Employee",
      type: "textarea",
      placeholder: "Short bio (optional)",
      validations: {
        maxLength: 200
      }
    },
    {
      name: "isRemote",
      label: "Remote Employee",
      type: "switch",
      required: false
    }
  ]
};
