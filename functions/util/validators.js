const isEmpty = (string) => {
    if (string.trim() === '') return true;
    else return false;
};

exports.validateLoginData = (data) => {
    let errors = {};
  
    if (isEmpty(data.email)) errors.email = 'Must not be empty';
    if (isEmpty(data.password)) errors.password = 'Must not be empty';
  
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
};

exports.validateProjectData = (data) => {

  let errors = {};

  if(isEmpty(data.name)) errors.name = "Must not be empty";
  if(data.technologies.length === 0) errors.technologies = "Must not be empty";
  if(isEmpty(data.about)) errors.about = "Must not be empty";
  if(isEmpty(data.banner)) errors.banner = "Must have banner photo";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };

};

exports.validateResumeData = (data) => {
  let errors = {};

  if(isEmpty(data.resume)) errors.resume = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};