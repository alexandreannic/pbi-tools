export const generatePivotAndFormat = ({
  columns,
  question,
  newColumnTitleForQuestion,
  source = 'source',
}: {
  columns: string[]
  question: string
  newColumnTitleForQuestion?: string
  source?: string
}) => {
  const sanitizedColumns = columns.map(sanitizeText)
  const columnTitleForQuestion = newColumnTitleForQuestion ?? question
  const replace = sanitizedColumns
    .map((col, index) => {
      const replacement = col.replace(question + '/', '')
      const handledOther = col.indexOf('Other (specify)') > -1 ? replacement.replace(' (specify)', '') : replacement
      const name = index === 0 ? 'Unpivoted Columns' : `Replaced Value${index}`
      return `  #"Replaced Value${index + 1}" = Table.ReplaceValue(#"${name}","${col}","${handledOther}",Replacer.ReplaceText,{"${columnTitleForQuestion}"})`
    })
    .join(',\n')

  return `let 
  Source = ${source},
  #"Removed Other Columns" = Table.SelectColumns(Source,{${'"' + sanitizedColumns.join('", "') + '"'}, "_index"}),
  #"Unpivoted Columns" = Table.UnpivotOtherColumns(#"Removed Other Columns", {"_index"}, "${columnTitleForQuestion}", "Answer"),
${replace}
in
  #"Replaced Value${sanitizedColumns.length}"`
}

const sanitizeText = (text: string) => text.replaceAll('"', '""')
