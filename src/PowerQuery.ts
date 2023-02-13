interface PowerQueryOptions {


}


export class PowerQuery {

  constructor(public source: string, private options: PowerQueryOptions = {}) {
    this.formula = `let \n\t${this.lastVar} = source`
  }

  private lastVar = `Source`

  private variableIndex = 0

  private formula = ''

  private readonly addFormula = (action: string, formula: string) => {
    // const currentVariable = this.lastVariable
    this.lastVar = `#"${action}${this.variableIndex++}"`
    this.formula = `${this.formula},\n\t${this.lastVar}= ${formula}`
    return this
  }

  readonly selectColumns = (columns: string[]) => {
    this.addFormula('Removed Other Columns', `Table.SelectColumns(${this.lastVar}, {${columns.map(_ => `"${_}"`).join(`, `)}})`)
    return this
  }

  readonly selectRows = (expression: string) => {
    this.addFormula('Filtered Rows', `Table.SelectRows(${this.lastVar}, ${expression})`)
    return this
  }

  readonly unpivotOtherColumns = (columnsToAvoid: string[], attributeColumnName = 'Attribute', valueColumnName = 'Value') => {
    this.addFormula(
      'Unpivoted Columns',
      `Table.UnpivotOtherColumns(${this.lastVar}, {${columnsToAvoid.map(_ => `"${_}"`).join(',')}}, "${attributeColumnName}", "${valueColumnName}")`
    )
    return this
  }

  readonly replaceValue = (column: string, prevValue: string, oldValue: string) => {
    this.addFormula(
      'Replaced Value',
      `Table.ReplaceValue(${this.lastVar}, "${prevValue}", "${oldValue}", Replacer.ReplaceText, {"${column}"})`
    )
    return this
  }

  readonly transformColumn = (column: string, query: string) => {
    this.addFormula('Transformed Columns', `Table.TransformColumns(${this.lastVar}, {"${column}", ${query}})`)
    return this
  }
  
  readonly renameColumn = (renames: [string, string]) => {
    return this.renameColumns([renames])
  }
  
  readonly renameColumns = (renames: [string, string][]) => {
    this.addFormula(
      'Remamed Columns',
      `Table.RenameColumns(${this.lastVar}, {${renames.map(_ => `{"${_[0]}", "${_[1]}"}`).join(',')}})`
    )
    return this
  }

  readonly generate = () => {
    this.formula = `${this.formula}\nin\n\t${this.lastVar}\n`
    return this
  }

  readonly get = () => {
    return this.formula
  }
}
