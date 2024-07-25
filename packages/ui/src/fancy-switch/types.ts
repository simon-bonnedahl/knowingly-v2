type OptionValue = string | number

export type OptionObject = Record<string, OptionValue>;

export type OptionType = OptionValue | OptionObject

export interface FancySwitchProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: OptionValue
  onChange?: (value: OptionValue) => void

  options: OptionType[]
  valueKey?: string
  labelKey?: string

  radioClassName?: string
  highlighterClassName?: string
  highlighterIncludeMargin?: boolean
}
