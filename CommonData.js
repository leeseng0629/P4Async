exports.getValue = (array, key) => {
  return array.filter((o) => o.key === key)[0].value
}

exports.genders = [
  {key: 'M', value: 'Male'},
  {key: 'F', value: 'Female'},
  {key: 'O', value: 'Other'},
];

exports.eduLevel = [
  {key: 'HS', value: 'High School'},
  {key: 'UG', value: 'Undergraduate'},
  {key: 'PG', value: 'Postgraduate'},
];

exports.promotions = [
  {key: 'Y', value: 'Yes'},
  {key: 'N', value: 'No'},
];
