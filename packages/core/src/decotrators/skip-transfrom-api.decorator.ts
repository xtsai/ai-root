export const SkipTransformPropertyName = Symbol('PROPS_SKIP_TRANSFORM_API');

/**
 *
 * will ignore transform response
 */
export function SkipTransformAPI() {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    descriptor.value[SkipTransformPropertyName] = true;
  };
}
