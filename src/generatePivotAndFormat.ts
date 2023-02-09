export const generatePivotAndFormat = ({
  columns,
  question,
  source = 'source',
}: {
  columns: string[],
  question: string,
  source?: string
}) => {
  const replace = columns
    .map((col, index) => {
      const replacement = col.replace(question + '/', '')
      const handledOther = col.indexOf('Other (specify)') > -1 ? replacement.replace(' (specify)', '') : replacement
      const name = index === 0 ? 'Renamed Columns' : `Replaced Value${index}`
      return `  #"Replaced Value${index + 1}" = Table.ReplaceValue(#"${name}","${col}","${handledOther}",Replacer.ReplaceText,{"${question}"})`
    })
    .join(',\n')

  return `let 
  Source = source,
  #"Removed Other Columns" = Table.SelectColumns(Source,{${'"' + columns.join('", "') + '"'}, "_index"}),
  #"Unpivoted Columns" = Table.UnpivotOtherColumns(#"Removed Other Columns", {"_index"}, "${question}", "Answer"),
  #"Renamed Columns" = Table.RenameColumns(#"Unpivoted Columns",{{"Attribute", "${question}"}}),
${replace}
in
  #"Replaced Value${columns.length}"`
}

