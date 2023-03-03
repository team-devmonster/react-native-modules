import Svg, { Path } from "react-native-svg";
import { DateInputProps } from "./monthInput";
import { Select } from "./select";
import { Option } from "./option";
import { FormValues, InputDateType } from "./type";
import { InputConfig, TagGroupConfig, useTags } from "@team-devmonster/react-native-tags";
import { useMemo } from "react";

export function YearInput<T extends FormValues>(props:DateInputProps<T>) {
  const { type, style, disabledStyle, errorStyle, ...rest } = props;

  const { tagConfig } = useTags();

  const styles = useMemo(() => getStyles({ tagConfig, type }), [tagConfig?.input, type]);

  return (
    <Select 
      style={{
        icon: (
          <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill={'#FF6420'}
          >
            <Path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-5.25 3a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm.75 1.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm.75 1.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm.75 1.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm.75 1.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-1.5-3a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z" />
            <Path
              fillRule="evenodd"
              d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5z"
              clipRule="evenodd"
            />
          </Svg>
        ),
        ...styles.tagStyle,
        ...style
      }} 
      disabledStyle={{
        ...styles.tagDisabledStyle,
        ...disabledStyle
      }}
      errorStyle={{
        ...styles.tagErrorStyle,
        ...errorStyle
      }}
      {...rest as any}>
      {
        years.map((year) => (
          <Option key={String(year)} value={String(year)}>{String(year)}</Option>
        ))
      }
    </Select>
  )
}

const years = (() => {
  const currentYear = new Date().getFullYear(); 
  const years = [];
  let startYear = currentYear - 80;
  while ( startYear <= currentYear ) {
      years.push(startYear++);
  }   
  return years;
})();

const getStyles = ({ tagConfig, type }:{ tagConfig:TagGroupConfig|undefined, type:InputDateType }) => {
  const inputTagStyle = tagConfig?.input?.style;
  const inputDisabledTagStyle = tagConfig?.input?.disabledStyle;
  const inputErrorTagStyle = tagConfig?.input?.errorStyle;

  const dateType:keyof InputConfig = `type=${type}`;
  const dateTagStyle = tagConfig?.input?.[dateType]?.style;
  const dateTagDisabledStyle = tagConfig?.input?.[dateType]?.disabledStyle;
  const dateTagErrorStyle = tagConfig?.input?.[dateType]?.errorStyle;

  return {
    tagStyle:  {
      ...inputTagStyle,
      ...dateTagStyle
    },
    tagDisabledStyle: {
      ...inputDisabledTagStyle,
      ...dateTagDisabledStyle
    },
    tagErrorStyle: {
      ...inputErrorTagStyle,
      ...dateTagErrorStyle
    }
  }
}