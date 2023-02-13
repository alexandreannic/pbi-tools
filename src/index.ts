import {generatePivotAndFormat} from './generatePivotAndFormat'
import {generatePivotAndFormatQuery} from './GeneratePivotAndFormatQuery'
import {hhColumns} from './columns'

// console.error(generatePivotAndFormat({
//   columns: [
//     `39. What type of information would you like to receive to access services?/Health`,
//     `39. What type of information would you like to receive to access services?/Legal aid`,
//     `39. What type of information would you like to receive to access services?/Food`,
//     `39. What type of information would you like to receive to access services?/Livelihoods`,
//     `39. What type of information would you like to receive to access services?/Shelter`,
//     `39. What type of information would you like to receive to access services?/Return`,
//     `39. What type of information would you like to receive to access services?/Protection`,
//     `39. What type of information would you like to receive to access services?/Cash`,
//     `39. What type of information would you like to receive to access services?/Family reunification`,
//     `39. What type of information would you like to receive to access services?/Compensation regarding the mechanism for destroyed houses/apartments`,
//     `39. What type of information would you like to receive to access services?/Other`,
//   ],
//   question: '39. What type of information would you like to receive to access services?',
//   newColumnTitleForQuestion: 'Information about services wanted',
// }))

generatePivotAndFormatQuery({
  allColumns:hhColumns,
  checkboxQuestionLabel:`39. What type of information would you like to receive to access services?`,
  preserveBlank: true
})
