import { forwardRef } from 'react';
import { useId } from 'react';

import { ChevronDown, X } from 'lucide-react';
import Select, {
  components,
  type Props,
  type StylesConfig,
} from 'react-select';

import { cn } from '@/lib/utils';

import { classNames } from './react-select.style';

const selectStyles: StylesConfig = {
  input: (base) => ({
    ...base,
  }),

  multiValueLabel(base) {
    return {
      ...base,
      whiteSpace: 'normal',
      overflow: 'visible',
    };
  },
};

export type Ref = any;

const ReactSelect = forwardRef<
  Ref,
  Props & { extraControlClassName?: string; toolbar?: boolean; label?: string }
>(
  (
    {
      options,
      placeholder,
      isMulti = false,
      isClearable = true,
      isSearchable = true,
      isDisabled = false,
      extraControlClassName,
      toolbar,
      label,
      ...props
    },
    ref
  ) => {
    const id = useId();

    return (
      <div className='group relative w-full'>
        {label && (
          <label
            htmlFor={id}
            className='bg-ring rounded-md  text-foreground absolute -top-px left-2 z-10 block -translate-y-1/2 px-1.25 py-0.5 text-xs font-medium group-has-disabled:opacity-50 shadow-xs'
          >
            {label}
          </label>
        )}
        <Select
          ref={ref}
          unstyled
          classNamePrefix={'react-select-'}
          classNames={classNames(extraControlClassName, toolbar)}
          styles={selectStyles}
          components={{
            ClearIndicator: (props) => (
              <components.ClearIndicator
                className='mx-1 border-r border-border pr-1'
                {...props}
              >
                <X className='size-4 font-medium text-destructive' />
              </components.ClearIndicator>
            ),

            MultiValueRemove: (props) => (
              <components.MultiValueRemove {...props}>
                <X className='ml-1 size-4 font-medium text-destructive' />
              </components.MultiValueRemove>
            ),

            DropdownIndicator: (props) => (
              <components.DropdownIndicator {...props}>
                <ChevronDown
                  className={cn(
                    'size-5 transform text-foreground transition-transform duration-300',
                    props.selectProps.menuIsOpen && 'rotate-90'
                  )}
                />
              </components.DropdownIndicator>
            ),
          }}
          isMulti={isMulti}
          isDisabled={isDisabled}
          isClearable={isClearable}
          isSearchable={isSearchable}
          options={options}
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  }
);

export default ReactSelect;
