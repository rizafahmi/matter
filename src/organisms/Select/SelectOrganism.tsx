import * as React from 'react';
import Select, { components } from 'react-select';
import { css, cx } from 'emotion';

import { IconAtom, TextAtom } from '../../atoms';

// @ts-ignore
import COLORS from '../../constants/colors';

const DropdownIndicator = (props: any) => components.DropdownIndicator && (
  <components.DropdownIndicator {...props}>
    <div className={cx('dropdown-circle br-100 bg-dark6 flex flex-column justify-center items-center', css`width: 32px; height: 32px;`)}>
      <IconAtom name="angle-down" type="REGULAR" className="dropdown-icon f3 dark3 self-center" />
    </div>
  </components.DropdownIndicator>
);

class SelectOrganism extends React.Component<any, any> {
  state = {
    isFocus: false,
    isActive: !!this.props.value,
  }

  selectRef: any;

  onFocus = () => {
    this.setState({ isFocus: true });
    if (this.selectRef) {
      this.selectRef.focus();
    }
  }

  onBlur = () => {
    this.setState({ isFocus: false });
  }

  handleChange = (e: any) => {
    this.props.onChange(e.value || null);
    this.setState({ isActive: true });
  }

  render() {
    const { isFocus, isActive } = this.state;
    const {
      value,
      options,
      error,
      name,
      placeholder,
      label,
      icon,
      className,
      disabled,
      required,
    } = this.props;
    return (
      <div className={cx('flex flex-column justify-center align-center', className)} {...this.props}>
        <div
          role="button"
          onClick={this.onFocus}
          tabIndex={0}
          onKeyPress={this.onFocus}
          onFocus={this.onFocus}
          className={cx('w-100 pl3 pr2 pv1 br3 flex flex-row align-center outline-0', css`
            cursor: ${disabled ? 'not-allowed' : 'pointer'};
            border: 1px solid ${error ? '#EB5757' : ((isFocus && !disabled) ? '#645AFF' : '#E8EDF2')};
            transition: all 0.5s ease;
            height: 48px;
            & .dropdown-circle {
              background: ${isFocus ? '#645AFF' : '#F5F7FA'};
            }
            & .dropdown-icon {
              color: ${isFocus ? '#FFFFFF' : '#8393A3'};
            }
            @media screen and (min-width: 30em) {
              height: 56px;
            }
          `)
          }
        >
          {icon && (
            <IconAtom
              name={icon}
              className={cx(
                'self-center',
                css`
                  transition: 0.2s;
                  color: ${COLORS.BLACK.LIGHT};
                `
              )}
            />
          )}
          <div className="w-100 ml2 flex flex-column justify-start align-start">
            <TextAtom
              size={(isFocus || isActive) ? 'XS' : 'M'}
              className={cx('bg-white ph2 self-start', css`
                transition: all 0.4s ease;
                color: ${error ? '#EB5757' : ((isFocus && !disabled) ? '#645AFF' : '#8393A3')};
                transform: translateY(${(isFocus || isActive) ? -12 : 12}px);
                @media screen and (min-width: 30em) {
                  transform: translateY(${(isFocus || isActive) ? -13 : 13}px);
                }
              `)}
            >
              {required && (isFocus || isActive)
              ? label
              : !required
                ? label
                : `* ${label}`}
            </TextAtom>
            <Select
              ref={(ref) => { this.selectRef = ref; }}
              components={{ DropdownIndicator }}
              placeholder={placeholder}
              options={options}
              value={options.filter((opt: any) => opt.value === value)[0]}
              name={name}
              onChange={this.handleChange}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              className="dropdown-selector"
              styles={{
                control: () => ({
                  borderColor: 'transparent',
                  borderRadius: 4,
                  borderStyle: 'solid',
                  borderWidth: 1,
                  // boxShadow: null,
                  boxSizing: 'border-box',
                  cursor: 'default',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  minHeight: 38,
                  outline: '0 !important',
                  position: 'relative',
                  transition: 'all 100ms',
                }),
                indicatorSeparator: base => ({
                  ...base,
                  display: 'none',
                }),
                container: base => ({
                  ...base,
                  marginTop: (isFocus || isActive) ? -15 : -18,
                }),
                valueContainer: base => ({
                  ...base,
                  border: 0,
                  padding: '10px 0',
                  visibility: (isFocus || isActive) ? 'visible' : 'hidden',
                  paddingLeft: 5,
                }),
                singleValue: base => ({
                  ...base,
                }),
                option: base => ({
                  ...base,
                  padding: '10px 20px',
                  borderBottom: '1px solid #F5F7FA',
                }),
              }}
            />
          </div>
          {error && (
            <IconAtom
              name="exclamation-circle"
              className={cx('f3 self-center primaryred', css``)}
            />
          )}
        </div>
        <div className="mt1">
          {error && (
            <TextAtom
              size="S"
              className={cx('ml4 self-center', css`color: #EB5757`)}
            >
              {error}
            </TextAtom>
          )}
        </div>
      </div>
    );
  }
}

// SelectOrganism.propTypes = {
//   className: PropTypes.string,
//   icon: PropTypes.string,
//   placeholder: PropTypes.string,
//   label: PropTypes.string,
//   value: PropTypes.oneOfType([
//     PropTypes.shape({
//       value: PropTypes.string,
//       label: PropTypes.string,
//     }),
//     PropTypes.any,
//   ]),
//   onChange: PropTypes.func.isRequired,
//   error: PropTypes.string,
//   // type: PropTypes.string,
//   disabled: PropTypes.bool,
// };

export { SelectOrganism };