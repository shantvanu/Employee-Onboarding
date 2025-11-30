// src/controllers/formController.js
const formSchema = require('../schema/formSchema');

const getFormSchema = (req, res) => {
  // Create a deep copy of the schema
  const schema = JSON.parse(JSON.stringify(formSchema));
  
  // Replace "today" with actual today's date in ISO format
  const today = new Date().toISOString().split('T')[0];
  schema.fields.forEach((field) => {
    if (field.validations?.maxDate === 'today') {
      field.validations.maxDate = today;
    }
  });
  
  res.status(200).json({
    success: true,
    data: schema
  });
};

module.exports = {
  getFormSchema
};
