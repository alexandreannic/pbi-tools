import {PowerQuery} from './PowerQuery'

interface Params {
  allColumns: string[]
  checkboxQuestionLabel: string
  source?: string
  preserveBlank?: boolean
  blankColumnName?: string
  idColumnName?: string
}

export const generatePivotAndFormatQuery = ({
  allColumns,
  checkboxQuestionLabel,
  source = 'source',
  preserveBlank,
  blankColumnName = 'Unable/unwilling to answer',
  idColumnName = '_index'
}: Params) => {
  const relatedColumns = allColumns.filter(_ => _.includes(checkboxQuestionLabel + (preserveBlank ? '' : '/')))
  let pq = new PowerQuery(source)
    .selectColumns([...relatedColumns, idColumnName])
    .renameColumns(relatedColumns.map(_ => [_, _.replace(checkboxQuestionLabel + '/', '').replace('(specify)', '')]))
    .renameColumn([checkboxQuestionLabel, blankColumnName])
  if (preserveBlank)
    pq = pq.transformColumn(blankColumnName, `each if _ = null then 1 else 0`)
  const result = pq
    .unpivotOtherColumns([idColumnName])
    .selectRows('each ([Value] = 1)')
    .generate()
    .get()

  console.log('HERREE')
  console.error(result)
} 
