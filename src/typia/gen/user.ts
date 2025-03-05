import * as __typia_transform__assertGuard from 'typia/lib/internal/_assertGuard.js';
import typia from 'typia';
export interface IUser {
  id: string;
  name: string;
}
export const checkUsers = (() => {
  const _io0 = (input: any): boolean =>
    'string' === typeof input.id && 'string' === typeof input.name;
  const _ao0 = (
    input: any,
    _path: string,
    _exceptionable: boolean = true,
  ): boolean =>
    ('string' === typeof input.id ||
      __typia_transform__assertGuard._assertGuard(
        _exceptionable,
        {
          method: 'typia.createAssert',
          path: _path + '.id',
          expected: 'string',
          value: input.id,
        },
        _errorFactory,
      )) &&
    ('string' === typeof input.name ||
      __typia_transform__assertGuard._assertGuard(
        _exceptionable,
        {
          method: 'typia.createAssert',
          path: _path + '.name',
          expected: 'string',
          value: input.name,
        },
        _errorFactory,
      ));
  const __is = (input: any): input is IUser[] =>
    Array.isArray(input) &&
    input.every(
      (elem: any) => 'object' === typeof elem && null !== elem && _io0(elem),
    );
  let _errorFactory: any;
  return (
    input: any,
    errorFactory?: (p: import('typia').TypeGuardError.IProps) => Error,
  ): IUser[] => {
    if (false === __is(input)) {
      _errorFactory = errorFactory;
      ((input: any, _path: string, _exceptionable: boolean = true) =>
        ((Array.isArray(input) ||
          __typia_transform__assertGuard._assertGuard(
            true,
            {
              method: 'typia.createAssert',
              path: _path + '',
              expected: 'Array<IUser>',
              value: input,
            },
            _errorFactory,
          )) &&
          input.every(
            (elem: any, _index2: number) =>
              ((('object' === typeof elem && null !== elem) ||
                __typia_transform__assertGuard._assertGuard(
                  true,
                  {
                    method: 'typia.createAssert',
                    path: _path + '[' + _index2 + ']',
                    expected: 'IUser',
                    value: elem,
                  },
                  _errorFactory,
                )) &&
                _ao0(elem, _path + '[' + _index2 + ']', true)) ||
              __typia_transform__assertGuard._assertGuard(
                true,
                {
                  method: 'typia.createAssert',
                  path: _path + '[' + _index2 + ']',
                  expected: 'IUser',
                  value: elem,
                },
                _errorFactory,
              ),
          )) ||
        __typia_transform__assertGuard._assertGuard(
          true,
          {
            method: 'typia.createAssert',
            path: _path + '',
            expected: 'Array<IUser>',
            value: input,
          },
          _errorFactory,
        ))(input, '$input', true);
    }
    return input;
  };
})();
export const checkUser = (() => {
  const _io0 = (input: any): boolean =>
    'string' === typeof input.id && 'string' === typeof input.name;
  const _ao0 = (
    input: any,
    _path: string,
    _exceptionable: boolean = true,
  ): boolean =>
    ('string' === typeof input.id ||
      __typia_transform__assertGuard._assertGuard(
        _exceptionable,
        {
          method: 'typia.createAssert',
          path: _path + '.id',
          expected: 'string',
          value: input.id,
        },
        _errorFactory,
      )) &&
    ('string' === typeof input.name ||
      __typia_transform__assertGuard._assertGuard(
        _exceptionable,
        {
          method: 'typia.createAssert',
          path: _path + '.name',
          expected: 'string',
          value: input.name,
        },
        _errorFactory,
      ));
  const __is = (input: any): input is IUser =>
    'object' === typeof input && null !== input && _io0(input);
  let _errorFactory: any;
  return (
    input: any,
    errorFactory?: (p: import('typia').TypeGuardError.IProps) => Error,
  ): IUser => {
    if (false === __is(input)) {
      _errorFactory = errorFactory;
      ((input: any, _path: string, _exceptionable: boolean = true) =>
        ((('object' === typeof input && null !== input) ||
          __typia_transform__assertGuard._assertGuard(
            true,
            {
              method: 'typia.createAssert',
              path: _path + '',
              expected: 'IUser',
              value: input,
            },
            _errorFactory,
          )) &&
          _ao0(input, _path + '', true)) ||
        __typia_transform__assertGuard._assertGuard(
          true,
          {
            method: 'typia.createAssert',
            path: _path + '',
            expected: 'IUser',
            value: input,
          },
          _errorFactory,
        ))(input, '$input', true);
    }
    return input;
  };
})();
